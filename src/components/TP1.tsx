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
import AditiveCongruent from './TP1/MultiplicativeCongruent';

export default function TP1() {
    return (
        <Box m={4} w="100%">
            <Heading>Trabajo Práctico 1</Heading>
            {/*With the defaultIndex = 1 starts in the second tab: CombinedCongruent*/}
            <Tabs variant="enclosed" mt={4} w="100%" defaultIndex={0}>
                <TabList>
                    <Tab>Congruencial Mixto</Tab>
                    <Tab>Congruencial Multiplicativo</Tab>
                </TabList>
                <TabPanels border="1px solid #efefef">
                    <TabPanel>
                        <CombinedCongruent />
                    </TabPanel>
                    <TabPanel>
                        <AditiveCongruent/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
