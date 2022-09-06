import { Box, Button, Flex, Input, InputGroup, InputLeftAddon, Tooltip } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { IIntervalWithPercentage } from '../../simulation/tp1/interfaces/IIntervalWithPercentage';
import { PoissonDistGenerator } from '../../simulation/tp3/random-generators/PoissonDistGenerator';
import { ChiResultType } from '../../simulation/tp3/types/chiResult.type';
import DinamicFrequencyComparator from '../DinamicFrequencyComparator';
import ErrorBox from '../ErrorBox';
import InfoBox from '../InfoBox';
import StringDownloader from '../StringDownloader';
import IntervalShowerPoisson from './IntervalShowerPoisson';
import { PoissonDistSchema } from './schemas/PoissonDist.schema';

export default function PoissonDist() {
    const poissonDistGenerator = useRef({} as PoissonDistGenerator);
    const poissonDistGeneratedValues = useRef([] as number[]);
    const [formValues, setFormValues] = useState({
        lambda: 7,
        quantity: 10_000,
    });
    const [errors, setErrors] = useState<string[]>([]);

    const [generation, setGeneration] = useState([] as IIntervalWithPercentage[]);
    const [limits, setLimits] = useState([] as string[]);
    const [chiResult, setChiResult] = useState({} as ChiResultType);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrors([]);
        setGeneration([]);
        setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleGenerateClick = (e: React.SyntheticEvent) => {
        setErrors([]);
        PoissonDistSchema.validate(formValues, { abortEarly: false })
            .then(() => {
                console.log('Generation started');
                poissonDistGenerator.current = new PoissonDistGenerator(Number(formValues.lambda));
                poissonDistGenerator.current.generateDistribution(formValues.quantity);
                poissonDistGeneratedValues.current = poissonDistGenerator.current.getGeneration();
                setGeneration(poissonDistGenerator.current.getIntervals());
                setLimits(poissonDistGenerator.current.getClassMarks());
                setChiResult(poissonDistGenerator.current.getChiResult());
            })
            .catch((err) => {
                setErrors(err.inner.map((i: { path: string; message: string }) => i.message));
            });
    };

    const widthForms = ['45%', '45%', '45%', '21.25%'];
    return (
        <Box>
            <Flex direction={'row'} mt={4} flexWrap="wrap" maxW="100%" gap={'5%'}>
                <InputGroup width={widthForms} mb={2}>
                    <InputLeftAddon>
                        <Tooltip label="Lambda">λ</Tooltip>
                    </InputLeftAddon>
                    <Input
                        type="number"
                        onChange={handleValueChange}
                        name="lambda"
                        value={formValues.lambda}
                        placeholder="Ingrese el valor de lambda"
                    />
                </InputGroup>
                <InputGroup width={widthForms} mb={2}>
                    <InputLeftAddon>
                        <Tooltip label="Tamaño de la muestra">N</Tooltip>
                    </InputLeftAddon>
                    <Input
                        type="number"
                        onChange={handleValueChange}
                        name="quantity"
                        value={formValues.quantity}
                        placeholder="Ingrese el tamaño de la muestra"
                    />
                </InputGroup>
            </Flex>
            {errors.length === 0 ? (
                <Flex direction={'row'} justifyContent="end">
                    <Button onClick={handleGenerateClick} colorScheme="linkedin">
                        {' '}
                        Generar{' '}
                    </Button>
                </Flex>
            ) : (
                <ErrorBox errorMsg={errors} />
            )}

            {generation.length > 0 ? <IntervalShowerPoisson intervals={generation} /> : <></>}
            {generation.length > 0 ? (
                <DinamicFrequencyComparator key={chiResult.c} intervals={generation} limits={limits} />
            ) : (
                <></>
            )}
            {generation.length > 0 ? (
                <>
                    <InfoBox
                        infoMsg={[
                            `Con un p-valor de 0,99`,
                            `${generation.length - 1} grados de libertad`,
                            `c = ${chiResult.c.toFixed(4)}`,
                            `Valor Chi = ${chiResult.chiValue.toFixed(4)}`,
                            `Se ${chiResult.isAccepted ? 'acepta' : 'rechaza'} la hipótesis`,
                        ]}
                    />
                    <Flex my="10px" justifyContent={'right'}>
                        <StringDownloader
                            strToDownload={poissonDistGeneratedValues.current
                                .join('\n')
                                .replaceAll('.', ',')}
                            fileName="distribucionPoisson"
                        >
                            Descargar
                        </StringDownloader>
                    </Flex>
                </>
            ) : (
                <></>
            )}
        </Box>
    );
}
