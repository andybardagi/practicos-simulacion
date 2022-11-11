import { Coordinator } from '../Coordinator';
import { Servers } from '../enum/Servers';
import { Server } from '../Server';

export class ConstantServer extends Server {
    private n: number;

    constructor(id: Servers, coord: Coordinator, n: number) {
        super(id, coord);
        this.n = n;
    }

    public calculateTaskDuration(): number {
        return this.n;
    }
}
