import { AssemblyObject } from '../AssemblyObject';
import { Servers } from '../enum/Servers';
import { SimulationEvent } from '../enum/SimulationEvent';
import { tp7StatsType } from './stats.type';
import { RungeKuttaLine } from './rungeKuttaEvolution';
export type stateVector = tp7StatsType & {
    queues: Record<Servers, AssemblyObject[]>;
    current: Record<Servers, AssemblyObject | null>;
    events: SimulationEvent[];
    clock: number;
    rungeKuttaEvolution: RungeKuttaLine[];
};
