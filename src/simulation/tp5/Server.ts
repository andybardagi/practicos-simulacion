import ts from 'typescript';
import { AssemblyObject } from './AssemblyObject';
export abstract class Server {
    private tail: AssemblyObject[] = [];
    private currentAssembly: AssemblyObject;
    private estimatedFinish: number;

    constructor() {}

    getEstimatedFinish(): number {
        return this.estimatedFinish;
    }

    public calculateNextFinish(clock: number): number{
        const td = this.calculateTaskDuration()
        this.estimatedFinish = clock + td;
        return this.estimatedFinish;
    }
    public abstract calculateTaskDuration(): number;


}
