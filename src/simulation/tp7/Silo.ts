import { states } from "./enum/States";


export class Silo {
    private id: number;
    private state: states;
    private quantity : number = 5;
    private maxQuantity : number = 20;

    constructor(id: number) {
        this.id = id;
        this.state = states.libre;
    }


    public cargar(q: number): number{
        if (this.quantity + q > this.maxQuantity){
            let left: number = this.quantity + q - this.maxQuantity;
            this.quantity = this.maxQuantity;
            return left;
        }
        else{
            this.quantity += q;
            return 0
        }
    }
    
    public descargar(){
        this.quantity = this.quantity - 0.5;
    }

    public setState(estado: states){
        this.state = estado;
    }

    public libre(): boolean{
        return this.state != states.usando && this.quantity < this.maxQuantity;
    }
    
    public usable(): boolean{
        return this.state != states.descarga && this.quantity >= 0.5;
    }

    public getState(): states {
        return this.state;
    }

    public getEspacio(): number{
        return this.maxQuantity - this.quantity;
    }

    public getQuantity(): number{
        return this.quantity;
    }

    public getId(): number {
        return this.id;
    }

    public estaLLeno(): boolean{
        if (this.maxQuantity == this.quantity) return true;
        else return false;
    }

}
