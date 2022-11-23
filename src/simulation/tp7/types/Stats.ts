import { Customer } from "../Customer";
import { Worker } from "../Worker";
import { BakeEvent } from "./Events";

export type Stats = {
    clock: number;
    pendingEvents: BakeEvent[];
    simulationsCount: number;
    customersCount:{
        arrived: number,
        attended: number,
        gone: number,
    };
    actualStock: number;
    queue: {quantity: number; name: string}[];
    workers: Record<number, WorkerInfo>;
    percenteageGone: number;
};

type WorkerInfo = {
    id: number;
    isVacant: boolean;
    currentCustomer?: string;
    unitiesToBuy: number;
};
