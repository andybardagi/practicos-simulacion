import { CombinedCongruentGenerator } from './Generators/CombinedCongruentGenerator';
import { IRandomGenerator } from './Generators/GeneratorInterface';
import { randomGenerationMethods } from './method.enum';
import { MultiplicativeCongruentGenerator } from './Generators/MultiplicativeCongruentGenerator';
import { IntervalHandler } from './IntervalHandler';


export const generateNumbersTP1 = (
    method: randomGenerationMethods,
    data: {
        a: number;
        c: number;
        m: number;
        x0: number;
    },
    intervalQuantity: number,
    quantity: number,
) => {
    // Create the random number generator based on the method
    let generator: IRandomGenerator | null =
        method === randomGenerationMethods.linearCongruent
            ? new CombinedCongruentGenerator(data.a, data.c, data.m, data.x0)
            : method == randomGenerationMethods.multiplicativeCongruent
            ? new MultiplicativeCongruentGenerator(data.a, data.m, data.x0)
            : null;

    if (generator == null) {
        throw Error('Invalid method');
    }

    // Create the interval handler
    const intervalHandler = new IntervalHandler(intervalQuantity);

    // Generate the numbers and add them to the interval handler
    let i: number;
    for (i = 0; i < quantity; i++) {
        intervalHandler.addNumber(generator.generateRandom());
    }

    // Process the intervals on the intervalHandler.
    intervalHandler.processIntervals();

    const result = {
        intervals: intervalHandler.getIntervals(),
        totalCounter: intervalHandler.getCounter(),
    };

    return result;
};
