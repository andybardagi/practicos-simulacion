import { Client } from '../Client';
import { Employee } from '../Employee';
import { BakeryEvent } from './BakeryEvents';

export type BakeryStats = {
    clock: number;
    pendingEvents: BakeryEvent[];
    roundsSimulated: number;
    clientsCounters: {
        arrived: number;
        served: number;
        left: number;
    };
    currentProductStock: number;
    queue: Client[];
    employees: Record<number, EmployeeInfo>;
};

type EmployeeInfo = {
    id: number;
    isFree: boolean;
    currentClient?: string;
}