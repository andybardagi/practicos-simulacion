import { Truck } from './Truck';
import { UniformServer } from './ConcreteServer/UniformServer';
import { Silos } from './enum/Silos';
import { EventType, SimulationEvent } from './enum/SimulationEvent';
import { Silo } from './Silo';
import { stateVector } from './types/stateVector.type';
import { StatsObserver } from './StatsObserver';
import { states } from './enum/states';

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
        this.usageClock = 0;
        this.lastTruckId = 0;
        this.arrivals = new UniformServer(this, 5, 9);
        this.pendingEvents = [];
        this.statsObserver = new StatsObserver();
        this.silos = new Array (new Silo(1), new Silo(2), new Silo(3), new Silo(4),);
        this.usingSilo = this.silos[0];
        this.usingSilo.setState(states.usando);
        this.usingSilo = this.silos[1];
        this.generateNextUsage();
        this.generateNextArrive();
        this.ocupado = false;
    }


    public simulate(orders: number) {
        while (this.descargas < orders) {
            //Genero simulaciones hasta cumplir con el límite de simulaciones solicitadas.
            this.processNextEvent();
        }

        return this.statsObserver.getFinalStats(this.clock);
    }

    private processNextEvent() {
        const oldClock = this.clock;
        const nextEvent = this.getNextEvent();
        this.clock = nextEvent.time;

        if (nextEvent.type === EventType.truckArrive) {
            
            let truck: Truck;
            truck = this.generateNextArrive();

            if(this.ocupado){
                this.queue.push(truck);
            }
            else{
                this.ocupado = true;
                this.atenderTruck(truck);
            }

        } else if (nextEvent.type === EventType.finishDischarge) {

            let silo: Silo = nextEvent.silo;
            silo.setState(states.libre);
            silo.cargar(nextEvent.cant);
            this.currentTruck.setFinishTime(this.clock);
            if ( this.queue.length == 0){
                this.ocupado = false;
            }
            else{
                this.currentTruck = this.queue.shift();
                this.atenderTruck(this.currentTruck);
            }
            
        }
        else{
            let silo: Silo = nextEvent.silo;
            silo.descargar();
            silo.setState(states.libre);

            this.generateNextUsage();
        }

        const busy1 = this.silos[Silos.silo1].getState();
        const busy2 = this.silos[Silos.silo2].getState();
        const busy3 = this.silos[Silos.silo3].getState();
        const busy4 = this.silos[Silos.silo4].getState();
        this.statsObserver.notifyServerOcupation(Silos.silo1, oldClock, this.clock, busy1);
        this.statsObserver.notifyServerOcupation(Silos.silo2, oldClock, this.clock, busy2);
        this.statsObserver.notifyServerOcupation(Silos.silo3, oldClock, this.clock, busy3);
        this.statsObserver.notifyServerOcupation(Silos.silo4, oldClock, this.clock, busy4);
    }

    private atenderTruck(truck: Truck) {
        this.deschargingSilo = this.findFreeSilo();
        this.deschargingSilo.setState(states.descarga);
        this.currentTruck = truck;

        if (truck.getQueueDuration() == -1) truck.setQueueTime(this.clock);
        
        let cant: number 
        if (this.deschargingSilo.getEspacio() < truck.getQuantity()){
            cant = this.deschargingSilo.getEspacio();
            
            this.addPendingEvent({
                type: EventType.truckArrive,
                time: this.clock + 1/6,
                truck: truck,
            });
        }
        else{
            cant = truck.getQuantity()
        }

        this.addPendingEvent({
            type: EventType.finishDischarge,
            time: truck.calculateDuration(cant),
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
        let truck: Truck = new Truck(this.lastTruckId, this.clock);
        
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

        this.usageClock += 60;
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

    public getStateVector(): stateVector[] {
        return this.vectorState;
    }
    
}
