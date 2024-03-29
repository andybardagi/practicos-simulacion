import { Box, Button, Flex, Input, InputGroup, InputLeftAddon, Tooltip } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { IIntervalWithPercentage } from '../../simulation/tp1/interfaces/IIntervalWithPercentage';
import { NormalDistGenerator } from '../../simulation/tp3/random-generators/NormalDistGenerator';
import { ChiResultType } from '../../simulation/tp3/types/chiResult.type';
import DinamicFrequencyComparator from '../DinamicFrequencyComparator';
import ErrorBox from '../ErrorBox';
import InfoBox from '../InfoBox';
import IntervalShower from '../IntervalShower';
import StringDownloader from '../StringDownloader';
import { NormalDistSchema } from './schemas/NormalDist.schema';

export default function NormalDist() {
    const normalDistGenerator = useRef({} as NormalDistGenerator);
    const normalDistGeneratedValues = useRef([] as number[]);
    const [formValues, setFormValues] = useState({
        average: 14,
        standardDeviation: 0.7,
        quantity: 10_000,
        intervals: 10,
    });
    const [errors, setErrors] = useState([] as string[]);

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
        NormalDistSchema.validate(formValues, { abortEarly: false })
            .then(() => {
                normalDistGenerator.current = new NormalDistGenerator(
                    Number(formValues.average),
                    Number(formValues.standardDeviation),
                    Number(formValues.intervals),
                );
                normalDistGenerator.current.generateDistribution(formValues.quantity);
                normalDistGeneratedValues.current = normalDistGenerator.current.getGeneration();
                setGeneration(normalDistGenerator.current.getIntervals());
                setLimits(normalDistGenerator.current.getClassMarks());
                setChiResult(normalDistGenerator.current.getChiResult());
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
                        <Tooltip label="Media">Media</Tooltip>
                    </InputLeftAddon>
                    <Input
                        type="number"
                        onChange={handleValueChange}
                        name="average"
                        value={formValues.average}
                        placeholder="Ingrese el valor de la Media"
                    />
                </InputGroup>
                <InputGroup width={widthForms} mb={2}>
                    <InputLeftAddon>
                        <Tooltip label="Sigma">σ</Tooltip>
                    </InputLeftAddon>
                    <Input
                        type="number"
                        onChange={handleValueChange}
                        name="standardDeviation"
                        value={formValues.standardDeviation}
                        placeholder="Ingrese el valor de sigma"
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
                <InputGroup width={widthForms} mb={2}>
                    <InputLeftAddon>
                        <Tooltip label="Cantidad de intervalos">Intervalos</Tooltip>
                    </InputLeftAddon>
                    <Input
                        type="number"
                        onChange={handleValueChange}
                        name="intervals"
                        value={formValues.intervals}
                        placeholder="Ingrese la cantidad de intervalos"
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
            {generation.length > 0 ? <IntervalShower intervals={generation} /> : <></>}
            {generation.length > 0 ? (
                <DinamicFrequencyComparator
                    key={chiResult.c}
                    intervals={generation}
                    limits={limits}
                />
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
                            strToDownload={normalDistGeneratedValues.current
                                .join('\n')
                                .replaceAll('.', ',')}
                            fileName="distribucionNormal"
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
