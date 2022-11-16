export class EulerFurnace {
    private hStep: number;
    private initialTemperature: number = 5;
    private initialTime: number = 5;
    private calculatedValues: Record<number, number> = {};

    constructor(hStep: number) {
        this.hStep = hStep;
    }

    public getFurnaceFinishTime(productQuantity: number) {

        if(this.calculatedValues[productQuantity] != null) {
            return this.calculatedValues[productQuantity];
        }

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
            timeInMaxTemp += tempDifference < 0.01 ? this.hStep : 0;
        }

        this.calculatedValues[productQuantity] = t_time;

        return t_time;
    }
}
