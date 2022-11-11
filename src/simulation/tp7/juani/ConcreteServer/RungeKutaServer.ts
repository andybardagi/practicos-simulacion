import { isThisTypeNode } from 'typescript';
import { Coordinator } from '../Coordinator';
import { Servers } from '../enum/Servers';
import { Server } from '../Server';
import { RungeKuttaLine } from '../types/rungeKuttaEvolution';

export class RungeKutaServer extends Server {
    private x: number;
    private y: number;
    private h: number;
    private k1: number = 0;
    private k2: number = 0;
    private k3: number = 0;
    private k4: number = 0;
    private readonly initialValues;
    private evolution: RungeKuttaLine[];

    constructor(
        id: Servers,
        coord: Coordinator,
        x: number,
        y: number,
        h: number,
    ) {
        super(id, coord);
        this.x = x;
        this.y = y;
        this.h = h;
        this.initialValues = {
            x,
            y,
            h,
        };
        this.evolution = [];
    }

    public getRungeKuttaEvolution(): RungeKuttaLine[] {
        return this.evolution;
    }

    private calculateY(h: number, k: number): number {
        const res: number = this.y + k * h;
        return res;
    }

    private calculateK(x: number, y: number): number {
        const res: number = (-5 * Math.pow(x, 2)) + (2 * y) - 200;
        return res;
    }

    public calculateLine(): number {
        const midH: number = this.h / 2;
        const midX: number = this.x + midH;
        const nexX: number = this.x + this.h;

        this.k1 = this.calculateK(this.x, this.y);

        const frsY: number = this.calculateY(midH, this.k1);
        this.k2 = this.calculateK(midX, frsY);

        const scdY: number = this.calculateY(midH, this.k2);
        this.k3 = this.calculateK(midH, scdY);

        const thrY: number = this.calculateY(this.h, this.k3);
        this.k4 = this.calculateK(nexX, thrY);

        const resY: number =
            this.x + (this.h / 6) * (this.k1 + 2 * this.k2 + 2 * this.k3 + this.k4);

        this.evolution.push({
            x: this.x,
            y: this.y,
            k1: this.k1,
            k2: this.k2,
            k3: this.k3,
            k4: this.k4,
            yi_1: resY,
        });

        this.x = nexX;
        this.y = resY;

        return resY;
    }

    private resetValues() {
        this.x = this.initialValues.x;
        this.y = this.initialValues.y;
        this.h = this.initialValues.h;
        this.evolution = [];
    }

    public calculateTaskDuration(): number {
        this.resetValues();
        let valor: number = 100;

        while (valor > 0) {
            valor = this.calculateLine();
        }
        return this.x - this.h;
    }
}
