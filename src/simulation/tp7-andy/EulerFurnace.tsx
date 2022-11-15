export class EulerFurnace {
    private hStep: number;
    private initialTemperature: number = 5;
    private initialTime: number = 5;

    constructor(hStep: number) {
        this.hStep = hStep;
    }

    private getFurnaceFinishTime(productQuantity: number) {
        let T_temperature = this.initialTemperature;
        let t_time = this.initialTime;
        let tempDifference: number = Infinity;
        let timeInMaxTemp: number = 0;
        // 900 seconds = 15 minutes
        while (timeInMaxTemp < 900) {
            tempDifference = this.hStep * (-0.5 * T_temperature + 900 / productQuantity);
            T_temperature += tempDifference;
            t_time += this.hStep;

            // If the difference with previos value is less than 10^-3 → Max temperature, add time.
            timeInMaxTemp += tempDifference < 0.001 ? this.hStep : 0;
        }
        return t_time;
    }
}
