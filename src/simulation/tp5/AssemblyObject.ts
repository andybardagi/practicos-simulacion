export class AssemblyObject {
    private id: number;
    private tailTimes: Record<number, number>;
    private serverTimes: Record<number, number>;
    private assemblyDuration: number;
    private arriveTime: number;
    private finishTime: number;

    constructor() {}

    public calculateAssembyDuration(): number {
        this.assemblyDuration = 0; // calcular
        return this.assemblyDuration;
    }

    public setTailTime(server: number, duration: number): void {}
    public setServerTime(server: number, duration: number): void {}
}
