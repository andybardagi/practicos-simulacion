import { IInterval } from '../interfaces/IIntervals';
import {ChiSquared, R} from 'lib-r-math.js';

const { seq, multiplex, numberPrecision} = R

//helpers
const seqa = seq()();
const log = multiplex(Math.log);
const _9 = numberPrecision(9);

const { dchisq, pchisq, qchisq, rchisq } = ChiSquared();
export class ChiTester{

    private intervals: IInterval[];
    private c: number = 0;

    constructor(intervals: IInterval[]){
        this.intervals = intervals;
    }

    public setIntervals(intervals: IInterval[]){
        this.intervals = intervals;
    }

    public calculateC(){
        let sum = 0;
        for(let i = 0; i < this.intervals.length; i++){
            if (this.intervals[i].expected !== 0){
                sum += (this.intervals[i].expected - this.intervals[i].quantity)**2/this.intervals[i].expected;
            }
        }
        this.c = sum;
        return this.c;
    }

    public makeTest(){
        
        let result = qchisq(0.99, this.intervals.length-1);
        console.log(result);

        return {
            chiValue: result,
            isAccepted: result > this.c
        };
        

    }

}