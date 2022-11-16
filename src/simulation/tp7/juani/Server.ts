import { number } from 'yup';
import { AssemblyObject } from './AssemblyObject';
import { Coordinator } from './Coordinator';
import { Servers } from './enum/Servers';
import { EventType } from './enum/SimulationEvent';
import { RungeKuttaLine } from './types/rungeKuttaEvolution';
export abstract class Server {
    private id: Servers;
    private queue: AssemblyObject[] = [];
    private currentAssembly: AssemblyObject | null;
    private estimatedFinish: number = 0;
    private coord: Coordinator;

    constructor(id: Servers, coord: Coordinator) {
        this.id = id;
        this.coord = coord;
        this.currentAssembly = null;
    }

    private calculateNextFinish(clock: number): number {
        this.estimatedFinish = this.calculateTaskDuration();
        return this.estimatedFinish + clock;
    }

    public abstract calculateTaskDuration(): number;

    public getCurrent(){
        return this.currentAssembly;
    }

    public getRungeKuttaEvolution(): RungeKuttaLine[]{
        throw Error('getRungeKuttaEvolution: Not implemented');
    }

    public finishCurrentTask(clock: number): AssemblyObject {
        if (this.currentAssembly == null) {
            //console.log(this.id);
            throw Error('Finalizando evento fantasma');
        }
        //Finalizo el ensamble.
        this.currentAssembly?.setServerTime(this.id, this.estimatedFinish);
        const old = this.currentAssembly;
        this.currentAssembly = null;
        if (this.queue.length > 0) {
            this.currentAssembly = this.queue.shift() as AssemblyObject;
            this.currentAssembly.setQueueTime(this.id, clock);
            this.coord.addPendingEvent({
                type: EventType.finishTask,
                time: this.calculateNextFinish(clock),
                server: this.id,
            });
        }
        return old;
    }

    /**
     *
     * @param asObj AssemblyObject a encolar o procesar
     * @param clock Tiempo de la simulación en la que se invoca la operación de encolado
     * @returns number cantidad de elementos en cola para ese momento.
     */
    public queueAssembly(asObj: AssemblyObject, clock: number): number {
        asObj.setArriveToQueueTime(this.id, clock);
        //Chequeo si el servidor está ocupado
        if (this.currentAssembly == null) {
            //No lo esta, seteo el actual
            this.currentAssembly = asObj;
            this.currentAssembly.setQueueTime(this.id, clock);
            this.calculateNextFinish(clock);
            this.coord.addPendingEvent({
                type: EventType.finishTask,
                time: this.calculateNextFinish(clock),
                server: this.id,
            });
            return 0;
        } else {
            //Si lo esta, pongo en cola
            this.queue.push(asObj);
            return this.queue.length;
        }
    }

    isBusy(): boolean {
        return this.currentAssembly != null;
    }

    getQueueIds(): number[] {
        return structuredClone(this.queue.map((q) => q.getId()));
    }

    getQueueObjects(): any {
        return this.queue;
    }
}
