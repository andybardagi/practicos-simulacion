import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { number, object } from 'yup';
import { IInterval } from '../../simulation/tp1/IIntervals';
import { generateNumbers } from '../../simulation/tp1/generateNumbersTP1';
import { randomGenerationMethods } from '../../simulation/tp1/method.enum';
import ErrorBox from '../ErrorBox';
import InfoBox from '../InfoBox';
import IntervalShower from '../IntervalShower';

export default function CombinedCongruent() {
    const [formValues, SetformValues] = useState({
        a: '0',
        c: '0',
        m: '0',
        x0: '0',
        quantity: '0',
        intervalQuantity: '0',
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
    });

    const validationSchema = object().shape({
        a: number()
            .min(1, 'El valor de A no puede ser menor a 1')
            .required('Debe ingresar un valor para a'),
        c: number()
            .min(1, 'El valor de C no puede ser menor a 1')
            .required('Debe ingresar un valor para c'),
        m: number()
            .min(1, 'El valor de M no puede ser menor a 1')
            .required('Debe ingresar un valor para m'),
        x0: number()
            .min(0, 'El valor de la semilla no puede ser negativo')
            .required('Debe ingresar un valor para la semilla (x0)'),
        quantity: number()
            .min(1, 'La cantidad de valores a generar debe ser mayor a 0')
            .required('Debe ingresar un valor para la cantidad'),
    });

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResult((prevValue) => ({ ...prevValue, generated: false }));
        SetformValues({
            ...formValues,
            [e.target.name]:
                e.target.value != ''
                    ? parseInt(e.target.value, 10).toString()
                    : '0',
        });
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
        validationSchema
            .validate(formValues, { abortEarly: false })
            .then(async () => {
                console.log('formValues', formValues);
                await simulate();
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

    return (
        <Box>
            <Flex direction={'row'} gap={4} mt={4} flexWrap="wrap" maxW="100%">
                <InputGroup minWidth={'200px'} maxWidth="23%">
                    <InputLeftAddon children="A" />
                    <Input
                        type="number"
                        onChange={handleValueChange}
                        name="a"
                        value={formValues.a}
                        placeholder="Ingrese el valor de A"
                    />
                </InputGroup>

                <InputGroup minWidth={'200px'} maxWidth="23%">
                    <InputLeftAddon children="M" />
                    <Input
                        onChange={handleValueChange}
                        name="m"
                        value={formValues.m}
                        placeholder="Ingrese el valor de M"
                    />
                </InputGroup>

                <InputGroup minWidth={'200px'} maxWidth="23%">
                    <InputLeftAddon children="C" />
                    <Input
                        onChange={handleValueChange}
                        name="c"
                        value={formValues.c}
                        placeholder="Ingrese el valor de C"
                    />
                </InputGroup>

                <InputGroup minWidth={'200px'} maxWidth="23%">
                    <InputLeftAddon children="Semilla" />
                    <Input
                        onChange={handleValueChange}
                        name="x0"
                        value={formValues.x0}
                        placeholder="Ingrese el valor semilla"
                    />
                </InputGroup>

                <InputGroup minWidth={'200px'} maxWidth="23%">
                    <InputLeftAddon children="Cantidad" />
                    <Input
                        onChange={handleValueChange}
                        name="quantity"
                        value={formValues.quantity}
                        placeholder="Ingrese la cantidad de valores a generar"
                    />
                </InputGroup>

                <InputGroup minWidth={'200px'} maxWidth="23%">
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
                    <IntervalShower
                        intervals={result.intervals}
                        waitedUniform={result.uniformWaitedPerInterval}
                        totalNumbers={result.generatedNumbersCount}
                    />
                </Box>
            ) : (
                <InfoBox infoMsg={['Simulación pendiente']} />
            )}
        </Box>
    );
}
