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
import CombinedCongruent from './TP1/CombinedCongruent';
import AditiveCongruent from './TP1/MultiplicativeCongruent';
import LinearCongruent from './TP1/LinearCongruent';
import LanguageGenerator from './TP1/LanguageGenerator';

export default function TP1() {
    return (
        <Box p={4} w="100%">
            <Heading>Trabajo Práctico 1</Heading>
            {/*With the defaultIndex = 1 starts in the second tab: CombinedCongruent*/}
            <Tabs variant="enclosed" mt={4} w="100%" defaultIndex={0}>
                <TabList
                    overflowX="scroll"
                    overflowY={'hidden'}
                    style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                >
                    <Tab>Congruencial Mixto</Tab>
                    <Tab>Congruencial Multiplicativo</Tab>
                    <Tab>Congruencial Aditivo</Tab>
                    <Tab>Generador Javascript</Tab>
                </TabList>
                <TabPanels border="1px solid #efefef">
                    <TabPanel>
                        <CombinedCongruent />
                    </TabPanel>
                    <TabPanel>
                        <AditiveCongruent />
                    </TabPanel>
                    <TabPanel>
                        <LinearCongruent />
                    </TabPanel>
                    <TabPanel>
                        <LanguageGenerator />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
