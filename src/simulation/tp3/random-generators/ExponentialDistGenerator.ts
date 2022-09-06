import { BaseDistGenerator } from './BaseDistGenerator';

export class ExponentialDistGenerator extends BaseDistGenerator {
    private lambda: number;

    constructor(lambda: number, intervalsQuantity: number) {
        super(intervalsQuantity);
        this.lambda = lambda;
    }

    generateRandom(): number {
        return (-1 / this.lambda) * Math.log(this.getUniformRandom());
    }

    setIntervalsExpected(): void {
        this.intervalHandler.setExponentialExpectedValues(this.lambda);
    }
}
