import { number } from 'yup';
import { stateVector } from '../tp4/types/stateVector.type';
import { states } from './enum/states';


export class Silo {
    private id: number;
    private state: states;
    private quantity : number = 0;
    private maxQuantity : number = 20;

    constructor(id: number) {
        this.id = id;
        this.state = states.libre;
    }


    public cargar(q: number): number{
        if (this.quantity + q > this.maxQuantity){
            let left: number = this.quantity + q - this.maxQuantity;
            this.quantity += 20;
            return left;
        }
        else{
            this.quantity += q;
            return 0
        }
    }
    
    public getState(): states {
        return this.state;
    }

}
