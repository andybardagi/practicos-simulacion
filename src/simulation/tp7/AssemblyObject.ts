import { Servers } from './enum/Servers';
export class AssemblyObject {
    public id: number;
    private queueTimes: Record<Servers, number>;
    private arriveToQueueTimes: Record<Servers, number>;
    private serverTimes: Record<Servers, number>;
    private assemblyDuration: number = -1;
    private arriveTime: number;
    private finishTime: number = -1;

    constructor(id: number, arriveTime: number) {
        this.id = id;
        this.arriveTime = arriveTime;
        this.queueTimes = {
            [Servers.server1]: -1,
            [Servers.server2]: -1,
            [Servers.server3]: -1,
            [Servers.server4]: -1,
        };
        this.serverTimes = {
            [Servers.server1]: -1,
            [Servers.server2]: -1,
            [Servers.server3]: -1,
            [Servers.server4]: -1,
        };
        this.arriveToQueueTimes = {
            [Servers.server1]: -1,
            [Servers.server2]: -1,
            [Servers.server3]: -1,
            [Servers.server4]: -1,
        };
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

    public hasFinishedAll(): boolean {
        return (
            this.hasFinishedServer(Servers.server1) &&
            this.hasFinishedServer(Servers.server2) &&
            this.hasFinishedServer(Servers.server3) &&
            this.hasFinishedServer(Servers.server4) 
        );
    }

    public getTotalDuration() {
        return this.finishTime - this.arriveTime;
    }

    public getQueuesDuration() {
        return this.queueTimes;
    }

    public getId() {
        return this.id;
    }
}
