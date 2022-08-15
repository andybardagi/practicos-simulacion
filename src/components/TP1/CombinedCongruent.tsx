import { Box, Button, Flex, Input, InputGroup, InputLeftAddon, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react';
import { number, object, ref } from 'yup';
import { IInterval } from '../../simulation/tp1/interfaces/IIntervals';
import { generateNumbers } from '../../simulation/tp1/generateNumbersTP1';
import { randomGenerationMethods } from '../../simulation/tp1/enums/method.enum';
import ErrorBox from '../ErrorBox';
import InfoBox from '../InfoBox';
import IntervalShower from '../IntervalShower';
import { CombinedCongruentValidationSchema } from './CombinedCongruent.schema';
import { CombinedCongruentGenerator } from '../../simulation/tp1/generators/CombinedCongruentGenerator';
import { UniformIntervalHandler } from '../../simulation/tp1/handlers/UniformIntervalHandler';
import GenerationDisplay from '../GenerationDisplay';
import { IGenerationIteration } from '../../simulation/tp1/interfaces/IGenerationIteration';
import { IntervalWithPercentage } from '../../simulation/tp1/interfaces/IIntervalWithPercentage';

export default function CombinedCongruent() {
    const [formValues, SetformValues] = useState({
        a: '19',
        c: '7',
        m: '53',
        x0: '37',
    });
    const [error, setError] = useState({
        error: false,
        message: [] as string[],
    });

    var simulationHandlers = {
        intervalHandler: new UniformIntervalHandler(10),
        generator: new CombinedCongruentGenerator(
            Number(formValues.a),
            Number(formValues.c),
            Number(formValues.m),
            Number(formValues.x0),
        ),
        created: false,
    };

    let [generations, setGeneration] = useState([] as IGenerationIteration[]);

    const [result, setResult] = useState({
        generated: false,
        intervals: [] as IInterval[],
        generatedNumbersCount: 0,
        numbers: [] as number[],
    });

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResult((prevValue) => ({ ...prevValue, generated: false }));
        SetformValues((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value,
        }));
    };

    const simulate = (rounds: number) => {
        try {
            //Create generator and interval handler if not exits
            console.log(simulationHandlers.generator);
            console.log(simulationHandlers.generator.getLastGenerated());
            if (!simulationHandlers.created) {
                simulationHandlers.generator = new CombinedCongruentGenerator(
                    Number(formValues.a),
                    Number(formValues.c),
                    Number(formValues.m),
                    Number(formValues.x0),
                );
                simulationHandlers.created = true;
            }
            let intervalsIteration: IntervalWithPercentage[] = [];
            //For loop to make the simulation
            for (let i = 0; i < rounds; i++) {
                //Generate random number
                let numberGenerated = simulationHandlers.generator.generateRandom();
                simulationHandlers.intervalHandler.addNumber(numberGenerated);
                //Add generated number to the handler of generated numbers
                setGeneration((prevValue) => [
                    ...prevValue,
                    {
                        number: numberGenerated,
                        intervals: [
                            ...simulationHandlers.intervalHandler.getIntervals().map((x) => x),
                        ],
                    },
                ]);
            }

            setResult({
                generated: true,
                intervals: simulationHandlers.intervalHandler.getIntervals().map((x) => x),
                generatedNumbersCount: simulationHandlers.intervalHandler.getCounter(),
                numbers: simulationHandlers.intervalHandler.getNumbers(),
            });
        } catch (error) {
            setResult((prevValue) => ({ ...prevValue, generated: true }));
            setError({
                error: true,
                message:
                    error instanceof Error
                        ? [error.message]
                        : ['Error en la simulación. Revisar consola.'],
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
                {!result.generated ? (
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
                        <Button colorScheme={'linkedin'} onClick={() => simulate(10_000)}>
                            Completar 10.000
                        </Button>
                    </>
                )}
            </Flex>

            <ErrorBox errorMsg={error.message} />

            {result.generated ? (
                <Box>
                    <Flex direction={'row'} mt={4} justifyContent="end">
                        <a id="arriba" href="#resultado">
                            Ir al resultado
                        </a>
                    </Flex>
                    <GenerationDisplay generationIteration={generations} />
                    <IntervalShower
                        intervals={result.intervals}
                        totalNumbers={result.generatedNumbersCount}
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
        </Box>
    );
}
