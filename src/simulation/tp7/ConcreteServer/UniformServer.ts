import { Coordinator } from '../Coordinator';
import { Server } from '../Server';

export class UniformServer extends Server {
    private min: number;
    private max: number;

    constructor(coord: Coordinator, min: number, max: number) {
        super(coord);
        this.min = min;
        this.max = max;
    }

    public calculateTaskDuration(): number {
        return Math.random() * (this.max - this.min) + this.min;
    }
}
