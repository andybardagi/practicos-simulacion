import { ChiTester } from './handlers/ChiTester';
import { CombinedCongruentGenerator } from './generators/CombinedCongruentGenerator';
import { IRandomGenerator } from './interfaces/GeneratorInterface';
import { randomGenerationMethods } from './enums/method.enum';
import { MultiplicativeCongruentGenerator } from './generators/MultiplicativeCongruentGenerator';
import { IntervalHandler } from './handlers/IntervalHandler';

export const generateNumbers = (
    method: randomGenerationMethods,
    data: {
        a: number;
        c?: number;
        m: number;
        x0: number;
    },
    intervalQuantity: number,
    quantity: number,
) => {
    // Create the random number generator based on the method
    let generator: IRandomGenerator;

    switch (method) {
        case randomGenerationMethods.combinedCongruent:
            generator = new CombinedCongruentGenerator(
                data.a,
                data.c ? data.c : 0,
                data.m,
                data.x0,
            );
            break;
        case randomGenerationMethods.multiplicativeCongruent:
            generator = new MultiplicativeCongruentGenerator(
                data.a,
                data.m,
                data.x0,
            );
            break;
        default:
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

    // Set the expected value for each interval
    intervalHandler.setUniformExpectedValues();

    const chiTester = new ChiTester(intervalHandler.getIntervals());
    const c = chiTester.calculateC();
    const { chiValue, isAccepted } = chiTester.makeTest();

    const result = {
        intervals: intervalHandler.getIntervals(),
        totalCounter: intervalHandler.getCounter(),
        waitedPerInterval: intervalHandler.getUniformWaitedValues(),
        chiValue,
        c,
        isAccepted,
    };

    return result;
};
