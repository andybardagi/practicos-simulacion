import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
} from '@chakra-ui/react';
import React, { useState } from 'react';

export default function CombinedCongruent() {
    const [formValues, SetformValues] = useState({
        a: '0',
        c: '0',
        m: '0',
        x0: '0',
    });

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetformValues({
            ...formValues,
            [e.target.name]:
                e.target.value != ''
                    ? parseInt(e.target.value, 10).toString()
                    : '0',
        });
    };

    return (
        <>
            <Flex direction={'row'} gap={4} mt={4}>
                <InputGroup>
                    <InputLeftAddon children="A" />
                    <Input
                        type="number"
                        onChange={handleValueChange}
                        name="a"
                        value={formValues.a}
                        placeholder="Ingrese el valor de A"
                    />
                </InputGroup>
                <InputGroup>
                    <InputLeftAddon children="M" />
                    <Input
                        onChange={handleValueChange}
                        name="m"
                        value={formValues.m}
                        placeholder="Ingrese el valor de M"
                    />
                </InputGroup>
                <InputGroup>
                    <InputLeftAddon children="C" />
                    <Input
                        onChange={handleValueChange}
                        name="c"
                        value={formValues.c}
                        placeholder="Ingrese el valor de C"
                    />
                </InputGroup>
                <InputGroup>
                    <InputLeftAddon children="Semilla" />
                    <Input
                        onChange={handleValueChange}
                        name="x0"
                        value={formValues.x0}
                        placeholder="Ingrese el valor semilla"
                    />
                </InputGroup>
            </Flex>
            <Flex direction={'row'} justifyContent="end" py={2}>
                <Button colorScheme={'linkedin'}>Generar</Button>
            </Flex>
        </>
    );
}
