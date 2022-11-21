export class Oven {
    private hourStep: number;
    private initialTemperature: number = 5;
    private initialTime: number = 5;
    private calculatedValues: Record<number, number> = {};

    constructor(hourStep: number) {
        this.hourStep = hourStep;
    }

    public getOvenFinishTime(quantity: number) {
        if (this.calculatedValues[quantity] != null) {
            return this.calculatedValues[quantity];
        }

        let T_temperature = this.initialTemperature;
        let t_time = this.initialTime;
        let tempDiff: number = Infinity;
        let timeMax: number = 0;

        while (timeMax < 900) {
            tempDiff = this.hourStep * (-0.5 * T_temperature + 900 / quantity);
            T_temperature += tempDiff;
            t_time += this.hourStep;

            timeMax += tempDiff < 0.01 ? this.hourStep : 0;
        }

        this.calculatedValues[quantity] = t_time;

        return t_time;

    }

}