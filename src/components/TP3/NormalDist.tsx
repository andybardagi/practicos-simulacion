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
import { NormalDistGenerator } from '../../simulation/tp3/random-generators/NormalDistGenerator';

export default function NormalDist() {
    const normalDisGenerator = useRef({} as NormalDistGenerator);
    const [formValues, setFormValues] = useState({
        average: 14,
        standarDeviation: 0.7,
        quantitiy: 10_000,
    });

    const [generation, setGeneration] = useState([1,2,3] as number[]);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleGenerateClick = (e: React.SyntheticEvent) => {
        console.log('Generation started');
        normalDisGenerator.current = new NormalDistGenerator(Number(formValues.average), Number(formValues.standarDeviation));
        normalDisGenerator.current.generateDistribution(formValues.quantitiy);
        setGeneration(normalDisGenerator.current.getGeneration());
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
                        name="media"
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
                        name="sigma"
                        value={formValues.average}
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
                <Button onClick={handleGenerateClick} colorScheme="linkedin"> Generar </Button>
            </Flex>

            <List>
                {generation.map((g, i) => (
                    <ListItem key={i}> {g}</ListItem>
                ))}
            </List>
        </Box>
    )
}
