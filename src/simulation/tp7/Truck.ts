
export class Truck {
    public id: number;
    private assemblyDuration: number = -1;
    private arriveTime: number;
    private finishTime: number = -1;

    constructor(id: number, arriveTime: number) {
        this.id = id;
        this.arriveTime = arriveTime;
    }

    public calculateAssembyDuration(): number {
        this.assemblyDuration = 0; // calcular
        return this.assemblyDuration;
    }

    public setQueueTime(server: Servers, clock: number): void {
        this.queueTimes[server] = clock - this.arriveToQueueTimes[server];
    }
    public setServerTime(server: Servers, duration: number): void {
        this.serverTimes[server] = duration;
    }
    public setArriveToQueueTime(server: Servers, duration: number): void {
        this.arriveToQueueTimes[server] = duration;
    }

    public setFinishTime(n: number) {
        this.finishTime = n;
    }

    public hasFinishedServer(s: Servers): boolean {
        return this.serverTimes[s] != -1;
    }

    public getTotalDuration() {
        return this.finishTime - this.arriveTime;
    }

    public getId() {
        return this.id;
    }
}
