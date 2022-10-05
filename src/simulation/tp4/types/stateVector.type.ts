export type activity = {
    uRnd: number;
    random: number;
};

export type stateVector = {
    activities: activity[];
    assemblyDuration: number;
    durationAcumulator: number;
    simulationCounter: number;
    finishedBefore45Counter: number;
    maxDuration: number;
    minDuration: number;
};
