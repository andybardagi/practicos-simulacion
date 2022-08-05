import React, { useEffect } from 'react';
import { Heading } from '@chakra-ui/react';
import { test } from '../simulation/tp1/consoleTest';

export default function TP1() {
    useEffect(() => {
        test();
    }, []);

    return (
        <div>
            <Heading>Trabajo Práctico 1</Heading>
        </div>
    );
}
