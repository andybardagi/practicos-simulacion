import React, { useEffect } from 'react';
import {
    Heading,
    Box,
    Input,
    Text,
    InputGroup,
    InputLeftElement,
    InputLeftAddon,
    Flex,
    Tabs,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
} from '@chakra-ui/react';
import { test } from '../simulation/tp1/consoleTest';
import CombinedCongruent from './TP1/CombinedCongruent';

export default function TP1() {
    useEffect(() => {
        test();
    }, []);

    return (
        <Box m={4} w="100%">
            <Heading>Trabajo Práctico 1</Heading>

            <Tabs variant="enclosed" mt={4} w="100%">
                <TabList>
                    <Tab>Congruencial Lineal</Tab>
                    <Tab>Congruencial Mixto</Tab>
                    <Tab>Congruencial Aditivo</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        <CombinedCongruent />
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
