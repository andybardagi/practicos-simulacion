import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
    Tooltip,
} from '@chakra-ui/react';
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

export default function CombinedCongruent() {
    const [formValues, SetformValues] = useState({
        a: '19',
        c: '7',
        m: '53',
        x0: '37',
        quantity: '0',
        intervalQuantity: '100',
    });
    const [error, setError] = useState({
        error: false,
        message: [] as string[],
    });

    const [result, setResult] = useState({
        generated: false,
        intervals: [] as IInterval[],
        generatedNumbersCount: 0,
        uniformWaitedPerInterval: 0,
        c: 0,
        chiValue: 0,
        isAccepted: false,
    });

    var generator: CombinedCongruentGenerator;
    var intervalHandler: CombinedCongruentGenerator;

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResult((prevValue) => ({ ...prevValue, generated: false }));
        SetformValues((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value,
        }));
    };

    const simulate = async () => {
        setResult((prevValue) => ({ ...prevValue, generated: false }));
        try {
            const simulationResult = generateNumbers(
                randomGenerationMethods.combinedCongruent,
                {
                    a: parseInt(formValues.a, 10),
                    c: parseInt(formValues.c, 10),
                    m: parseInt(formValues.m, 10),
                    x0: parseInt(formValues.x0, 10),
                },
                parseInt(formValues.intervalQuantity, 10),
                parseInt(formValues.quantity, 10),
            );
            console.log(simulationResult);
            setResult({
                generated: true,
                intervals: simulationResult.intervals,
                generatedNumbersCount: simulationResult.totalCounter,
                uniformWaitedPerInterval: simulationResult.waitedPerInterval,
                c: simulationResult.c,
                chiValue: simulationResult.chiValue,
                isAccepted: simulationResult.isAccepted,
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

    const handleGenerateClick = async (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        setError({
            error: false,
            message: [],
        });
        CombinedCongruentValidationSchema.validate(formValues, {
            abortEarly: false,
        })
            .then(async () => {
                generator = new CombinedCongruentGenerator(
                    parseInt(formValues.a, 10),
                    parseInt(formValues.c, 10),
                    parseInt(formValues.m, 10),
                    parseInt(formValues.x0, 10),
                );
            })
            .catch((err) => {
                console.log(err);
                setError({
                    error: true,
                    message: err.inner.map(
                        (innerError: { path: string; message: string }) =>
                            innerError.message,
                    ),
                });
            });
    };

    const widthForms = ['45%', '45%', '45%', '21.25%'];

    return (
        <Box>
            <Flex
                direction={'row'}
                mt={4}
                flexWrap="wrap"
                maxW="100%"
                gap={'5%'}
            >
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
                    <InputLeftAddon children="Cantidad" />
                    <Input
                        onChange={handleValueChange}
                        name="quantity"
                        value={formValues.quantity}
                        placeholder="Ingrese la cantidad de valores a generar"
                    />
                </InputGroup>

                <InputGroup width={widthForms} mb={2}>
                    <InputLeftAddon children="Intervalos" />
                    <Input
                        onChange={handleValueChange}
                        name="intervalQuantity"
                        value={formValues.intervalQuantity}
                        placeholder="Ingrese la cantidad de valores a generar"
                    />
                </InputGroup>
            </Flex>
            <Flex direction={'row'} justifyContent="end" py={2}>
                <Button colorScheme={'linkedin'} onClick={handleGenerateClick}>
                    Generar
                </Button>
            </Flex>

            <ErrorBox errorMsg={error.message} />

            {result.generated ? (
                <Box>
                    <Flex direction={'row'} mt={4} justifyContent="end">
                        <a id="arriba" href="#resultado">
                            Ir al resultado
                        </a>
                    </Flex>
                    <IntervalShower
                        intervals={result.intervals}
                        waitedUniform={result.uniformWaitedPerInterval}
                        totalNumbers={result.generatedNumbersCount}
                    />
                    <Flex direction={'row'} mt={4} mb={4} justifyContent="end">
                        <a id="resultado" href="#arriba">
                            Ir al inicio
                        </a>
                    </Flex>
                    <InfoBox
                        infoMsg={[
                            `Con un p-valor de 0,99`,
                            `${result.intervals.length - 1} grados de libertad`,
                            `c = ${result.c.toFixed(4)}`,
                            `Valor Chi = ${result.chiValue.toFixed(4)}`,
                            `Se ${
                                result.isAccepted ? 'acepta' : 'rechaza'
                            } la hipótesis`,
                        ]}
                    />
                </Box>
            ) : (
                <InfoBox infoMsg={['Simulación pendiente']} />
            )}
        </Box>
    );
}
