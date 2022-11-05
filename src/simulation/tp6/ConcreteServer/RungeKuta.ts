import { Coordinator } from '../Coordinator';
import { Servers } from '../enum/Servers';
import { Server } from '../Server';

export class RungeKuta extends Server{
    private t: number;
    private x: number;
    private y: number;
    private h: number;
    private b: number;
    private c: number;
    private k1: number = 0;
    private k2: number = 0;
    private k3: number = 0;
    private k4: number = 0;
    private r1: number = 0;
    private r2: number = 0;
    private r3: number = 0;
    private r4: number = 0;
    private aVar: number;


    constructor(id: Servers, coord: Coordinator, t: number, x: number, y: number, h: number, b: number, c: number) {
        super(id, coord);
        this.t = t;
        this.x = x;
        this.y = y;
        this.h = h;
        this.b = b;
        this.c = c;
        this.aVar = this.generateAVar();
    }

    private generateAVar () : number {
        const li: number = 0.5;
        const ls: number = 2;
        const uRandom = Math.random();
        const res: number = (ls - li) * uRandom + li;
        return res;
    }

    private calculateY (h: number, k: number) : number {
        const res: number = this.y + k*h;
        return res;
    }

    private calculateK (t: number, x: number, y: number) : number {
        const res: number = Math.pow(Math.E, -this.c*t) - (this.aVar*y) - (this.b*x);
        return res;
    }

    public calculateLine () : number {
        const midH: number = this.h/2;
        const midt: number = this.t + midH;
        const next: number = this.t + this.h;

        this.k1 = this.y;
        this.r1 = this.calculateK(this.t, this.x, this.y);
        const frsX: number = this.calculateY(midH, this.k1);
        const frsY: number = this.calculateY(midH, this.r1);
        this.k2 = frsY;
        this.r2 = this.calculateK(midt, frsX, frsY);
        const scdX: number = this.calculateY(midH, this.k2);
        const scdY: number = this.calculateY(midH, this.r2);
        this.k3 = scdY;
        this.r3 = this.calculateK(midH, scdX, scdY);
        const thrX: number = this.calculateY(this.h, this.k3);
        const thrY: number = this.calculateY(this.h, this.r3);
        this.k4 = thrY;
        this.r4 = this.calculateK(next, thrX, thrY);

        const resX: number = this.x + (this.h/6 * (this.k1 + 2*this.k2 + 2*this.k3 + this.k4))
        const resY: number = this.y + (this.h/6 * (this.r1 + 2*this.r2 + 2*this.r3 + this.r4))

        this.t = next;
        this.x = resX;
        this.y = resY;

        return resX;
    }
    public calculateTaskDuration(): number {
        var mayor: number = 0;
        var n1:number = 0;
        var n2:number = 0;
        var n3:number = 0;

        while(mayor !== 2){
            n1 = n2;
            n2 = n3;
            n3 = this.calculateLine()
            if((n1<n2)&&(n3<n2)){
                mayor++;
            }
        }
        
        return n2;
    }

}
