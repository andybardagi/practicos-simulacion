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
import ErrorBox from '../ErrorBox';

export default function CombinedCongruent() {
    const [formValues, SetformValues] = useState({
        a: '0',
        c: '0',
        m: '0',
        x0: '0',
    });
    const [error, setError] = useState({
        error: false,
        message: [],
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

    const handleGenerateClick = async (
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        setError({
            error: false,
            message: [],
        })
        validationSchema
            .validate(formValues, { abortEarly: false })
            .then(() => {
                console.log('formValues', formValues);
            })
            .catch((err) => {
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
                <Button colorScheme={'linkedin'} onClick={handleGenerateClick}>
                    Generar
                </Button>
            </Flex>

            < ErrorBox errorMsg={error.message}/>
        </>
    );
}
