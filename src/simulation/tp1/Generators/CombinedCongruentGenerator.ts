// x_{n+1} = (aX_n + c) mod m → combinedCongruent
import { IRandomGenerator } from '../interfaces/GeneratorInterface';

export class CombinedCongruentGenerator implements IRandomGenerator {
    private valueA: number;
    private valueC: number;
    private valueM: number;
    private seed: number;
    private lastRandomGenerated: number;

    constructor(valueA: number, valueC: number, valueM: number, seed: number) {
        this.valueA = valueA;
        this.valueC = valueC;
        this.valueM = valueM;
        this.seed = seed;
        this.lastRandomGenerated = seed;
    }

    generateRandom(): number {
        this.lastRandomGenerated =
            (this.valueA * this.lastRandomGenerated + this.valueC) % this.valueM;
        return this.lastSequenceToNumber();
    }

    getLastGenerated(): number {
        return this.lastSequenceToNumber();
    }

    generateRandomInRange(min: number, max: number): number {
        this.lastRandomGenerated = this.generateRandom();
        return this.lastSequenceToNumber() * (max - min) + min;
    }

    generateManyRandoms(amount: number): number[] {
        const generatedRandoms = [];
        for (let i = 0; i < amount; i++) {
            generatedRandoms.push(this.generateRandom());
        }
        return generatedRandoms;
    }

    lastSequenceToNumber() {
        return this.lastRandomGenerated / this.valueM;
    }

    getLastXi(): number {
        return this.lastRandomGenerated;
    }
}
