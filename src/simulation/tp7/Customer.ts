export class Customer {
    private name: string;
    private id: number;
    private arriveTime: number;
    private startAtentionTime: number = -1;
    private exitTime: number = -1;
    private unitiesToBuy: number;

    constructor(id: number, clock: number){
        this.name = `Cliente ${id}`;
        this.id = id;
        this.arriveTime = clock;
        this.unitiesToBuy = Math.floor(Math.random()*3) + 1;
    }

    public getUnities() {
        return this.unitiesToBuy;
    }

    public getName(){
        return this.name;
    }

    public getId(){
        return this.id;
    }

    public setExitTime(clock: number){
        this.exitTime = clock;
    }

    public setAtentionTime(clock: number){
        this.startAtentionTime = clock;
    }
}