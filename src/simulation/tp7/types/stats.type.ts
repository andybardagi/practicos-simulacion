import { Servers } from "../enum/Servers";

export type tp6StatsType = {
    averageAssemblyDuration: number,
    realizedAssembliesRatio: number,
    maxQueueQuantByServer: Record<Servers, number>,
    serversOccupation: Record<Servers, number>,
    queueAverageTimes: Record<Servers,number>,
    assembliesQuantPerHour: Record<number, number>,
    averageAssembliesPerHour: number,
    pGreaterOrEqualThan3: number,
    finishedAssemblies: number
};
