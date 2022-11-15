import { Silos } from './enum/Silos';
import { states } from './enum/states';
import { Truck } from './Truck';
import { tp6StatsType } from './types/stats.type';
export class StatsObserver {
    private assemblyDurationAcumulator: number = 0;
    private queueDurationAcumulator: Record<Silos, number>;
    private maxQueueQuantity: Record<Silos, number>;
    private serverOcupation: Record<Silos, number>;
    private finishedAssemblies: number = 0;
    private requestedAssemblies: number = 0;
    private finalQueues: Record<Silos, number>;
    private hourAssemblies: Record<number, number>;

    constructor() {
        const initialization_0 = {
            [Silos.silo1]: 0,
            [Silos.silo2]: 0,
            [Silos.silo3]: 0,
            [Silos.silo4]: 0,
        };
        this.queueDurationAcumulator = structuredClone(initialization_0);
        this.maxQueueQuantity = structuredClone(initialization_0);
        this.serverOcupation = structuredClone(initialization_0);
        this.finalQueues = structuredClone(initialization_0);
        this.hourAssemblies = {
            1: 0,
        };
    }

    public notifyArrives(n: number) {
        this.requestedAssemblies += n;
    }

    /*public notifyAssemblyFinish(tk : Truck, clock: number) {
        this.finishedAssemblies++;
        this.assemblyDurationAcumulator += tk.getTotalDuration();
        const queueTimes = tk.getQueueDuration();
        this.queueDurationAcumulator[Silos.silo1] += queueTimes[Silos.silo1];
        this.queueDurationAcumulator[Silos.silo2] += queueTimes[Silos.silo2];
        this.queueDurationAcumulator[Silos.silo3] += queueTimes[Silos.silo3];
        this.queueDurationAcumulator[Silos.silo4] += queueTimes[Silos.silo4];

        const hour = Math.ceil(clock / 60);
        if (this.hourAssemblies[hour] != null && this.hourAssemblies[hour] != undefined) {
            this.hourAssemblies[hour]++;
        } else {
            this.hourAssemblies[hour] = 1;
        }
    }*/

    public notifyQueueQuantity(silo: Silos, quant: number) {
        if (this.maxQueueQuantity[silo] < quant) {
            this.maxQueueQuantity[silo] = quant;
        }
    }

    public notifyServerOcupation(
        silo: Silos,
        oldClock: number,
        newClock: number,
        busy: states,
    ) {
        if (newClock != 0) {
            this.serverOcupation[silo] =
                (this.serverOcupation[silo] * oldClock + (busy ? 1 : 0) * (newClock - oldClock)) /
                newClock;
        }
    }

    public getFinalStats(clock: number): tp6StatsType {
        {
            const queueAverageTime = {
                [Silos.silo1]:
                    this.queueDurationAcumulator[Silos.silo1] / this.finishedAssemblies,
                [Silos.silo2]:
                    this.queueDurationAcumulator[Silos.silo2] / this.finishedAssemblies,
                [Silos.silo3]:
                    this.queueDurationAcumulator[Silos.silo3] / this.finishedAssemblies,
                [Silos.silo4]:
                    this.queueDurationAcumulator[Silos.silo4] / this.finishedAssemblies,
            };

            const pHoursGEthan3 =
                Object.values(this.hourAssemblies).filter((v) => v >= 3).length /
                Object.values(this.hourAssemblies).length;

            return {
                averageAssemblyDuration: this.assemblyDurationAcumulator / this.finishedAssemblies,
                realizedAssembliesRatio: this.finishedAssemblies / this.requestedAssemblies,
                maxQueueQuantByServer: structuredClone(this.maxQueueQuantity),
                serversOccupation: structuredClone(this.serverOcupation),
                queueAverageTimes: queueAverageTime,
                assembliesQuantPerHour: structuredClone(this.hourAssemblies),
                averageAssembliesPerHour: this.finishedAssemblies / (clock / 60),
                pGreaterOrEqualThan3: pHoursGEthan3, // pendiente
                finishedAssemblies: this.finishedAssemblies,
            };
        }
    }
}
