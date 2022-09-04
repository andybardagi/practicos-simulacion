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
import { ExponentialDistGenerator } from '../../simulation/tp3/random-generators/ExponentialDistGenerator';

export default function ExponDist() {
    const exponDistGenerator = useRef({} as ExponentialDistGenerator);
    const [formValues, setFormValues] = useState({
        lambda: 7,
        quantitiy: 10_000,
    });

    const [generation, setGeneration] = useState([1, 2, 3] as number[]);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGeneration([]);
        setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleGenerateClick = (e: React.SyntheticEvent) => {
        console.log('Generation started');
        exponDistGenerator.current = new ExponentialDistGenerator(Number(formValues.lambda));
        exponDistGenerator.current.generateDistribution(formValues.quantitiy);
        setGeneration([4, 5, 6]);
    };

    const widthForms = ['45%', '45%', '45%', '21.25%'];
    return (
        <Box>
            <Flex direction={'row'} mt={4} flexWrap="wrap" maxW="100%" gap={'5%'}>
                <InputGroup width={widthForms} mb={2}>
                    <InputLeftAddon>
                        <Tooltip label="Label">λ</Tooltip>
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
                    Generar
                </Button>
            </Flex>

            <List>
                {generation.map((g, i) => (
                    <ListItem key={i}> {g}</ListItem>
                ))}
            </List>
        </Box>
    );
}
