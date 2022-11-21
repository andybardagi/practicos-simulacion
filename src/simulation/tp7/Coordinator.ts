import { Customer } from "./Customer";
import { Worker } from "./Worker";
import { Oven } from "./Oven";
import { Stats } from "./types/Stats";
import {
    BakeEvent,
    EventsType,
    CustomerExitEvent,
    OvenStartEvent,
    OvenFinishEvent,
} from './types/Events';

export class Coordinator {
    private oven: Oven;
    private eventsToProcess: BakeEvent[] = [];
    private workers: Record<number, Worker> = {
        1: new Worker(1),
        2: new Worker(2),
    };
    private queue: Customer[] = [];
    private simulationsCount: number = 0;
    private clock: number = 0;
    private targetSimulations: number;
    private nextCustomerId: number = 1;
    private actualStock: number = 30;
    private customerCounter = {
        arrived: 0,
        attended: 0,
        left: 0,
    };

    constructor(ovenStep: number, targetSimulations: number) {
        this.oven = new Oven(ovenStep);
        this.targetSimulations = targetSimulations;
        this.calculateClientArrival();
        this.startOvenQueue(45 * 60, 30);
    }

    public simulateAll() {
        while (this.simulationsCount < this.targetSimulations){
            this.processEvent();
        }
    }

    private processEvent() {
        this.simulationsCount++;
        const event: BakeEvent = this.eventsToProcess.shift() as BakeEvent;
        this.clock = event.time;

        switch (event.eventType) {
            case EventsType.customerArrive:
                this.handleCustomerArrival();
                break;
            case EventsType.ovenStart:
                this.handleOvenStart(event);
                break;
            case EventsType.ovenFinish:
                this.handleOvenFinish(event);
                break;
            case EventsType.customerExit:
                this.handleCustomerExit(event);
                break;
        }

    }

    private addPendingEvent(e: BakeEvent){
        if (this.eventsToProcess.length == 0){
            this.eventsToProcess.push(e);
            return;
        }
        const i = this.getInsertionIndex(e.time);
        this.eventsToProcess.splice(i, 0, e);
    }

    private getInsertionIndex(insertionTime: number): number {
        let start = 0, end = this.eventsToProcess.length - 1;

        while(start <= end) {
            let mid = Math.floor((start + end) / 2)
            if (this.eventsToProcess[mid].time === insertionTime) return mid;
            else if (this.eventsToProcess[mid].time < insertionTime) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
        return start;
    }

    private startOvenQueue(clock: number, quantity: number){
        this.addPendingEvent({
            eventType: EventsType.ovenStart,
            time: clock,
            quantity: quantity,
        });
    }

    public queueCustomerExit(duration: number, workerId: number){
        this.addPendingEvent({
            eventType: EventsType.customerExit,
            time: this.clock + duration,
            worker: workerId,
        });
    }

    private calculateClientArrival(){
        const exponTime = -(3 * 60) * Math.log(1 - Math.random());
        this.addPendingEvent({
            eventType: EventsType.customerArrive,
            time: this.clock + exponTime,
        });
    }

    private handleCustomerArrival() {
        const customer = new Customer(this.nextCustomerId, this.clock);
        this.nextCustomerId++;
        this.customerCounter.arrived++;
        this.calculateClientArrival();

        if (!(this.actualStock > 0 || this.willHaveStockIn5Minutes())) {
            customer.setExitTime(this.clock);
            this.customerCounter.left++;
            return;
        }

        const keys = Object.keys(this.workers).map((key) => Number(key));

        for (const key of keys) {
            if (this.workers[key].isVacant()) {
                const duration = this.workers[key].assignClient(customer, this.clock);
                this.queueCustomerExit(duration, this.workers[key].getId());
                return;
            }
        }

    }

    private handleCustomerExit(e: CustomerExitEvent) {
        const customer = this.workers[e.worker].exitClient(this.clock);

        if (this.actualStock > 0) {
            this.actualStock =
                this.actualStock - customer.getUnities() > 0
                    ? this.actualStock - customer.getUnities()
                    : 0;
            if (this.actualStock === 0){
                this.activateEmergencyOven();
            }
            this.customerCounter.attended++;
        } else {
            this.customerCounter.left++;
        }

        if (this.queue.length > 0){
            const newCustomer = this.queue.shift() as Customer;
            const duration = this.workers[e.worker].assignClient(newCustomer, this.clock);
            this.queueCustomerExit(duration, e.worker);
        }

    }

    private handleOvenStart(e: OvenStartEvent) {
        const duration = this.oven.getOvenFinishTime(e.quantity);
        this.addPendingEvent({
            eventType: EventsType.ovenFinish,
            time: this.clock + duration,
            quantity: e.quantity,
        });
    }

    private handleOvenFinish(e: OvenFinishEvent) {
        this.actualStock += e.quantity;
        this.startOvenQueue(this.clock + 45 * 60, 30)
    }

    private willHaveStockIn5Minutes(): boolean {
        for (let i = 0; i < this.eventsToProcess.length; i++) {
            if (this.clock - this.eventsToProcess[i].time >= 5 * 60){
                return false;
            }
            if (this.eventsToProcess[i].eventType === EventsType.ovenFinish){
                return true;
            }
        }
        return false;
    }

    private activateEmergencyOven() {
        if (
            this.eventsToProcess.filter((e) => e.eventType === EventsType.ovenFinish)
            .length === 0
        ) {
            this.eventsToProcess = this.eventsToProcess.filter(
                (e) => e.eventType !== EventsType.ovenStart,);
            this.startOvenQueue(this.clock, 45);
        }
    }

    public getStats(): Stats {
        return {
            clock: this.clock,
            pendingEvents: structuredClone(this.eventsToProcess),
            simulationsCount: this.simulationsCount,
            customersCount: structuredClone(this.customerCounter),
            actualStock: this.actualStock,
            queue: structuredClone(
                this.queue.slice().map((c) => ({
                    name: c.getName(),
                    quantity: c.getUnities(),
                })),
            ),
            workers: {
                1: {
                    id: this.workers[1].getId(),
                    isVacant: this.workers[1].isVacant(),
                    currentCustomer: this.workers[1].getCurrentClient()?.getName(),
                    unitiesToBuy: Number(
                        this.workers[1].getCurrentClient()?.getUnities() as number,
                    ),
                },
                2: {
                    id: this.workers[2].getId(),
                    isVacant: this.workers[2].isVacant(),
                    currentCustomer: this.workers[2].getCurrentClient()?.getName(),
                    unitiesToBuy: Number(
                        this.workers[2].getCurrentClient()?.getUnities() as number,
                    ),
                },
            },
        };
    }

}