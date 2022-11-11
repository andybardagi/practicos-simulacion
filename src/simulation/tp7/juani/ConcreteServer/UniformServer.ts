import { Coordinator } from '../Coordinator';
import { Servers } from '../enum/Servers';
import { Server } from '../Server';

export class UniformServer extends Server {
    private min: number;
    private max: number;

    constructor(id: Servers, coord: Coordinator, min: number, max: number) {
        super(id, coord);
        this.min = min;
        this.max = max;
    }

    public calculateTaskDuration(): number {
        //Generate exponential random. Media = 3  → Lambda = 1/3
        return Math.random() * (this.max - this.min) + this.min;
    }
}
