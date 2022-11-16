import { isThisTypeNode } from 'typescript';

import { RungeKuttaLine } from './types/rungeKuttaEvolution';

export class RungeKuta  {
    private t: number;
    private x: number;
    private y: number;
    private h: number;
    private k1: number = 0;
    private k2: number = 0;
    private k3: number = 0;
    private k4: number = 0;
    private r1: number = 0;
    private r2: number = 0;
    private r3: number = 0;
    private r4: number = 0;
    private readonly initialValues;
    private evolution: RungeKuttaLine[];

    constructor(
        t: number,
        x: number,
        y: number,
        h: number
    ) {
        this.t = t;
        this.x = x;
        this.y = y;
        this.h = h;
        this.initialValues = {
            t,
            x,
            y,
            h
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

    private calculateX(h: number, k: number): number {
        const res: number = this.x + k * h;
        return res;
    }

    private calculateK(t: number, x: number, y: number): number {
        const res: number = 4 *  Math.pow(y, 2) + 6 * x + 8 * t;
        return res;
    }

    public calculateLine(): number {
        const midH: number = this.h / 2;
        const midt: number = this.t + midH;
        const next: number = this.t + this.h;

        this.k1 = this.y;
        this.r1 = this.calculateK(this.t, this.x, this.y);

        const frsX: number = this.calculateX(midH, this.k1);
        const frsY: number = this.calculateY(midH, this.r1);
        this.k2 = frsY;
        this.r2 = this.calculateK(midt, frsX, frsY);

        const scdX: number = this.calculateX(midH, this.k2);
        const scdY: number = this.calculateY(midH, this.r2);
        this.k3 = scdY;
        this.r3 = this.calculateK(midH, scdX, scdY);

        const thrX: number = this.calculateX(this.h, this.k3);
        const thrY: number = this.calculateY(this.h, this.r3);
        this.k4 = thrY;
        this.r4 = this.calculateK(next, thrX, thrY);

        const resX: number =
            this.x + (this.h / 6) * (this.k1 + 2 * this.k2 + 2 * this.k3 + this.k4);
        const resY: number =
            this.y + (this.h / 6) * (this.r1 + 2 * this.r2 + 2 * this.r3 + this.r4);

        this.evolution.push({
            t: this.t,
            x: this.x,
            y: this.y,
            k1: this.r1,
            k2: this.r2,
            k3: this.r3,
            k4: this.r4,
            xi_1: resX,
            yi_1: resY,
        });

        this.t = next;
        this.x = resX;
        this.y = resY;

        return resX;
    }

    private resetValues() {
        this.t = this.initialValues.t;
        this.x = this.initialValues.x;
        this.y = this.initialValues.y;
        this.h = this.initialValues.h;
        this.evolution = [];
    }

    public calculateDuration(cant: number): number {
        this.resetValues();
        let mayor: number = 0;
        
        while (mayor < cant){
            this.calculateLine();
            mayor = this.y;
        }
        
        return this.t;
    }
}
