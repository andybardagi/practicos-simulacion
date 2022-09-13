import NormalDistribution from 'normal-distribution';
import { IIntervalWithPercentage } from '../../tp1/interfaces/IIntervalWithPercentage';
import { factorial } from '../helpers/factorial';
export class DinamicIntervalHandler {
    protected minValue?: number;
    protected maxValue?: number;
    protected intervalQuantity: number;
    protected intervalRange: number = 0;
    protected totalCounter: number;
    protected intervals: IIntervalWithPercentage[];
    protected numbers: number[] = [];

    constructor(intervalQuantity: number) {
        this.intervalQuantity = intervalQuantity;
        this.totalCounter = 0;
        this.intervals = [];
    }

    public addNumber(number: number): void {
        if (this.minValue == undefined) {
            this.minValue = number;
        } else {
            this.minValue = number < this.minValue ? number : this.minValue;
        }

        if (this.maxValue == undefined) {
            this.maxValue = number;
        } else {
            this.maxValue = number > this.maxValue ? number : this.maxValue;
        }

        this.totalCounter++;
        this.numbers.push(number);
    }

    public getIntervalIndex(number: number): number {
        if (this.minValue != undefined && this.maxValue != undefined) {
            return number === 0
                ? 0
                : number == this.maxValue
                ? this.intervals.length - 1 //to avoid the maxValue from launching index out of range
                : Math.floor((number - this.minValue) / this.intervalRange);
        } else {
            throw Error('The method getIntervalIndex was invocated before simulation');
        }
    }

    public processIntervals(): void {
        if (this.minValue == undefined || this.maxValue == undefined || this.numbers.length == 0) {
            throw Error('The method processIntervals was invocated before simulation');
        }

        // Calculate the interval range
        this.intervalRange = (this.maxValue - this.minValue) / this.intervalQuantity;

        //In case all generated number are the same. Bad generation
        if (this.intervalRange == 0) {
            this.intervals.push({
                lowerLimit: this.minValue,
                upperLimit: this.maxValue,
                quantity: this.totalCounter,
                numbers: this.numbers,
                expected: 0,
                percentage: 1,
            });
            return;
        }

        // Calculate the intervals and creates them into the interval array
        for (let i = 0; i < this.intervalQuantity; i++) {
            this.intervals.push({
                lowerLimit: this.minValue + i * this.intervalRange,
                upperLimit: this.minValue + (i + 1) * this.intervalRange,
                quantity: 0,
                numbers: [],
                expected: 0,
                percentage: 0,
            });
        }

        // Process the simulated numbers and add it into the intervals
        for (let i = 0; i < this.numbers.length; i++) {
            const intervalIndex = this.getIntervalIndex(this.numbers[i]);
            this.intervals[intervalIndex].quantity++;
            this.intervals[intervalIndex].percentage =
                this.intervals[intervalIndex].percentage / this.totalCounter;
        }
    }

    public getIntervals() {
        return this.intervals;
    }

    public getCounter(): number {
        return this.totalCounter;
    }

    public getNumbers(): number[] {
        return this.numbers;
    }

    public groupIntervals(): void {
        let flagOK: boolean = false;
        while (!flagOK) {
            flagOK = true;
            const newIntervals: IIntervalWithPercentage[] = [];
            for (let i = 0; i < this.intervals.length; i++) {
                if (this.intervals[i].expected <= 5) {
                    this.intervalQuantity = this.intervalQuantity - 1;
                    flagOK = false;

                    if (i === this.intervals.length - 1) {
                        const interval: IIntervalWithPercentage = {
                            lowerLimit: this.intervals[i - 1].lowerLimit,
                            upperLimit: this.intervals[i].upperLimit,
                            expected: this.intervals[i - 1].expected + this.intervals[i].expected,
                            numbers: [],
                            percentage:
                                this.intervals[i - 1].percentage + this.intervals[i].percentage,
                            quantity: this.intervals[i - 1].quantity + this.intervals[i].quantity,
                        };
                        newIntervals[newIntervals.length - 1] = interval;
                    } else {
                        const interval: IIntervalWithPercentage = {
                            lowerLimit: this.intervals[i].lowerLimit,
                            upperLimit: this.intervals[i + 1].upperLimit,
                            expected: this.intervals[i + 1].expected + this.intervals[i].expected,
                            numbers: [],
                            percentage:
                                this.intervals[i + 1].percentage + this.intervals[i].percentage,
                            quantity: this.intervals[i + 1].quantity + this.intervals[i].quantity,
                        };
                        newIntervals.push(interval);
                        i++;
                    }
                } else {
                    newIntervals.push(structuredClone(this.intervals[i]));
                }
            }
            this.intervals = newIntervals;
        }
    }

    public setNormalExpectedValues(average: number, standarDeviation: number): void {
        console.log(average, standarDeviation);
        const normalDist = new NormalDistribution(average, standarDeviation);
        this.intervals.forEach((i) => {
            i.expected =
                normalDist.probabilityBetween(i.lowerLimit, i.upperLimit) * this.totalCounter;
        });
    }
    public setExponentialExpectedValues(lambda: number): void {
        this.intervals.forEach((i) => {
            const cumulativeUpper = 1- Math.exp(-1 * lambda * i.upperLimit);
            const cumulativeLower = 1- Math.exp(-1 * lambda * i.lowerLimit);
            i.expected = (cumulativeUpper - cumulativeLower) * this.totalCounter;
        });
    }

    public setPoissonExpectedValues(lambda: number): void {
        this.intervals.forEach((i) => {
            const mark = i.upperLimit - 0.5;
            console.log(mark);
            i.expected =
                ((lambda ** mark * Math.exp(-lambda)) / factorial(mark)) * this.totalCounter;
        });
    }
}
