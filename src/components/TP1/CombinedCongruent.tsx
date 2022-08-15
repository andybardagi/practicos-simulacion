import {
    Box,
    Button,
    Divider,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
    Tooltip,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { CombinedCongruentGenerator } from '../../simulation/tp1/generators/CombinedCongruentGenerator';
import { UniformIntervalHandler } from '../../simulation/tp1/handlers/UniformIntervalHandler';
import { IGenerationIteration } from '../../simulation/tp1/interfaces/IGenerationIteration';
import ErrorBox from '../ErrorBox';
import GenerationDisplay from '../GenerationDisplay';
import InfoBox from '../InfoBox';
import { CombinedCongruentValidationSchema } from './CombinedCongruent.schema';

import { Line } from 'react-chartjs-2';
import FrequencyComparator from '../FrequencyComparator';

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
    const [graphUpdate, setGraphUpdate] = useState(0);

    const simulate = (rounds: number, hideResult = false) => {
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
            let line: number =
                generations.length === 0 ? 1 : generations[generations.length - 1].line + 1;
            for (let i = 0; i < rounds; i++) {
                let roundSeed: number = generator.current.getLastXi();
                let n: number = generator.current.generateRandom();
                intervalHandler.current.addNumber(n);
                thisGenerations.push({
                    number: n,
                    intervals: structuredClone(intervalHandler.current.getIntervals()),
                    x_i: roundSeed,
                    line: line,
                });
                line++;
            }
            if (!hideResult) {
                setGenerations((prevValue) => [...prevValue, ...thisGenerations]);
            } else {
                setGenerations((prevValue) => [
                    ...prevValue,
                    ...thisGenerations.slice(Math.max(thisGenerations.length - 5, 0)),
                ]);
            }
            setGraphUpdate(graphUpdate + 1);
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
            {/* Input values form*/}

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
            {/* Simulation generation buttons */}

            <Flex direction={'row'} justifyContent="end" py={2} gap={4}>
                {generations.length === 0 ? (
                    <Button colorScheme={'linkedin'} onClick={handleGenerateClick}>
                        Generar primeros 20 valores
                    </Button>
                ) : (
                    <>
                        <Button colorScheme={'linkedin'} onClick={() => simulate(20)}>
                            Generar 20 valores
                        </Button>
                        <Button colorScheme={'linkedin'} onClick={() => simulate(1)}>
                            Generar uno
                        </Button>
                        <Button
                            colorScheme={'linkedin'}
                            onClick={() => simulate(10_000 - generations.length, true)}
                        >
                            Completar 10.000
                        </Button>
                    </>
                )}
            </Flex>

            <ErrorBox errorMsg={error.message} />

            {generations.length !== 0 ? (
                <Box>
                    <Flex direction={'row'} mt={4} justifyContent="end">
                        <a id="arriba" href="#resultado">
                            Ir al resultado
                        </a>
                    </Flex>
                    <GenerationDisplay generationIteration={generations} />
                    <Divider my={4} />
                    <FrequencyComparator
                        intervals={generations[generations.length - 1].intervals}
                        total={generations[generations.length - 1].line}
                        key={graphUpdate}
                    />
                    <Flex direction={'row'} mt={4} mb={4} justifyContent="end">
                        <a id="resultado" href="#arriba">
                            Ir al inicio
                        </a>
                    </Flex>
                    {/* <InfoBox
                        infoMsg={[
                            `Con un p-valor de 0,99`,
                            `${result.intervals.length - 1} grados de libertad`,
                            `c = ${result.c.toFixed(4)}`,
                            `Valor Chi = ${result.chiValue.toFixed(4)}`,
                            `Se ${
                                result.isAccepted ? 'acepta' : 'rechaza'
                            } la hipótesis`,
                        ]}
                    /> */}
                </Box>
            ) : (
                <InfoBox infoMsg={['Simulación pendiente']} />
            )}
            <ErrorBox errorMsg={error.message} />
        </Box>
    );
}
