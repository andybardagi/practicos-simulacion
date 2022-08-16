export interface IRandomGenerator {
    generateRandom(): number;
    getLastGenerated(): number;
    generateRandomInRange(min: number, max: number): number;
    generateManyRandoms(amount: number): number[];
    lastSequenceToNumber(): number;
    getLastXi(): number;
}