import { Client } from './Client';
import { Employee } from './Employee';
import { EulerFurnace } from './EulerFurnace';
import { BakeryStats } from './types/bakeryStatsType';
import {
    BakeryEvent,
    BakeryEventType,
    ClientExitEvent,
    FurnaceFinishEvent,
    FurnaceStartEvent,
} from './types/BakeryEvents';

export class Coordinator {
    private furnace: EulerFurnace;
    private pendingEvents: BakeryEvent[] = [];
    private employees: Record<number, Employee> = {
        1: new Employee(1),
        2: new Employee(2),
    };
    private queue: Client[] = [];
    private roundsSimulated: number = 0;
    private clock: number = 0;
    private targetEvents: number;
    private nextClientId: number = 1;
    private currentProductStock: number = 30;
    private clientsCounters = {
        arrived: 0,
        served: 0,
        left: 0,
    };

    constructor(furnaceStep: number, targetEvents: number) {
        this.furnace = new EulerFurnace(furnaceStep);
        this.targetEvents = targetEvents;
        this.scheduleClientArrival();
        this.queueFurnaceStart(45 * 60, 30);
    }

    public simulateUntilFinish() {
        while (this.roundsSimulated < this.targetEvents) {
            this.processEvent();
        }
    }

    public simulateEvents(eventQuantity: number) {
        let i = 0;
        while (i < eventQuantity && this.roundsSimulated < this.targetEvents) {
            this.processEvent();
            i++;
        }
    }

    private processEvent() {
        this.roundsSimulated++;
        const event: BakeryEvent = this.pendingEvents.shift() as BakeryEvent;
        this.clock = event.time;

        switch (event.eventType) {
            case BakeryEventType.clientArrive:
                this.handleClientArrival();
                break;
            case BakeryEventType.furnaceStart:
                this.handleFurnaceStart(event);
                break;
            case BakeryEventType.furnaceFinish:
                this.handleFurnaceFinish(event);
                break;
            case BakeryEventType.clientExit:
                this.handleClientExit(event);
                break;
        }
    }

    private addPendingEvent(e: BakeryEvent) {
        // TODO Esta inserción debe realizarse ordenada por e.time; para que se pueda utilizar el shift en el getNextEvent();
        if (this.pendingEvents.length == 0) {
            this.pendingEvents.push(e);
            return;
        }
        const i = this.getInsertionIndex(e.time);
        this.pendingEvents.splice(i, 0, e); //Inserta el evento e en el índice i.
    }

    private getInsertionIndex(timeToInsert: number): number {
        let start = 0,
            end = this.pendingEvents.length - 1;

        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            if (this.pendingEvents[mid].time === timeToInsert) return mid;
            else if (this.pendingEvents[mid].time < timeToInsert) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
        return start;
    }

    private queueFurnaceStart(clock: number, quantity: number) {
        this.addPendingEvent({
            eventType: BakeryEventType.furnaceStart,
            time: clock,
            quantity: quantity,
        });
    }

    public queueClientExit(duration: number, employeeId: number) {
        this.addPendingEvent({
            eventType: BakeryEventType.clientExit,
            time: this.clock + duration,
            employee: employeeId,
        });
    }

    private scheduleClientArrival() {
        const exponTime = -(3 * 60) * Math.log(1 - Math.random());
        this.addPendingEvent({
            eventType: BakeryEventType.clientArrive,
            time: this.clock + exponTime,
        });
    }

    private handleClientArrival() {
        const client = new Client(this.nextClientId, this.clock);
        this.nextClientId++;
        this.clientsCounters.arrived++;
        this.scheduleClientArrival();

        //Check if we have stock or will have in the next 5 minutes
        if (!(this.currentProductStock > 0 || this.willHaveStockIn5Minutes())) {
            //Theres no stock and there will no be in the next 5 minutes
            client.setExitTime(this.clock);
            //CLIENT LOST
            this.clientsCounters.left++;
            return;
        }

        const keys = Object.keys(this.employees).map((key) => Number(key));

        for (const key of keys) {
            if (this.employees[key].isFree()) {
                const duration = this.employees[key].assignClient(client, this.clock);
                this.queueClientExit(duration, this.employees[key].getId());
                return;
            }
        }
        this.queue.push(client);
    }

    private handleClientExit(event: ClientExitEvent) {
        const client = this.employees[event.employee].exitClient(this.clock);

        if (this.currentProductStock > 0) {
            this.currentProductStock =
                this.currentProductStock - client.getProductQuantity() > 0
                    ? this.currentProductStock - client.getProductQuantity()
                    : 0;
            if (this.currentProductStock === 0) {
                this.activateEmergencyFurnace();
            }
            this.clientsCounters.served++;
        } else {
            this.clientsCounters.left++;
        }

        if (this.queue.length > 0) {
            const nwClient = this.queue.shift() as Client;
            const duration = this.employees[event.employee].assignClient(nwClient, this.clock);
            this.queueClientExit(duration, event.employee);
        }
    }

    private handleFurnaceStart(event: FurnaceStartEvent) {
        const duration = this.furnace.getFurnaceFinishTime(event.quantity);
        this.addPendingEvent({
            eventType: BakeryEventType.furnaceFinish,
            time: this.clock + duration,
            quantity: event.quantity,
        });
    }

    private handleFurnaceFinish(event: FurnaceFinishEvent) {
        this.currentProductStock += event.quantity;
        this.queueFurnaceStart(this.clock + 45 * 60, 30);
    }

    private willHaveStockIn5Minutes(): boolean {
        for (let i = 0; i < this.pendingEvents.length; i++) {
            if (this.clock - this.pendingEvents[i].time >= 5 * 60) {
                return false;
            }
            if (this.pendingEvents[i].eventType === BakeryEventType.furnaceFinish) {
                return true;
            }
        }
        return false;
    }

    public activateEmergencyFurnace() {
        //Check if the furnace is not turned on
        if (
            this.pendingEvents.filter((e) => e.eventType === BakeryEventType.furnaceFinish)
                .length === 0
        ) {
            //Delete all furnaceStart events
            this.pendingEvents = this.pendingEvents.filter(
                (e) => e.eventType !== BakeryEventType.furnaceStart,
            );
            this.queueFurnaceStart(this.clock, 45);
        }
    }

    public getStats(): BakeryStats {
        return {
            clock: this.clock,
            pendingEvents: structuredClone(this.pendingEvents),
            roundsSimulated: this.roundsSimulated,
            clientsCounters: structuredClone(this.clientsCounters),
            currentProductStock: this.currentProductStock,
            queue: structuredClone(
                this.queue.slice().map((c) => ({
                    name: c.getFullName(),
                    quantity: c.getProductQuantity(),
                })),
            ),
            employees: {
                1: {
                    id: this.employees[1].getId(),
                    isFree: this.employees[1].isFree(),
                    currentClient: this.employees[1].getCurrentClient()?.getFullName(),
                    wantedProducts: Number(
                        this.employees[1].getCurrentClient()?.getProductQuantity() as number,
                    ),
                },
                2: {
                    id: this.employees[2].getId(),
                    isFree: this.employees[2].isFree(),
                    currentClient: this.employees[2].getCurrentClient()?.getFullName(),
                    wantedProducts: this.employees[2]
                        .getCurrentClient()
                        ?.getProductQuantity() as number,
                },
            },
        };
    }
}
