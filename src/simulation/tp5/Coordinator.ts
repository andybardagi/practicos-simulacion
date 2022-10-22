import { AssemblyObject } from './AssemblyObject';
import { Server } from './Server';

enum EventType {
    finishTask = 1,
    orderArrive = 2
}

export class Coordinator {
    private clock: number;
    private servers: Record<number, Server>;
    private nextFinishEvent: EventType; 
    private nextFinishTime: number;
    private nextOrderTime: number;
    private finishedAssemblies: AssemblyObject[]; 
    private lastAssemblyId: number;

    constructor() {
        this.clock = 0;
        this.lastAssemblyId = 0;
        this.nextFinishEvent = EventType.orderArrive;
    }

    public simulate(orders: number) {}
    private generateNextArrive() {
        this.nextOrderTime = 0;
    }

    private generateQuantityArrive(): number{

    }
    
    private setNextEvent() {}
}
