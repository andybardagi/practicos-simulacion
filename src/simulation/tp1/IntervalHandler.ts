import { IInterval } from './IIntervals';
export class IntervalHandler {
    private minValue?: number;
    private maxValue?: number;
    private intervalQuantity: number;
    private intervalRange: number = 0;
    private totalCounter: number;
    private intervals: IInterval[];
    private numbers: number[] = [];

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
            return Math.floor((number - this.minValue) / this.intervalRange);
        } else {
            throw Error(
                'The method getIntervalIndex was invocated before simulation',
            );
        }
    }

    public processIntervals(): void {
        if (this.minValue == undefined || this.maxValue == undefined) {
            throw Error(
                'The methos processIntervals was invocated before simulation',
            );
        }
        // Calculate the interval range
        this.intervalRange =
            (this.maxValue - this.minValue) / this.intervalQuantity;

        // Calculate the intervals and creates them into the interval array
        for (let i = 0; i < this.intervalQuantity; i++) {
            this.intervals.push({
                lowerLimit: this.minValue + i * this.intervalRange,
                upperLimit: this.minValue + (i + 1) * this.intervalRange,
                quantity: 0,
                numbers: [],
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
}
