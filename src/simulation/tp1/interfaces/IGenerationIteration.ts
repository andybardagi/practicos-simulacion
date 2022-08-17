import { IIntervalWithPercentage } from "./IIntervalWithPercentage";

export interface IGenerationIteration {
    intervals: number[];
    number: number;
    x_i: number;
    x_i_1?: number;
    line: number;
};