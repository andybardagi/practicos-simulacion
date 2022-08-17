import {
    Box,
    Button,
    Divider,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
    Tooltip
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { MultiplicativeCongruentGenerator } from '../../simulation/tp1/generators/MultiplicativeCongruentGenerator';
import { ChiTester } from '../../simulation/tp1/handlers/ChiTester';
import { UniformIntervalHandler } from '../../simulation/tp1/handlers/UniformIntervalHandler';
import { IGenerationIteration } from '../../simulation/tp1/interfaces/IGenerationIteration';
import ErrorBox from '../ErrorBox';
import FrequencyComparator from '../FrequencyComparator';
import GenerationDisplay from '../GenerationDisplay';
import InfoBox from '../InfoBox';
import { MultiplicativeCongruentValidationSchema } from './MultiplicativeCongruent.schema';

export default function MultiplicativeCongruent() {
    // Form handling functions
    const [formValues, SetformValues] = useState({ a: '19', m: '53', x0: '37' });
    const [error, setError] = useState({ error: false, message: [] as string[] });
    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetformValues((prevValue) => ({ ...prevValue, [e.target.name]: e.target.value }));
    };

    const generator = useRef({} as MultiplicativeCongruentGenerator);
    const intervalHandler = useRef({} as UniformIntervalHandler);
    const chiTester = useRef({} as ChiTester);
    const [generations, setGenerations] = useState([] as IGenerationIteration[]);
    const [graphUpdate, setGraphUpdate] = useState(0);
    const [chiTest, setChiTest] = useState(
        {} as { c: number; chiValue: number; isAccepted: boolean },
    );

    const simulate = (rounds: number, hideResult = false) => {
        try {
            //Check if CombinedCongruentGenerator and UniformIntervalHandler already exists. If not, create them.
            if (rounds < 0) {
                console.error('Se ingresó una cantidad negativa de simulaciones');
                return;
            }
            generator.current =
                generator.current instanceof MultiplicativeCongruentGenerator
                    ? generator.current
                    : new MultiplicativeCongruentGenerator(
                          Number(formValues.a),
                          Number(formValues.m),
                          Number(formValues.x0),
                      );
            intervalHandler.current =
                intervalHandler.current instanceof UniformIntervalHandler
                    ? intervalHandler.current
                    : new UniformIntervalHandler(10);
            chiTester.current =
                chiTester.current instanceof ChiTester
                    ? chiTester.current
                    : new ChiTester(intervalHandler.current.getIntervals());

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
                    intervals: intervalHandler.current.getPercentagesState(),
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
            chiTester.current.setIntervals(intervalHandler.current.getIntervals());
            setChiTest({
                c: chiTester.current.calculateC(),
                ...chiTester.current.makeTest(),
            });
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
        MultiplicativeCongruentValidationSchema.validate(formValues, {
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
                            onClick={() =>
                                simulate(10_000 - generations[generations.length - 1].line, true)
                            }
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
                        <a id="arriba2" href="#resultado2">
                            Ir al resultado
                        </a>
                    </Flex>
                    <GenerationDisplay
                        generationIteration={generations}
                        limits={intervalHandler.current.getLimitsStrings()}
                    />
                    <Divider my={4} />
                    <FrequencyComparator
                        limits={intervalHandler.current.getLimitsStrings()}
                        intervals={generations[generations.length - 1].intervals}
                        total={generations[generations.length - 1].line}
                        key={graphUpdate}
                    />
                    <Flex direction={'row'} mt={4} mb={4} justifyContent="end">
                        <a id="resultado2" href="#arriba2">
                            Ir al inicio
                        </a>
                    </Flex>
                    <InfoBox
                        infoMsg={[
                            `Con un p-valor de 0,99`,
                            `${
                                intervalHandler.current.getIntervals().length - 1
                            } grados de libertad`,
                            `c = ${chiTest.c.toFixed(4)}`,
                            `Valor Chi = ${chiTest.chiValue.toFixed(4)}`,
                            `Se ${chiTest.isAccepted ? 'acepta' : 'rechaza'} la hipótesis`,
                        ]}
                    />
                </Box>
            ) : (
                <InfoBox infoMsg={['Simulación pendiente']} />
            )}
            <ErrorBox errorMsg={error.message} />
        </Box>
    );
}
