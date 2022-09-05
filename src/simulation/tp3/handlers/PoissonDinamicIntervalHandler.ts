import { DinamicIntervalHandler } from './DinamicIntervalHandler';
export class PoissonDinamicIntervalHandler extends DinamicIntervalHandler {
    public processIntervals(): void {
        if (this.minValue !== undefined && this.maxValue !== undefined) {
            console.log('first');
            this.intervalQuantity = this.maxValue - this.minValue;
            this.intervalRange = 1;

            // Calculate the intervals and creates them into the interval array
            for (let i = 0; i < this.intervalQuantity; i++) {
                this.intervals.push({
                    lowerLimit: this.minValue - 0.5 + i * this.intervalRange,
                    upperLimit: this.minValue - 0.5 + (i + 1) * this.intervalRange,
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
    }

    
}
