import { Truck } from '../Truck';
import { Silos } from '../enum/Silos';
import { SimulationEvent } from '../enum/SimulationEvent';
import { RungeKuttaLine } from './rungeKuttaEvolution';
import { Silo } from '../Silo';
import { states } from '../enum/States';
export type stateVector = {
    states: states[];
    queue: Truck[];
    quantity: number[];
    currentEvent: SimulationEvent;
    current: Truck;
    events: SimulationEvent[];
    clock: number;
    rungeKuttaEvolution: RungeKuttaLine[];
};
