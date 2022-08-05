import { IRandomGenerator } from './GeneratorInterface';
// x_{n+1} = (x_n + x_{n-1}) mod m → linearCongruent

export class LinearCongruentGenerator implements IRandomGenerator {
    private firstSeed: number;
    private secondSeed: number;
    private valueM: number;
    private lastRandomGenerated: number;
    private preLastRandomGenerated: number;

    constructor(
        valueC: number,
        valueM: number,
        firstSeed: number,
        secondSeed: number,
    ) {
        this.firstSeed = firstSeed;
        this.secondSeed = secondSeed;
        this.valueM = valueM;
        this.preLastRandomGenerated = firstSeed;
        this.lastRandomGenerated = secondSeed;
    }

    generateRandom(): number {
        const futurePreLast = this.lastRandomGenerated;
        this.lastRandomGenerated = (this.lastRandomGenerated + this.preLastRandomGenerated) % this.valueM;
        this.preLastRandomGenerated = futurePreLast;
        return this.lastRandomGenerated;
    }

    getLastGenerated(): number {
        return this.lastRandomGenerated;
    }

    generateRandomInRange(min: number, max: number): number {
        this.lastRandomGenerated = this.generateRandom() * (max - min) + min;
        return this.lastRandomGenerated;
    }

    generateManyRandoms(amount: number): number[] {
        const generatedRandoms = [];
        for (let i = 0; i < amount; i++) {
            generatedRandoms.push(this.generateRandom());
        }
        return generatedRandoms;
    }
}
