import { EventType } from "../../tp5/enum/SimulationEvent";
export enum EventsType {
    customerArrive = 'customerArrive',
    ovenStart = 'ovenStart',
    ovenFinish = 'ovenFinish',
    customerExit = 'customerExit',
}

type CustomerArriveEvent = {
    eventType: EventsType.customerArrive;
    time: number;
}

export type CustomerExitEvent = {
    eventType: EventsType.customerExit;
    time: number;
    worker: number;
}

export type OvenStartEvent = {
    eventType: EventsType.ovenStart;
    time: number;
    quantity: number;
}

export type OvenFinishEvent = {
    eventType: EventsType.ovenFinish;
    time: number;
    quantity: number;
}

export type BakeEvent =
    | CustomerArriveEvent
    | CustomerExitEvent
    | OvenStartEvent
    | OvenFinishEvent;