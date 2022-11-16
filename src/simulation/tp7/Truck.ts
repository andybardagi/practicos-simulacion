import { RungeKuta } from "./RungeKuta";

export class Truck {
    public id: number;
    private quantity: number;
    private arriveTime: number = -1;
    private queueTime: number = -1;
    private finishTime: number = -1;
    private duration: number = -1;
    private rk: RungeKuta = new RungeKuta(0, 0, 0, 0.5);

    constructor(id: number, clock: number) {
        this.id = id;
        this.quantity = this.calculateTrackTons();
        this.arriveTime = clock;
    }

    public calculateTrackTons(): number{
        let x: number = Math.random()
        if (x > 0.5) {
            return 10;
        }
        return 12;
    }

    public calculateDuration(cant: number): number {
        return this.rk.calculateDuration(cant);
    }

    public getQuantity(): number{
        return this.quantity;
    }
    public getDuration(): number{
        return this.duration;
    }

    public setQueueTime(clock: number): void {
        this.queueTime = clock - this.arriveTime;
    }

    public setQuantity(n: number) {
        this.quantity = n;
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
        return this.queueTime;
    }

    public setArrivalTime(clock: number){
        this.arriveTime = clock;
    }
    public getArrive() {
        return this.arriveTime;
    }
    public getId() {
        return this.id;
    }

}
