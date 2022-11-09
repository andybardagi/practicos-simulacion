import { Box, Table, TableContainer, Th, Thead, Tr, Tbody, Td } from '@chakra-ui/react';
import React from 'react';
import { stateVector } from '../../simulation/tp6/types/stateVector.type';
import { Servers } from '../../simulation/tp6/enum/Servers';

type Props = {
    queues: stateVector['queues'];
};
export default function QueuesShower({ queues }: Props) {
    return (
        <Box>
            <Table>
                <Thead>
                    <Tr>
                        <Th textAlign={'center'}>Servidor 1</Th>
                        <Th textAlign={'center'}>Servidor 2</Th>
                        <Th textAlign={'center'}>Servidor 3</Th>
                        <Th textAlign={'center'}>Servidor 4</Th>
                        <Th textAlign={'center'}>Servidor 5</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>
                            <Box>
                                {queues[Servers.server1].map((s, i) => (
                                    <Box
                                        key={i}
                                        w={'100%'}
                                        py={1}
                                        onClick={() => {
                                            console.log(s);
                                        }}
                                        textAlign={'center'}
                                        _hover={{ background: '#f1f1f1' }}
                                    >
                                        {s.id}
                                    </Box>
                                ))}
                            </Box>
                        </Td>
                        <Td>
                            <Box>
                                {queues[Servers.server2].map((s, i) => (
                                    <Box
                                        key={i}
                                        w={'100%'}
                                        py={1}
                                        onClick={() => {
                                            console.log(s);
                                        }}
                                        textAlign={'center'}
                                        _hover={{ background: '#f1f1f1' }}
                                    >
                                        {s.id}
                                    </Box>
                                ))}
                            </Box>
                        </Td>
                        <Td>
                            <Box>
                                {queues[Servers.server3].map((s, i) => (
                                    <Box
                                        key={i}
                                        w={'100%'}
                                        py={1}
                                        onClick={() => {
                                            console.log(s);
                                        }}
                                        textAlign={'center'}
                                        _hover={{ background: '#f1f1f1' }}
                                    >
                                        {s.id}
                                    </Box>
                                ))}
                            </Box>
                        </Td>
                        <Td>
                            <Box>
                                {queues[Servers.server4].map((s, i) => (
                                    <Box
                                        key={i}
                                        w={'100%'}
                                        py={1}
                                        onClick={() => {
                                            console.log(s);
                                        }}
                                        textAlign={'center'}
                                        _hover={{ background: '#f1f1f1' }}
                                    >
                                        {s.id}
                                    </Box>
                                ))}
                            </Box>
                        </Td>
                        <Td>
                            <Box>
                                {queues[Servers.server5].map((s, i) => (
                                    <Box
                                        key={i}
                                        w={'100%'}
                                        py={1}
                                        onClick={() => {
                                            console.log(s);
                                        }}
                                        textAlign={'center'}
                                        _hover={{ background: '#f1f1f1' }}
                                    >
                                        {s.id}
                                    </Box>
                                ))}
                            </Box>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </Box>
    );
}
