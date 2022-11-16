import { Truck } from './Truck';
import { UniformServer } from './ConcreteServer/UniformServer';
import { Silos } from './enum/Silos';
import { EventType, SimulationEvent } from './enum/SimulationEvent';
import { Silo } from './Silo';
import { stateVector } from './types/stateVector.type';
import { StatsObserver } from './StatsObserver';
import { states } from './enum/States';
import { RungeKuta } from './RungeKuta';
import { R } from 'lib-r-math.js';

export class Coordinator {
    private clock: number;
    private usageClock: number;
    private arrivals: UniformServer;
    private pendingEvents: SimulationEvent[];
    private queue: Truck[] = [];
    private currentTruck: Truck | undefined;
    private lastTruckId: number;
    private statsObserver: StatsObserver;
    private vectorState: stateVector[] = [];
    private silos: Silo[];
    private usingSilo: Silo;
    private deschargingSilo: Silo | undefined;
    private descargas: number = 0;
    private ocupado: boolean;

    constructor() {
        this.clock = 0;
        this.usageClock = 1;
        this.lastTruckId = 0;
        this.arrivals = new UniformServer(this, 5, 9);
        this.pendingEvents = [];
        this.statsObserver = new StatsObserver();
        this.silos = [ new Silo(1), new Silo(2), new Silo(3), new Silo(4) ];
        this.usingSilo = this.silos[0];
        this.usingSilo.setState(states.usando);
        this.usingSilo = this.silos[1];
        this.generateNextUsage();
        this.generateNextArrive();
        this.ocupado = false;
        this.currentTruck = new Truck(0,0);
    }


    public simulate(orders: number) {
        while (this.descargas < orders) {
            //Genero simulaciones hasta cumplir con el límite de simulaciones solicitadas.
            let rkEvo: any;
            if (this.pendingEvents[0].type == EventType.finishDischarge){
                rkEvo = new RungeKuta(0,0,0,0.5);
                rkEvo.calculateDuration(this.pendingEvents[0].cant)
            }
            else{
                rkEvo = [];
            }

            let actualEvent = this.processNextEvent();

            if (this.currentTruck == null) {throw new Error("no hay camion")};
            this.vectorState.push({
                states: this.silos,
                queue: this.queue,
                currentEvent: actualEvent,
                current: this.currentTruck,
                rungeKuttaEvolution: rkEvo,
                events: this.pendingEvents,
                clock: this.clock,
            });

            this.descargas++;
        }

        return this.statsObserver.getFinalStats(this.clock);
    }

    private processNextEvent(): SimulationEvent {
        const oldClock = this.clock;
        const nextEvent = this.getNextEvent();
        this.clock = nextEvent.time;

        if (nextEvent.type === EventType.truckArrive) {
            
            this.generateNextArrive();

            if(!this.ocupado){
                this.ocupado = true;
                this.currentTruck = nextEvent.truck;
                if (this.currentTruck == null) {throw new Error("no hay camion")};
                this.atenderTruck(this.currentTruck);
            }
            else{
                this.queue.push(nextEvent.truck);
            }

        } else if (nextEvent.type === EventType.finishDischarge) {
            
            let silo: Silo = nextEvent.silo;
            silo.setState(states.libre);
            silo.cargar(nextEvent.cant);
            this.currentTruck?.setFinishTime(this.clock);
            if ( this.queue.length == 0 ){
                this.ocupado = false;
            }
            else{
                this.currentTruck = this.queue.shift();
                if (this.currentTruck == null) {throw new Error("no hay camion")};
                this.atenderTruck(this.currentTruck);
            }
            
        }
        else{
            let silo: Silo = nextEvent.silo;
            silo.descargar();
            silo.setState(states.libre);

            this.generateNextUsage();
        }
        /*console.log(this.silos);
        const busy1 = this.silos[Silos.silo1].getState();
        const busy2 = this.silos[Silos.silo2].getState();
        const busy3 = this.silos[Silos.silo3].getState();
        const busy4 = this.silos[Silos.silo4].getState();
        this.statsObserver.notifyServerOcupation(Silos.silo1, oldClock, this.clock, busy1);
        this.statsObserver.notifyServerOcupation(Silos.silo2, oldClock, this.clock, busy2);
        this.statsObserver.notifyServerOcupation(Silos.silo3, oldClock, this.clock, busy3);
        this.statsObserver.notifyServerOcupation(Silos.silo4, oldClock, this.clock, busy4);*/

        return nextEvent;
    }

    private atenderTruck(truck: Truck) {
        this.deschargingSilo = this.findFreeSilo();
        this.deschargingSilo.setState(states.descarga);

        if (truck.getQueueDuration() == -1) truck.setQueueTime(this.clock);

        let cant: number 
        
            if (this.deschargingSilo.getEspacio() < truck.getQuantity()){
                cant = this.deschargingSilo.getEspacio();
                truck.setQuantity(truck.getQuantity() - cant);
                this.addPendingEvent({
                    type: EventType.truckArrive,
                    time: this.clock + truck.calculateDuration(cant) + 1/6,
                    truck: truck,
                });
            }
            else{
                cant = truck.getQuantity()
                truck.setQuantity(0);
            }

            this.addPendingEvent({
                type: EventType.finishDischarge,
                time: this.clock + truck.calculateDuration(cant),
                silo: this.deschargingSilo,
                cant: cant,
            });
        
        
    }

    public addPendingEvent(e: SimulationEvent) {
        // TODO Esta inserción debe realizarse ordenada por e.time; para que se pueda utilizar el shift en el getNextEvent();
        const i = this.getInsertionIndex(e.time);
        this.pendingEvents.splice(i, 0, e); //Inserta el evento e en el índice i.
    }

    private getInsertionIndex(timeToInsert: number): number {
        let start = 0,
            end = this.pendingEvents.length - 1;

        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            if (this.pendingEvents[mid].time === timeToInsert) return mid;
            else if (this.pendingEvents[mid].time < timeToInsert) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
        return start;
    }

    private getNextEvent(): SimulationEvent {
        if (this.pendingEvents.length > 0) {
            return this.pendingEvents.shift() as SimulationEvent;
        }
        throw Error('No hay eventos pendientes');
    }

    private generateNextArrive(): Truck {
        let duracion: number = this.arrivals.calculateTaskDuration();
        let truck: Truck = new Truck(this.lastTruckId, this.clock + duracion);

        if (this.todosLLenos()) truck.setQuantity(0);

        this.lastTruckId++;

        this.addPendingEvent({
            type: EventType.truckArrive,
            time: this.clock + duracion,
            truck: truck,
        });
        return truck;
    }

    private generateNextUsage() {
        let newSilo: Silo = this.findUsableSilo();

        if (newSilo != this.usingSilo){
            this.usingSilo = newSilo;   
        }
        this.usingSilo.setState(states.usando);

        this.addPendingEvent({
            type: EventType.useSilo,
            time: this.usageClock,
            silo: this.usingSilo,
        });

        this.usageClock += 1;
    }

    private findUsableSilo(): Silo{
        for (let i = 0; i < this.silos.length; i++) {
            let silo: Silo = this.silos[i] as Silo;
            if (silo.usable()) return silo;
        }
        return this.silos[0];
    }

    private findFreeSilo(): Silo{
        for (let i = 0; i < this.silos.length; i++) {
            let silo: Silo = this.silos[i] as Silo;
            if (silo.libre()) return silo;
        }
        return this.silos[0];
    }

    private todosLLenos(): boolean{
        this.silos.forEach(silo => {
            if (silo.getEspacio() == 0) return false;
        });
        return true;
    }

    public getStateVector(): stateVector[] {
        return this.vectorState;
    }
    
}
