import { AssemblyObject } from '../AssemblyObject';
import { Servers } from '../enum/Servers';
import { SimulationEvent } from '../enum/SimulationEvent';
import { tp6StatsType } from './stats.type';
import { RungeKuttaLine } from './rungeKuttaEvolution';
export type stateVector = tp6StatsType & {
    queues: Record<Servers, AssemblyObject[]>;
    current: Record<Servers, AssemblyObject | null>;
    events: SimulationEvent[];
    clock: number;
    rungeKuttaEvolution: RungeKuttaLine[];
};
