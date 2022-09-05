import CombinedCongruent from '../../../components/TP1/CombinedCongruent';
import { BaseDistGenerator } from './BaseDistGenerator';
import { PoissonDinamicIntervalHandler } from '../handlers/PoissonDinamicIntervalHandler';

export class PoissonDistGenerator extends BaseDistGenerator {
    private lambda: number;

    constructor(lambda: number) {
        super();
        this.lambda = lambda;
        this.intervalHandler = new PoissonDinamicIntervalHandler(0);
    }

    generateRandom(): number {
        let p = 1;
        let x = -1;
        let a = Math.exp(-this.lambda);
        let u = this.getUniformRandom();
        p = p * u;
        x = x + 1;
        while (p >= a) {
            u = this.getUniformRandom();
            p = p * u;
            x = x + 1;
        }
        return x;
    }

    setIntervalsExpected(): void {
        this.intervalHandler.setPoissonExpectedValues(this.lambda);
    }

    public getClassMarks(): string[] {
        const classMarks: string[] = this.intervalHandler
            .getIntervals()
            .map((i) => ((i.upperLimit + i.lowerLimit) / 2).toFixed(0).toString());
        return classMarks;
    }
}
