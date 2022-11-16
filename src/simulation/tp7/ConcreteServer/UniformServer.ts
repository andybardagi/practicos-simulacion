
export class UniformServer {
    private min: number;
    private max: number;

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }

    public calculateTaskDuration(): number {
        return Math.random() * (this.max - this.min) + this.min;
    }

}
