import { Silos } from './enum/Silos';
import { states } from './enum/States';
import { Silo } from './Silo';
import { Truck } from './Truck';
import { tp7StatsType } from './types/stats.type';
export class StatsObserver {
    private assemblyDurationAcumulator: number = 0;
    private maximaCola: number = 0;
    private toneladasDisponibles: Record<Silos, number> | undefined;
    private finishedAssemblies: number = 0;
    private requestedAssemblies: number = 0;
    private hourAssemblies: Record<number, number> | undefined;

    constructor() {
        const initialization_0 = {
        };
    }

    public getFinalStats(clock: number): tp7StatsType {
        return {maxQueueQuantByServer: clock}
    }
}
