import { Coordinator } from '../Coordinator';
import { Servers } from '../enum/Servers';
import { Server } from '../Server';

export class ExponentialServer extends Server {
    private mean: number;

    constructor(id: Servers, coord: Coordinator, mean: number) {
        super(id, coord);
        this.mean = mean;
    }

    public calculateTaskDuration(): number {
        //Generate exponential random. Media = 3  → Lambda = 1/3
        return -this.mean * Math.log(Math.random());
    }
}
