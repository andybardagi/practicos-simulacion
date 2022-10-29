import { Servers } from '../enum/Servers';
import { tp5StatsType } from './stats.type';
import { EventType, SimulationEvent } from '../enum/SimulationEvent';
export type stateVector = tp5StatsType & {
    queues: Record<Servers, number[]>;
    events: SimulationEvent[];
    clock: number;
};
