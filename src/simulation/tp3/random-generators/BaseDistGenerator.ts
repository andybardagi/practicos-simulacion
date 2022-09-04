import { ChiTester } from './../../tp1/handlers/ChiTester';
import { IIntervalWithPercentage } from '../../tp1/interfaces/IIntervalWithPercentage';
import CombinedCongruentGenerator from '../../tp1/random-generators/CombinedCongruentGenerator';
import { DinamicIntervalHandler } from '../handlers/DinamicIntervalHandler';
import { ChiResultType } from '../types/chiResult.type';

export abstract class BaseDistGenerator {
    private uniformGenerator: CombinedCongruentGenerator;
    protected intervalHandler: DinamicIntervalHandler;
    private chiTester?: ChiTester;
    private chiResult?: ChiResultType;

    constructor() {
        const now = new Date();
        const initialSeed = now.getTime();
        this.uniformGenerator = new CombinedCongruentGenerator(11, 7, 2 ** 61, 23);
        this.intervalHandler = new DinamicIntervalHandler(15);        
    }

    protected getUniformRandom(): number {
        return Math.random();
        return this.uniformGenerator.generateRandom();
    }


    abstract generateRandom(): number;
    abstract setIntervalsExpected(): void;

    public generateDistribution(quantity: number) {
        for (let i = 0; i < quantity; i++) {
            this.intervalHandler.addNumber(this.generateRandom());
        }
        this.intervalHandler.processIntervals();
        this.setIntervalsExpected();
        this.intervalHandler.groupIntervals();
        this.makeChiTest();
    }

    private makeChiTest(): void{
        this.chiTester = new ChiTester(this.getIntervals());
        this.chiResult = {c: this.chiTester.calculateC(), ... this.chiTester.makeTest()}
    }

    public getChiResult(){
        return this.chiResult as ChiResultType;
    }

    public getGeneration(): number[] {
        return this.intervalHandler.getNumbers();
    }

    public getIntervals(): IIntervalWithPercentage[] {
        return this.intervalHandler.getIntervals();
    }

    public getClassMarks(): string[] {
        const classMarks: string[] = this.intervalHandler
            .getIntervals()
            .map((i) => ((i.upperLimit + i.lowerLimit) / 2).toFixed(4).toString());
        return classMarks;
    }
}
