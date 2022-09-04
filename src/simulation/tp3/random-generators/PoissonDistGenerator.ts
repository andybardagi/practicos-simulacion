import CombinedCongruent from '../../../components/TP1/CombinedCongruent';
import { BaseDistGenerator } from './BaseDistGenerator';

export class PoissonDistGenerator extends BaseDistGenerator {
    private lambda: number;

    constructor(lambda: number) {
        super();
        this.lambda = lambda;
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
}
