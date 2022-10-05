import { BaseDistGenerator } from './BaseDistGenerator';
import { activity } from '../../tp4/types/stateVector.type';

export class ExponentialDistGenerator extends BaseDistGenerator {
    private lambda: number;

    constructor(lambda: number, intervalsQuantity: number) {
        super(intervalsQuantity);
        this.lambda = lambda;
    }

    generateRandom(): number {
        return (-1 / this.lambda) * Math.log(this.getUniformRandom());
    }

    generateRandomActivity(): activity {
        const uRandom = this.getUniformRandom();
        return {
            uRnd: uRandom,
            random: (-1 / this.lambda) * Math.log(uRandom),
        };
    }

    setIntervalsExpected(): void {
        this.intervalHandler.setExponentialExpectedValues(this.lambda);
    }
}
