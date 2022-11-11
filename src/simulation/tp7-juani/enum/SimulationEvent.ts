import { Servers } from './Servers';

export enum EventType {
    finishTask = "finishTask",
    orderArrive = "orderArrival",
}

type OrderArrive = {
    type: EventType.orderArrive;
    time: number;
    orderQuantity: number;
};

type FinishTask = {
    type: EventType.finishTask;
    time: number;
    server: Servers;
};

export type SimulationEvent = OrderArrive | FinishTask;
