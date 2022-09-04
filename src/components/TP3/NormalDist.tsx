import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon, Tooltip
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { IIntervalWithPercentage } from '../../simulation/tp1/interfaces/IIntervalWithPercentage';
import { NormalDistGenerator } from '../../simulation/tp3/random-generators/NormalDistGenerator';
import DinamicFrequencyComparator from '../DinamicFrequencyComparator';
import IntervalShower from '../IntervalShower';

export default function NormalDist() {
    const normalDistGenerator = useRef({} as NormalDistGenerator);
    const normalDistGeneratedValues = useRef([] as number[]);
    const [formValues, setFormValues] = useState({
        average: 14,
        standardDeviation: 0.7,
        quantitiy: 10_000,
    });

    const [generation, setGeneration] = useState([] as IIntervalWithPercentage[]);
    const [limits, setLimits] = useState([] as string[]);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGeneration([]);
        setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleGenerateClick = (e: React.SyntheticEvent) => {
        console.log('Generation started');
        normalDistGenerator.current = new NormalDistGenerator(
            Number(formValues.average),
            Number(formValues.standardDeviation),
        );
        normalDistGenerator.current.generateDistribution(formValues.quantitiy);
        normalDistGeneratedValues.current = normalDistGenerator.current.getGeneration();
        setGeneration(normalDistGenerator.current.getIntervals());
        setLimits(normalDistGenerator.current.getClassMarks());
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
        </Box>
    );
}
