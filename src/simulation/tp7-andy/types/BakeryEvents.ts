import { EventType } from '../../tp5/enum/SimulationEvent';
export enum BakeryEventType {
    clientArrive = 'clientArrive',
    furnaceStart = 'furnaceStart',
    furnaceFinish = 'furnaceFinish',
    clientExit = 'clientExit',
}

type ClientArriveEvent = {
    eventType: BakeryEventType.clientArrive;
    time: number;
};

export type ClientExitEvent = {
    eventType: BakeryEventType.clientExit;
    time: number;
    employee: number;
};

export type FurnaceStartEvent = {
    eventType: BakeryEventType.furnaceStart;
    time: number;
    quantity: number;
};

export type FurnaceFinishEvent = {
    eventType: BakeryEventType.furnaceFinish;
    time: number;
    quantity: number;
};

export type BakeryEvent =
    | ClientArriveEvent
    | ClientExitEvent
    | FurnaceStartEvent
    | FurnaceFinishEvent;
