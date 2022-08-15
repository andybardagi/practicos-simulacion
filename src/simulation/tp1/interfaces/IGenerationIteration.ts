import { IIntervalWithPercentage } from "./IIntervalWithPercentage";

export interface IGenerationIteration {
    intervals: IIntervalWithPercentage[];
    number: number;
    x_i: number;
};