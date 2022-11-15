import { Silos } from "../enum/Silos";

export type tp6StatsType = {
    averageAssemblyDuration: number,
    realizedAssembliesRatio: number,
    maxQueueQuantByServer: Record<Silos, number>,
    serversOccupation: Record<Silos, number>,
    queueAverageTimes: Record<Silos,number>,
    assembliesQuantPerHour: Record<number, number>,
    averageAssembliesPerHour: number,
    pGreaterOrEqualThan3: number,
    finishedAssemblies: number
};
