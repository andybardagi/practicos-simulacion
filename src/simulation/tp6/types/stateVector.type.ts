import { AssemblyObject } from '../AssemblyObject';
import { Servers } from '../enum/Servers';
import { SimulationEvent } from '../enum/SimulationEvent';
import { tp6StatsType } from './stats.type';
export type stateVector = tp6StatsType & {
    queues: Record<Servers, AssemblyObject[]>;
    events: SimulationEvent[];
    clock: number;
};
