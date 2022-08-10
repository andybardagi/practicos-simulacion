import {
    Box,
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { number, object, ref } from 'yup';
import { IInterval } from '../../simulation/tp1/interfaces/IIntervals';
import { generateNumbers } from '../../simulation/tp1/generateNumbersTP1';
import { randomGenerationMethods } from '../../simulation/tp1/enums/method.enum';
import ErrorBox from '../ErrorBox';
import InfoBox from '../InfoBox';
import IntervalShower from '../IntervalShower';

export default function MultiplicativeCongruent() {
    return <>Hola</>;
}
