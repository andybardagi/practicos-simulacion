import CombinedCongruentGenerator from '../../tp1/random-generators/CombinedCongruentGenerator';
export abstract class BaseDistGenerator {
    private uniformGenerator: CombinedCongruentGenerator;
    private generation: number[] = [];

    constructor() {
        const now = new Date();
        const initialSeed = now.getTime();
        this.uniformGenerator = new CombinedCongruentGenerator(11, 7, 2 ** 61, initialSeed);
    }

    protected getUniformRandom(): number {
        return this.uniformGenerator.generateRandom();
    }

    abstract generateRandom(): number;

    private generateDistribution(quantity: number) {
        for (let i = 0; i < quantity; i++) {
            this.generation.push(this.generateRandom());
        }
    }

    public getGeneration(): number[] {
        return this.generation;
    }
}
