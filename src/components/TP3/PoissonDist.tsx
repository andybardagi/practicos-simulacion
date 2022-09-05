import React, { useRef, useState } from 'react';
import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
    List,
    ListItem,
    Tooltip,
} from '@chakra-ui/react';
import { PoissonDistGenerator } from '../../simulation/tp3/random-generators/PoissonDistGenerator';
import { IIntervalWithPercentage } from '../../simulation/tp1/interfaces/IIntervalWithPercentage';
import { ChiResultType } from '../../simulation/tp3/types/chiResult.type';
import DinamicFrequencyComparator from '../DinamicFrequencyComparator';
import InfoBox from '../InfoBox';
import IntervalShower from '../IntervalShower';
import StringDownloader from '../StringDownloader';

export default function PoissonDist() {
    const poissonDistGenerator = useRef({} as PoissonDistGenerator);
    const poissonDistGeneratedValues = useRef([] as number[]);
    const [formValues, setFormValues] = useState({
        lambda: 7,
        quantitiy: 10_000,
    });

    const [generation, setGeneration] = useState([] as IIntervalWithPercentage[]);
    const [limits, setLimits] = useState([] as string[]);
    const [chiResult, setChiResult] = useState({} as ChiResultType);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGeneration([]);
        setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleGenerateClick = (e: React.SyntheticEvent) => {
        console.log('Generation started');
        poissonDistGenerator.current = new PoissonDistGenerator(Number(formValues.lambda));
        poissonDistGenerator.current.generateDistribution(formValues.quantitiy);
        poissonDistGeneratedValues.current = poissonDistGenerator.current.getGeneration();
        setGeneration(poissonDistGenerator.current.getIntervals());
        setLimits(poissonDistGenerator.current.getClassMarks());
        setChiResult(poissonDistGenerator.current.getChiResult());
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
                        name="quantitiy"
                        value={formValues.quantitiy}
                        placeholder="Ingrese el tamaño de la muestra"
                    />
                </InputGroup>
            </Flex>
            <Flex direction={'row'} justifyContent="end">
                <Button onClick={handleGenerateClick} colorScheme="linkedin">
                    {' '}
                    Generar{' '}
                </Button>
            </Flex>

            {generation.length > 0 ? <IntervalShower intervals={generation} /> : <></>}
            {generation.length > 0 ? (
                <DinamicFrequencyComparator intervals={generation} limits={limits} />
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
                    <StringDownloader
                        strToDownload={generation.join('\n')}
                        fileName="distribucionNormal"
                    >
                        Descargar
                    </StringDownloader>
                </>
            ) : (
                <></>
            )}
        </Box>
    );
}
