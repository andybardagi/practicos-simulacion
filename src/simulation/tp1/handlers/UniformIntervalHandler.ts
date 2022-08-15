import { number } from 'yup';


import { IInterval } from '../interfaces/IIntervals';
import { IntervalWithPercentage } from '../interfaces/IIntervalWithPercentage';
export class UniformIntervalHandler {
    private minValue: number;
    private maxValue: number;
    private intervalQuantity: number;
    private intervalRange: number;
    private totalCounter: number = 0;
    public numbers: number[] = [];
    private intervals: IntervalWithPercentage[];

    constructor(intervalQuantity: number, minValue = 0, maxValue = 1) {
        this.intervalQuantity = intervalQuantity;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.intervalRange = (maxValue - minValue) / this.intervalQuantity;

        //Generate uniform intervals
        this.intervals = [];

        //For loop from 0 to the interval quantity.
        //This creates all the empty intervals needed.
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

    public addNumber(number: number) {
        //Update the controller state
        this.totalCounter++;
        this.numbers.push(number);
        //Update the intervals state
        const index = this.getIntervalIndex(number);
        this.intervals[index].quantity++;
        this.intervals[index].numbers.push(number);
        //Recalculate intervals percentage and expected value.
        this.updatePercentagesAndExpected();
    }

    private getIntervalIndex(number: number): number {
        if (number === this.minValue) {
            return 0;
        }
        return number == this.maxValue
            ? this.intervals.length - 1 //to avoid the maxValue from launching index out of range
            : Math.floor((number - this.minValue) / this.intervalRange);
    }

    public updatePercentagesAndExpected(): void {
        const uniformExpected = this.getUniformWaitedValues();
        for (let i = 0; i < this.intervalQuantity; i++) {
            this.intervals[i].percentage =
                this.intervals[i].quantity / this.totalCounter;

            this.intervals[i].expected = uniformExpected;
        }
    }

    public getIntervals() {
        return this.intervals;
    }

    public getCounter(): number {
        return this.totalCounter;
    }

    getNumbers() {
        return this.numbers;
    }

    public getUniformWaitedValues(): number {
        return this.totalCounter / this.intervalQuantity;
    }
}
