import { Truck } from '../Truck';
import { Silos } from '../enum/Silos';
import { SimulationEvent } from '../enum/SimulationEvent';
import { RungeKuttaLine } from './rungeKuttaEvolution';
import { Silo } from '../Silo';
export type stateVector = {
    states: Silo[];
    queue: Truck[];
    currentEvent: SimulationEvent;
    current: Truck;
    events: SimulationEvent[];
    clock: number;
    rungeKuttaEvolution: RungeKuttaLine[];
};
