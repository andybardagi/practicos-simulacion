interface IntervalWithPercentage extends IInterval {
    percentage: number;
}

import { IInterval } from '../interfaces/IIntervals';
export class UniformIntervalHandler {
    private minValue: number;
    private maxValue: number;
    private intervalQuantity: number;
    private intervalRange: number = 0;
    private totalCounter: number;
    private intervals: IntervalWithPercentage[];
    private numbers: number[] = [];

    constructor(intervalQuantity: number, minValue = 0, maxValue = 1) {
        this.intervalQuantity = intervalQuantity;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.totalCounter = 0;

        //Generate uniform intervals
        this.intervals = [];
        for (let i = 0; i < this.intervalQuantity; i++) {
            this.intervals.push({
                lowerLimit: this.minValue + i * this.intervalRange,
                upperLimit: this.minValue + (i + 1) * this.intervalRange,
                numbers: [],
                quantity: 0,
                expected: 0,
                percentage: 0,
            });
        }
    }

    public addNumber(number: number): void {
        this.totalCounter++;
        this.numbers.push(number);
    }

    public getIntervalIndex(number: number): number {
        if (number === 0) {
            return 0;
        }
        return number == this.maxValue
            ? this.intervals.length - 1 //to avoid the maxValue from launching index out of range
            : Math.floor((number - this.minValue) / this.intervalRange);
    }

    public processIntervals(): void {
        if (
            this.minValue == undefined ||
            this.maxValue == undefined ||
            this.numbers.length == 0
        ) {
            throw Error(
                'The methos processIntervals was invocated before simulation',
            );
        }

        // Calculate the interval range
        this.intervalRange =
            (this.maxValue - this.minValue) / this.intervalQuantity;

        if (this.intervalRange == 0) {
            this.intervals.push({
                lowerLimit: this.minValue,
                upperLimit: this.maxValue,
                quantity: this.totalCounter,
                numbers: this.numbers,
                expected: 0,
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
            });
        }

        // Process the simulated numbers and add it into the intervals
        for (let i = 0; i < this.numbers.length; i++) {
            const intervalIndex = this.getIntervalIndex(this.numbers[i]);
            this.intervals[intervalIndex].quantity++;
            this.intervals[intervalIndex].numbers.push(this.numbers[i]);
        }
    }

    public getIntervals() {
        return this.intervals;
    }

    public getCounter(): number {
        return this.totalCounter;
    }

    public getUniformWaitedValues(): number {
        return this.totalCounter / this.intervalQuantity;
    }

    public setUniformExpectedValues(): void {
        for (let i = 0; i < this.intervals.length; i++) {
            this.intervals[i].expected =
                this.totalCounter / this.intervalQuantity;
        }
    }
}
