import { Box, Button, Flex, Input, InputGroup, InputLeftAddon, Tooltip } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { CombinedCongruentGenerator } from '../../simulation/tp1/generators/CombinedCongruentGenerator';
import { IGenerationIteration } from '../../simulation/tp1/interfaces/IGenerationIteration';
import ErrorBox from '../ErrorBox';
import { CombinedCongruentValidationSchema } from './CombinedCongruent.schema';
import { IntervalHandler } from '../../simulation/tp1/handlers/IntervalHandler';
import { UniformIntervalHandler } from '../../simulation/tp1/handlers/UniformIntervalHandler';

export default function CombinedCongruent() {
    // Form handling functions
    const [formValues, SetformValues] = useState({ a: '19', c: '7', m: '53', x0: '37' });
    const [error, setError] = useState({ error: false, message: [] as string[] });
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetformValues((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }));
    };

    const generator = useRef({} as CombinedCongruentGenerator);
    const intervalHandler = useRef({} as UniformIntervalHandler);
    const [generations, setGenerations] = useState([] as IGenerationIteration[]);

    const simulate = (rounds: number) => {
        try {
            //Check if CombinedCongruentGenerator and UniformIntervalHandler already exists. If not, create them.
            generator.current =
                generator.current instanceof CombinedCongruentGenerator
                    ? generator.current
                    : new CombinedCongruentGenerator(
                          Number(formValues.a),
                          Number(formValues.c),
                          Number(formValues.m),
                          Number(formValues.x0),
                      );
            intervalHandler.current =
                intervalHandler.current instanceof UniformIntervalHandler
                    ? intervalHandler.current
                    : new UniformIntervalHandler(10);

            //Simulate the generator
            const thisGenerations: IGenerationIteration[] = [];
            for (let i = 0; i < rounds; i++) {
                let roundSeed: number = generator.current.getLastXi();
                let n: number = generator.current.generateRandom();
                intervalHandler.current.addNumber(n);
                thisGenerations.push({
                    number: n,
                    intervals: structuredClone(intervalHandler.current.getIntervals()),
                    x_i: roundSeed,
                });
            }
            setGenerations((prevValue) => [...prevValue, ...thisGenerations]);
        } catch (error: any) {
            console.log(error);
            setError({
                error: true,
                message: [
                    error.message ? error.message : 'Error en la simulación, revisar consola',
                ],
            });
        }
    };

    const handleGenerateClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setError({
            error: false,
            message: [],
        });
        CombinedCongruentValidationSchema.validate(formValues, {
            abortEarly: false,
        })
            .then(async () => {
                simulate(20);
            })
            .catch((err) => {
                console.log(err);
                setError({
                    error: true,
                    message: err.inner.map(
                        (innerError: { path: string; message: string }) => innerError.message,
                    ),
                });
            });
    };

    const widthForms = ['45%', '45%', '45%', '21.25%'];

    return (
        <Box>
            <Flex direction={'row'} mt={4} flexWrap="wrap" maxW="100%" gap={'5%'}>
                <InputGroup width={widthForms} mb={2}>
                    <InputLeftAddon children="A" />
                    <Input
                        type="number"
                        onChange={handleValueChange}
                        name="a"
                        value={formValues.a}
                        placeholder="Ingrese el valor de A"
                    />
                </InputGroup>

                <InputGroup width={widthForms} mb={2}>
                    <InputLeftAddon>
                        <Tooltip label="Módulo">M</Tooltip>
                    </InputLeftAddon>
                    <Input
                        onChange={handleValueChange}
                        name="m"
                        value={formValues.m}
                        placeholder="Ingrese el valor de M"
                    />
                </InputGroup>

                <InputGroup width={widthForms} mb={2}>
                    <InputLeftAddon children="C" />
                    <Input
                        onChange={handleValueChange}
                        name="c"
                        value={formValues.c}
                        placeholder="Ingrese el valor de C"
                    />
                </InputGroup>

                <InputGroup width={widthForms} mb={2}>
                    <InputLeftAddon children="Semilla" />
                    <Input
                        onChange={handleValueChange}
                        name="x0"
                        value={formValues.x0}
                        placeholder="Ingrese el valor semilla"
                    />
                </InputGroup>

                <InputGroup width={widthForms} mb={2}>
                    <InputLeftAddon children="Intervalos" />
                    <Input
                        name="intervalQuantity"
                        value={10}
                        readOnly={true}
                        bgColor="#efefef"
                        placeholder="Ingrese la cantidad de valores a generar"
                    />
                </InputGroup>
            </Flex>
            <Flex direction={'row'} justifyContent="end" py={2} gap={4}>
                <Button colorScheme={'linkedin'} onClick={handleGenerateClick}>
                    Generar primeros 20 valores
                </Button>
            </Flex>

            <ErrorBox errorMsg={error.message} />
        </Box>
    );
}
