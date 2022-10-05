import { ExponentialDistGenerator } from '../../tp3/random-generators/ExponentialDistGenerator';
import { activity, stateVector } from '../types/stateVector.type';
import { tp4StatsType } from './../types/stats.type';
import { IrregularIntervalHandler } from './IrregularIntervalHandler';
export class ActivityCoordinator {
    private durationAcumulator: number = 0;
    private durationsSimulated: number[] = [];
    private finishedBefore45Counter: number = 0;
    private historicAverage: number[] = [];
    private simulationCounter: number = 0;
    private maxDuration?: number;
    private minDuration?: number;
    private exponentialGeneratorTask3: ExponentialDistGenerator;
    private exponentialGeneratorTask5: ExponentialDistGenerator;
    private intervalStatHandler = new IrregularIntervalHandler();
    private stateVectors: stateVector[] = [];
    private minStateShow: number;
    private maxStateShow: number;

    constructor(minStateShow: number, maxStateShow: number) {
        //Set the exponential generator with lambda = 1/avg for each task.
        this.exponentialGeneratorTask3 = new ExponentialDistGenerator(1 / 30, 1);
        this.exponentialGeneratorTask5 = new ExponentialDistGenerator(1 / 5, 1);
        this.minStateShow = minStateShow;
        this.maxStateShow = maxStateShow;
    }

    private simulateUniformTaskDuration(min: number, max: number): activity {
        const uRandom = Math.random();
        return {
            uRnd: uRandom,
            random: uRandom * (max - min) + min,
        };
    }

    private simulateTask3(): activity {
        return this.exponentialGeneratorTask3.generateRandomActivity();
    }

    private simulateTask5(): activity {
        return this.exponentialGeneratorTask5.generateRandomActivity();
    }

    private simulateAssembly() {
        const task1 = this.simulateUniformTaskDuration(20, 30);
        const task2 = this.simulateUniformTaskDuration(30, 50);
        const task3 = this.simulateTask3();
        const task4 = this.simulateUniformTaskDuration(10, 20);
        const task4Final = task1.random + task4.random;
        const task5 = this.simulateTask5();
        const task5Final = (task2.random > task4Final ? task2.random : task4Final) + task5.random;

        const assemblyDuration = task5Final > task3.random ? task5Final : task3.random;

        this.simulationCounter += 1;
        this.durationAcumulator += assemblyDuration;

        this.durationsSimulated.push(assemblyDuration);

        if (this.simulationCounter < 15) {
            this.intervalStatHandler.addLimit(assemblyDuration);
        } else {
            this.intervalStatHandler.addNumber(assemblyDuration);
        }

        this.finishedBefore45Counter += assemblyDuration <= 45 ? 1 : 0;
        this.historicAverage.push(this.durationAcumulator / this.simulationCounter);
        if (this.simulationCounter > 0 && this.maxDuration && this.minDuration) {
            this.maxDuration =
                this.maxDuration > assemblyDuration ? this.maxDuration : assemblyDuration;
            this.minDuration =
                this.minDuration < assemblyDuration ? this.minDuration : assemblyDuration;
        } else {
            this.maxDuration = assemblyDuration;
            this.minDuration = assemblyDuration;
        }

        //Check if the simulation is in the range of saving the state vector and do it if true.
        if (
            this.simulationCounter >= this.minStateShow &&
            this.simulationCounter <= this.maxStateShow
        ) {
            this.stateVectors.push({
                activities: [task1, task2, task3, task4, task5],
                assemblyDuration: assemblyDuration,
                durationAcumulator: Number(this.durationAcumulator),
                simulationCounter: Number(this.simulationCounter),
                finishedBefore45Counter: Number(this.finishedBefore45Counter),
                maxDuration: Number(this.maxDuration),
                minDuration: Number(this.minDuration),
            });
        }
    }

    public simulateManyTasks(n: number) {
        for (let index = 0; index < n; index++) {
            this.simulateAssembly();
        }
    }

    public getStats(): tp4StatsType {
        //Sort to get te trust90 value correctly
        this.durationsSimulated.sort((a, b) => a - b);

        return {
            averageDuration: this.historicAverage[this.historicAverage.length - 1],
            averageEvolution: this.historicAverage,
            maxDuration: this.maxDuration || 0,
            minDuration: this.minDuration || 0,
            pLess45: this.finishedBefore45Counter / this.simulationCounter,
            trust90: this.durationsSimulated[Math.ceil(this.durationsSimulated.length * 0.9)],
            stateVectors: this.stateVectors 
        };
    }

    public getIntervalStats() {
        return this.intervalStatHandler.getStats();
    }
}
