import { BaseDistGenerator } from './BaseDistGenerator';

export class NormalDistGenerator extends BaseDistGenerator {
    private average: number;
    private standarDeviation: number;

    constructor(average: number, standarDeviation: number, intervalsQuantity: number) {
        super(intervalsQuantity);
        this.average = average;
        this.standarDeviation = standarDeviation;
    }

    generateRandom(): number {
        //sqrt(-2*ln(1-r1))*cos(2*pi*r2)
        const random1 = this.getUniformRandom();
        const random2 = this.getUniformRandom();

        const z = Math.sqrt(-2 * Math.log(1 - random1)) * Math.cos(2 * Math.PI * random2);
        return this.average + z * this.standarDeviation;
    }

    setIntervalsExpected() {
        this.intervalHandler.setNormalExpectedValues(this.average, this.standarDeviation);
    }
}