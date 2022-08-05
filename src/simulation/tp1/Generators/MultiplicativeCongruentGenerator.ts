//x_{n+1} = (aX_n) mod m

export class MultiplicativeCongruentGenerator {
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
        this.lastRandomGenerated = (this.valueA * this.lastRandomGenerated) % this.valueM;
        return this.lastRandomGenerated;
    }

    getLastGenerated(): number {
        return this.lastRandomGenerated;
    }

    generateRandomInRange(min: number, max: number): number {
        this.lastRandomGenerated = (this.generateRandom() * (max - min)) + min;
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