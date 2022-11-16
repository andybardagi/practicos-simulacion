
export class Client {
    private fullName: string;
    private id: number;
    private arriveTime: number;
    private startAtentionTime: number = -1;
    private exitTime: number = -1;
    private productsWanted: number;

    constructor(id: number, clock: number) {
        this.fullName = `Cliente ${id}`;
        this.id = id;
        this.arriveTime = clock;
        // Each client buys between 1 and 3 products
        this.productsWanted = Math.floor(Math.random() * 3) + 1;
    }

    public getProductQuantity() {
        return this.productsWanted;
    }

    public getFullName() {
        return this.fullName;
    }

    public getId() {
        return this.id;
    }

    public setExitTime(clock: number) {
        this.exitTime = clock;
    }

    public setAtentionTime(clock: number) {
        this.startAtentionTime = clock;
    }
}
