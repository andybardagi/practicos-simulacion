import { number } from 'yup';
import { AssemblyObject } from './Truck';
import { Servers } from './enum/Servers';
import { EventType } from './enum/SimulationEvent';
import { RungeKuttaLine } from './types/rungeKuttaEvolution';

export abstract class Server {
    private id: Servers;
    private currentAssembly: AssemblyObject | null;
    private estimatedFinish: number = 0;
    private quantity : number = 0;
    

    constructor(id: Servers) {
        this.id = id;
        this.currentAssembly = null;
    }


    public getCurrent(){
        return this.currentAssembly;
    }

    public getRungeKuttaEvolution(): RungeKuttaLine[]{
        throw Error('getRungeKuttaEvolution: Not implemented');
    }

    public finishCurrentTask(clock: number): AssemblyObject {
        if (this.currentAssembly == null) {
            console.log(this.id);
            throw Error('Finalizando evento fantasma');
        }
        //Finalizo el ensamble.
        this.currentAssembly?.setServerTime(this.id, this.estimatedFinish);
        const old = this.currentAssembly;
        this.currentAssembly = null;
        return old;
    }

    /**
     *
     * @param asObj AssemblyObject a encolar o procesar
     * @param clock Tiempo de la simulación en la que se invoca la operación de encolado
     * @returns number cantidad de elementos en cola para ese momento.
     */
    

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
