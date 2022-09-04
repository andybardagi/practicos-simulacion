import { CombinedCongruentGenerator } from './Generators/CombinedCongruentGenerator';

export const test = () => {
    const m = 2**61;
    console.log('M =', m);
    const generator = new CombinedCongruentGenerator(11, 10, m, 7);
    console.clear();
    for (let i = 0; i < 80; i++) {
        //console.log(i);
        console.log(i,"-", generator.generateRandom());
        //generator.generateRandom();
    }

    console.log('Generados');
};
