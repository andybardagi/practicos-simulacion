import { AssemblyObject } from './AssemblyObject';
import { ExponentialServer } from './ConcreteServer/ExponentialServer';
import { UniformServer } from './ConcreteServer/UniformServer';
import { Servers } from './enum/Servers';
import { EventType, SimulationEvent } from './enum/SimulationEvent';
import { Server } from './Server';
import { stateVector } from './types/stateVector.type';
import { StatsObserver } from './StatsObserver';
import { RungeKuta } from './ConcreteServer/RungeKuta';
import { RungeKuttaLine } from './types/rungeKuttaEvolution';
import { boolean } from 'yup';

export class Coordinator {
    private clock: number;
    private orderArriveClock: number;
    private servers: Record<Servers, Server>;
    private pendingEvents: SimulationEvent[];
    private finishedAssemblies: AssemblyObject[];
    private lastAssemblyId: number;
    private statsObserver: StatsObserver;
    private vectorState: stateVector[] = [];

    constructor() {
        this.clock = 0;
        this.orderArriveClock = 0;
        this.lastAssemblyId = 0;
        this.finishedAssemblies = [];
        this.servers = {
            [Servers.server1]: new UniformServer(Servers.server1, this, 20, 30),
            [Servers.server2]: new UniformServer(Servers.server2, this, 30, 50),
            [Servers.server3]: new ExponentialServer(Servers.server3, this, 30),
            [Servers.server4]: new UniformServer(Servers.server4, this, 10, 20),
            [Servers.server5]: new ExponentialServer(Servers.server5, this, 5),
            [Servers.server6]: new RungeKuta(Servers.server6, this, 0, 0, 0, 0.05, 10, 5),
        };
        this.pendingEvents = [];
        this.statsObserver = new StatsObserver();
        this.generateNextArrive();
    }

    public setRungeServer(
        t: number,
        x: number,
        y: number,
        h: number,
        b: number,
        c: number,
    ) {
        this.servers[Servers.server6] = new RungeKuta(Servers.server6, this, t, x, y, h, b, c);
    }

    private nextStep(s: Servers, objAs: AssemblyObject) {
        if (s === Servers.server1) {
            const q4 = this.servers[Servers.server4].queueAssembly(objAs, this.clock);
            this.statsObserver.notifyQueueQuantity(Servers.server4, q4);
            return;
        }
        if (s === Servers.server2) {
            if (objAs.hasFinishedServer(Servers.server4)) {
                const q5 = this.servers[Servers.server5].queueAssembly(objAs, this.clock);
                this.statsObserver.notifyQueueQuantity(Servers.server5, q5);
            }
            return;
        }
        if (s === Servers.server3) {
            if (objAs.hasFinishedServer(Servers.server5)) {
                const q6 = this.servers[Servers.server6].queueAssembly(objAs, this.clock);
                this.statsObserver.notifyQueueQuantity(Servers.server6, q6);
            }
            return;
        }
        if (s === Servers.server4) {
            if (objAs.hasFinishedServer(Servers.server2)) {
                const q5 = this.servers[Servers.server5].queueAssembly(objAs, this.clock);
                this.statsObserver.notifyQueueQuantity(Servers.server5, q5);
            }
            return;
        }
        if (s === Servers.server5) {
            if (objAs.hasFinishedServer(Servers.server3)) {
                const q6 = this.servers[Servers.server6].queueAssembly(objAs, this.clock);
                this.statsObserver.notifyQueueQuantity(Servers.server6, q6);
            }
            return;
        }
        if (s === Servers.server6) {
            objAs.setFinishTime(this.clock);
            this.finishedAssemblies.push(objAs);
            this.statsObserver.notifyAssemblyFinish(objAs, this.clock);
            return;
        }
    }

    public simulate(orders: number) {
        while (this.finishedAssemblies.length < orders) {
            //Genero simulaciones hasta cumplir con el límite de simulaciones solicitadas.
            let isRungeKutta: boolean =
                this.pendingEvents[0].type == EventType.finishTask &&
                this.pendingEvents[0].server == Servers.server6;

            this.processNextEvent();

            if (this.finishedAssemblies.length <= 5) {
                const stats = structuredClone(this.statsObserver.getFinalStats(this.clock));
                this.vectorState.push({
                    ...stats,
                    queues: {
                        [Servers.server1]: structuredClone(
                            this.servers[Servers.server1].getQueueObjects(),
                        ),
                        [Servers.server2]: structuredClone(
                            this.servers[Servers.server2].getQueueObjects(),
                        ),
                        [Servers.server3]: structuredClone(
                            this.servers[Servers.server3].getQueueObjects(),
                        ),
                        [Servers.server4]: structuredClone(
                            this.servers[Servers.server4].getQueueObjects(),
                        ),
                        [Servers.server5]: structuredClone(
                            this.servers[Servers.server5].getQueueObjects(),
                        ),
                        [Servers.server6]: structuredClone(
                            this.servers[Servers.server6].getQueueObjects(),
                        ),
                    },
                    current: {
                        [Servers.server1]: structuredClone(
                            this.servers[Servers.server1].getCurrent(),
                        ),
                        [Servers.server2]: structuredClone(
                            this.servers[Servers.server2].getCurrent(),
                        ),
                        [Servers.server3]: structuredClone(
                            this.servers[Servers.server3].getCurrent(),
                        ),
                        [Servers.server4]: structuredClone(
                            this.servers[Servers.server4].getCurrent(),
                        ),
                        [Servers.server5]: structuredClone(
                            this.servers[Servers.server5].getCurrent(),
                        ),
                        [Servers.server6]: structuredClone(
                            this.servers[Servers.server6].getCurrent(),
                        ),
                    },
                    rungeKuttaEvolution: isRungeKutta
                        ? this.servers[Servers.server6].getRungeKuttaEvolution()
                        : [],
                    events: structuredClone(this.pendingEvents),
                    clock: this.clock,
                });
            }
        }

        return this.statsObserver.getFinalStats(this.clock);
    }

    processNextEvent() {
        const oldClock = this.clock;
        const nextEvent = this.getNextEvent();
        this.clock = nextEvent.time;

        if (nextEvent.type === EventType.orderArrive) {
            //Notificar que llegaron pedidos para el cálculo de estadísticas
            this.statsObserver.notifyArrives(nextEvent.orderQuantity);
            //Crear nuevos AssemblyObject y encolar donde corresponda
            for (let i = 0; i < nextEvent.orderQuantity; i++) {
                this.lastAssemblyId++;
                const asObj: AssemblyObject = new AssemblyObject(this.lastAssemblyId, this.clock);
                const q1 = this.servers[Servers.server1].queueAssembly(asObj, this.clock);
                const q2 = this.servers[Servers.server2].queueAssembly(asObj, this.clock);
                const q3 = this.servers[Servers.server3].queueAssembly(asObj, this.clock);
                //const q4 = this.servers[Servers.server4].queueAssembly(asObj, this.clock);
                //const q5 = this.servers[Servers.server5].queueAssembly(asObj, this.clock);
                this.statsObserver.notifyQueueQuantity(Servers.server1, q1);
                this.statsObserver.notifyQueueQuantity(Servers.server2, q2);
                this.statsObserver.notifyQueueQuantity(Servers.server3, q3);
                //this.statsObserver.notifyQueueQuantity(Servers.server4, q4);
                //this.statsObserver.notifyQueueQuantity(Servers.server5, q5);
            }

            this.generateNextArrive();
        } else if (nextEvent.type === EventType.finishTask) {
            //procesar finalizacion tarea en servidor.
            const objAssembly = this.servers[nextEvent.server].finishCurrentTask(this.clock);
            this.nextStep(nextEvent.server, objAssembly);
        }

        const busy1 = this.servers[Servers.server1].isBusy();
        const busy2 = this.servers[Servers.server2].isBusy();
        const busy3 = this.servers[Servers.server3].isBusy();
        const busy4 = this.servers[Servers.server4].isBusy();
        const busy5 = this.servers[Servers.server5].isBusy();
        const busy6 = this.servers[Servers.server6].isBusy();
        this.statsObserver.notifyServerOcupation(Servers.server1, oldClock, this.clock, busy1);
        this.statsObserver.notifyServerOcupation(Servers.server2, oldClock, this.clock, busy2);
        this.statsObserver.notifyServerOcupation(Servers.server3, oldClock, this.clock, busy3);
        this.statsObserver.notifyServerOcupation(Servers.server4, oldClock, this.clock, busy4);
        this.statsObserver.notifyServerOcupation(Servers.server5, oldClock, this.clock, busy5);
        this.statsObserver.notifyServerOcupation(Servers.server6, oldClock, this.clock, busy6);
    }

    public addPendingEvent(e: SimulationEvent) {
        // TODO Esta inserción debe realizarse ordenada por e.time; para que se pueda utilizar el shift en el getNextEvent();
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

    private getNextEvent(): SimulationEvent {
        if (this.pendingEvents.length > 0) {
            return this.pendingEvents.shift() as SimulationEvent;
        }
        throw Error('No hay eventos pendientes');
    }

    private generateNextArrive() {
        this.addPendingEvent({
            type: EventType.orderArrive,
            time: this.orderArriveClock,
            orderQuantity: this.generateQuantityArrive(),
        });
        this.orderArriveClock += 60;
    }

    private generateQuantityArrive(): number {
        // Se asume llegan pedidos en números enteros... 1,2,4 o 10 pedidos. No 0.1 ni 3.75
        //Generate exponential random. Media = 3  → Lambda = 1/3
        return Math.round(-3 * Math.log(Math.random()));
    }

    public getStateVector(): stateVector[] {
        return this.vectorState;
    }
}
