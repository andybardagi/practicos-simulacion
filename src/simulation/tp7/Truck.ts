import { RungeKuta } from "./RungeKuta";

export class Truck {
    public id: number;
    private quantity: number;
    private arriveTime: number;
    private attendedTime: number = -1;
    private finishTime: number = -1;

    constructor(id: number, arriveTime: number, quantity: number) {
        this.id = id;
        this.arriveTime = arriveTime;
        this.quantity = quantity;
        this.calculateDuration;
    }

    public calculateDuration(): number {
        let rk: RungeKuta = new RungeKuta(0, 0, 0, 0.5, this.quantity);
        return rk.calculateDuration();
    }

    public setQueueTime(clock: number): void {
        this.attendedTime = clock - this.arriveTime;
    }

    public setFinishTime(n: number) {
        this.finishTime = n;
    }

    public hasFinished(): boolean {
        return this.finishTime != -1;
    }

    public getTotalDuration() {
        return this.finishTime - this.arriveTime;
    }
    public getQueueDuration(): number{
        return this.attendedTime - this.arriveTime;
    }

    public getId() {
        return this.id;
    }
}
