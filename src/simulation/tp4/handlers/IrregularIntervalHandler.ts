import { IInterval } from '../../tp1/interfaces/IIntervals';
import { number } from 'yup';
import { IntervalStatType } from '../types/intervalStat.type';
export class IrregularIntervalHandler {
    private total: number = 0;
    private intervals: { upperLimit: number; observed: number }[] = [
        { upperLimit: Infinity, observed: 0 },
    ];

    public addLimit(n: number): void {
        this.intervals.push({
            upperLimit: n,
            observed: 1,
        });
        this.sortIntervals();
    }

    private sortIntervals() {
        this.intervals.sort((a, b) => a.upperLimit - b.upperLimit);
    }

    public addNumber(n: number) {
        this.total++;
        for (let i = 0; i < this.intervals.length; i++) {
            if (this.intervals[i].upperLimit >= n) {
                this.intervals[i].observed += 1;
                break;
            }
        }
    }

    public getStats(): IntervalStatType[] {
        const arrStats: IntervalStatType[] = this.intervals.map((i) => ({
            ...i,
            prob: i.observed / this.total,
            acumProb: 0,
        }));

        let lastProb = 0;
        for (let i = 0; i < arrStats.length; i++) {
            arrStats[i].acumProb = arrStats[i].prob + lastProb;
            lastProb = arrStats[i].acumProb;
        }
        return arrStats;
    }
}
