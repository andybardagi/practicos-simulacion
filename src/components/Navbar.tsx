import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react';
import React from 'react';

export default function Navbar() {
    return (
        <Box w={'100%'} bgColor="#0295A9" paddingY={2} paddingX={4}>
            <Flex direction={'row'} justifyContent="space-between">
                <Text fontSize={22} color="#fff" fontWeight={'bold'}>
                    Simulación - TPs
                </Text>

                <Flex
                    direction={'row'}
                    gap={4}
                    justifyContent="space-between"
                    alignItems="center"
                    color={'#fff'}
                >
                    <Text>TP1</Text>
                    <Text>TP2</Text>
                    <Text>TP3</Text>
                </Flex>
            </Flex>
            <div></div>
        </Box>
    );
}
