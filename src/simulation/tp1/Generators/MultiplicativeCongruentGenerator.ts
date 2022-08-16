//x_{n+1} = (aX_n) mod m

import { IRandomGenerator } from '../interfaces/GeneratorInterface';

export class MultiplicativeCongruentGenerator implements IRandomGenerator {
    private valueA: number;
    private valueM: number;
    private seed: number;
    private lastRandomGenerated: number;

    constructor(valueA: number, valueM: number, seed: number) {
        this.valueA = valueA;
        this.valueM = valueM;
        this.seed = seed;
        this.lastRandomGenerated = seed;
    }

    generateRandom(): number {
        this.lastRandomGenerated =
            (this.valueA * this.lastRandomGenerated) % this.valueM;
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
