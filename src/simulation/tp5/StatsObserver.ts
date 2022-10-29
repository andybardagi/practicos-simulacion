import { Servers } from './enum/Servers';
import { AssemblyObject } from './AssemblyObject';
import { tp5StatsType } from './types/stats.type';
export class StatsObserver {
    private assemblyDurationAcumulator: number = 0;
    private queueDurationAcumulator: Record<Servers, number>;
    private maxQueueQuantity: Record<Servers, number>;
    private serverOcupation: Record<Servers, number>;
    private finishedAssemblies: number = 0;
    private requestedAssemblies: number = 0;
    private finalQueues: Record<Servers, number>;
    private hourAssemblies: Record<number, number>;

    constructor() {
        const initialization_0 = {
            [Servers.server1]: 0,
            [Servers.server2]: 0,
            [Servers.server3]: 0,
            [Servers.server4]: 0,
            [Servers.server5]: 0,
        };
        this.queueDurationAcumulator = structuredClone(initialization_0);
        this.maxQueueQuantity = structuredClone(initialization_0);
        this.serverOcupation = structuredClone(initialization_0);
        this.finalQueues = structuredClone(initialization_0);
        this.hourAssemblies = {
            0: 0,
            1: 0,
        };
    }

    public notifyArrives(n: number) {
        this.requestedAssemblies += n;
    }

    public notifyAssemblyFinish(asObj: AssemblyObject, clock: number) {
        this.finishedAssemblies++;
        this.assemblyDurationAcumulator += asObj.getTotalDuration();
        const queueTimes = asObj.getQueuesDuration();
        this.queueDurationAcumulator[Servers.server1] += queueTimes[Servers.server1];
        this.queueDurationAcumulator[Servers.server2] += queueTimes[Servers.server2];
        this.queueDurationAcumulator[Servers.server3] += queueTimes[Servers.server3];
        this.queueDurationAcumulator[Servers.server4] += queueTimes[Servers.server4];
        this.queueDurationAcumulator[Servers.server5] += queueTimes[Servers.server5];

        const hour = Math.ceil(clock / 60);
        if (this.hourAssemblies[hour] != null && this.hourAssemblies[hour] != undefined) {
            this.hourAssemblies[hour]++;
        } else {
            this.hourAssemblies[hour] = 1;
        }
    }

    public notifyQueueQuantity(server: Servers, quant: number) {
        if (this.maxQueueQuantity[server] < quant) {
            this.maxQueueQuantity[server] = quant;
        }
    }

    public notifyServerOcupation(
        server: Servers,
        oldClock: number,
        newClock: number,
        busy: boolean,
    ) {
        this.serverOcupation[server] =
            this.serverOcupation[server] * oldClock + (busy ? 0 : 1) * (newClock - oldClock);
    }

    public getFinalStats(clock: number): tp5StatsType {
        {
            const queueAverageTime = {
                [Servers.server1]:
                    this.queueDurationAcumulator[Servers.server1] / this.finishedAssemblies,
                [Servers.server2]:
                    this.queueDurationAcumulator[Servers.server2] / this.finishedAssemblies,
                [Servers.server3]:
                    this.queueDurationAcumulator[Servers.server3] / this.finishedAssemblies,
                [Servers.server4]:
                    this.queueDurationAcumulator[Servers.server4] / this.finishedAssemblies,
                [Servers.server5]:
                    this.queueDurationAcumulator[Servers.server5] / this.finishedAssemblies,
            };

            return {
                averageAssemblyDuration: this.assemblyDurationAcumulator / this.finishedAssemblies,
                realizedAssembliesRatio: this.finishedAssemblies / this.requestedAssemblies,
                maxQueueQuantByServer: structuredClone(this.maxQueueQuantity),
                serversOccupation: structuredClone(this.serverOcupation),
                queueAverageTimes: queueAverageTime,
                assembliesQuantPerHour: structuredClone(this.hourAssemblies),
                averageAssembliesPerHour: this.finishedAssemblies / (clock / 60),
                pGreaterOrEqualThan3: 0, // pendiente
                finishedAssemblies: this.finishedAssemblies
            };
        }
    }
}
