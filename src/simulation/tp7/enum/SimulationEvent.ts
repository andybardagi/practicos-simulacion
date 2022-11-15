
export enum EventType {
    finishTask = "finishTask",
    truckArrive = "truckArrival",
}

type truckArrive = {
    type: EventType.truckArrive;
    time: number;
    tons: number;
};

type FinishTask = {
    type: EventType.finishTask;
    time: number;
};

export type SimulationEvent = truckArrive | FinishTask;
