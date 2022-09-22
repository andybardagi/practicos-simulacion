import { tp4StatsType } from './../types/stats.type';
import CombinedCongruentGenerator from '../../tp1/random-generators/CombinedCongruentGenerator';
import { ExponentialDistGenerator } from '../../tp3/random-generators/ExponentialDistGenerator';
import { number } from 'yup';
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

    constructor() {
        this.exponentialGeneratorTask3 = new ExponentialDistGenerator(1 / 30, 1);
        this.exponentialGeneratorTask5 = new ExponentialDistGenerator(1 / 5, 1);
    }

    private simulateUniformTaskDuration(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    private simulateTask3(): number {
        return this.exponentialGeneratorTask3.generateRandom();
    }

    private simulateTask5(): number {
        return this.exponentialGeneratorTask5.generateRandom();
    }

    private simulateAssembly() {
        const task1 = this.simulateUniformTaskDuration(20, 30);
        const task2 = this.simulateUniformTaskDuration(30, 50);
        const task3 = this.simulateTask3();
        const task4 = this.simulateUniformTaskDuration(10, 20);
        const task4Final = task1 + task4;
        const task5 = this.simulateTask5();
        const task5Final = (task2 > task4Final ? task2 : task4Final) + task5;

        const assemblyDuration = task5Final > task3 ? task5Final : task3;

        this.simulationCounter += 1;
        this.durationAcumulator += assemblyDuration;

        this.durationsSimulated.push(assemblyDuration);

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
    }

    public simulateManyTasks(n: number) {
        for (let index = 0; index < n; index++) {
            this.simulateAssembly();
        }
    }

    public getStats(): tp4StatsType {
        //Sort to get te trust90 value correctly

        this.durationsSimulated.sort((a, b) => a - b);
        console.log(this.durationsSimulated);
        return {
            averageDuration: this.historicAverage[this.historicAverage.length - 1],
            averageEvolution: this.historicAverage,
            maxDuration: this.maxDuration || 0,
            minDuration: this.minDuration || 0,
            pLess45: this.finishedBefore45Counter / this.simulationCounter,
            trust90: this.durationsSimulated[Math.ceil(this.durationsSimulated.length * 0.9)],
        };
    }
}
