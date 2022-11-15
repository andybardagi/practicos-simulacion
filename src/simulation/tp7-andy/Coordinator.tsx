import { EulerFurnace } from './EulerFurnace';
export class Coordinator {
    private furnace: EulerFurnace;

    constructor(furnaceStep: number) {
        this.furnace = new EulerFurnace(furnaceStep);
    }

    private simulateEvent(){
        
    }
}
