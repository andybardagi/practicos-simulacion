import { IRandomGenerator } from './GeneratorInterface';
// x_{n+1} = (aX_n + c) mod m → mixedCongruent

export class MixedCongruentGenerator implements IRandomGenerator {
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
            (this.valueA * this.lastRandomGenerated + this.valueC) %
            this.valueM;
        return this.lastRandomGenerated / (this.valueM - 1 );
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
