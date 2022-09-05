import { BaseDistGenerator } from './BaseDistGenerator';

export class ExponentialDistGenerator extends BaseDistGenerator {
    private lambda: number;

    constructor(lambda: number) {
        super();
        this.lambda = lambda;
    }

    generateRandom(): number {
        return (-1 / this.lambda) * Math.log(this.getUniformRandom());
    }

    setIntervalsExpected(): void {
        this.intervalHandler.setExponentialExpectedValues(1,1);
    }
}
