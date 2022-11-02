import { AssemblyObject } from '../AssemblyObject';
import { Servers } from '../enum/Servers';
import { SimulationEvent } from '../enum/SimulationEvent';
import { tp5StatsType } from './stats.type';
export type stateVector = tp5StatsType & {
    queues: Record<Servers, AssemblyObject[]>;
    events: SimulationEvent[];
    clock: number;
};
