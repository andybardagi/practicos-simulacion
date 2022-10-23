import { Servers } from './enum/Servers';
export class AssemblyObject {
    private id: number;
    private tailTimes: Record<Servers, number>;
    private arriveToTailTimes: Record<Servers, number>;
    private serverTimes: Record<Servers, number>;
    private assemblyDuration: number = -1;
    private arriveTime: number;
    private finishTime: number = -1;

    constructor(id: number, arriveTime: number) {
        this.id = id;
        this.arriveTime = arriveTime;
        this.tailTimes = {
            [Servers.server1]: -1,
            [Servers.server2]: -1,
            [Servers.server3]: -1,
            [Servers.server4]: -1,
            [Servers.server5]: -1,
        };
        this.serverTimes = {
            [Servers.server1]: -1,
            [Servers.server2]: -1,
            [Servers.server3]: -1,
            [Servers.server4]: -1,
            [Servers.server5]: -1,
        };
        this.arriveToTailTimes = {
            [Servers.server1]: -1,
            [Servers.server2]: -1,
            [Servers.server3]: -1,
            [Servers.server4]: -1,
            [Servers.server5]: -1,
        };
    }

    public calculateAssembyDuration(): number {
        this.assemblyDuration = 0; // calcular
        return this.assemblyDuration;
    }

    public setTailTime(server: Servers, clock: number): void {
        this.tailTimes[server] = clock - this.arriveToTailTimes[server];
    }
    public setServerTime(server: Servers, duration: number): void {
        this.serverTimes[server] = duration;
    }
    public setArriveToTailTime(server: Servers, duration: number): void {
        this.arriveToTailTimes[server] = duration;
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
            this.hasFinishedServer(Servers.server4) &&
            this.hasFinishedServer(Servers.server5)
        );
    }
}
