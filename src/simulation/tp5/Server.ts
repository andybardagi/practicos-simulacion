import { AssemblyObject } from './AssemblyObject';
import { Coordinator } from './Coordinator';
import { Servers } from './enum/Servers';
import { EventType } from './enum/SimulationEvent';
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

    public finishCurrentTask(clock: number): AssemblyObject {
        if (this.currentAssembly == null) {
            console.log(this.id);
            throw Error('Finalizando evento fantasma');
        }
        //Finalizo el ensamble.
        this.currentAssembly?.setServerTime(this.id, this.estimatedFinish);
        const old = this.currentAssembly;
        this.currentAssembly = null;
        if (this.queue.length > 0) {
            this.currentAssembly = this.queue.shift() as AssemblyObject;
            this.currentAssembly.setTailTime(this.id, clock);
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
     */
    public queueAssembly(asObj: AssemblyObject, clock: number) {
        asObj.setArriveToTailTime(this.id, clock);
        //Chequeo si el servidor está ocupado
        if (this.currentAssembly == null) {
            //No lo esta, seteo el actual
            this.currentAssembly = asObj;
            this.currentAssembly.setTailTime(this.id, clock);
            this.calculateNextFinish(clock);
            this.coord.addPendingEvent({
                type: EventType.finishTask,
                time: this.calculateNextFinish(clock),
                server: this.id,
            });
        } else {
            //Si lo esta, pongo en cola
            this.queue.push(asObj);
        }
    }
}
