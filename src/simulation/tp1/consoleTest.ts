import { MixedCongruentGenerator } from './Generators/MixedCongruentGenerator';
import { LinearCongruentGenerator } from './Generators/LinearCongruentGenerator';

export const test = () => {
    const m = 2**61;
    console.log('M =', m);
    const generator = new MixedCongruentGenerator(10, 10, m, 7);

    // 2^4 = 16
    // 16 random number generations and console.log() them);
    console.log('Por generar 1000000000 de números');
    for (let i = 0; i < 100000000; i++) {
        //console.log(i);
        //console.log(generator.generateRandom());
        generator.generateRandom();
    }

    console.log("Generados")
};
