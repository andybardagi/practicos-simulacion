import { Box, Table, TableContainer, Th, Thead, Tr, Tbody, Td } from '@chakra-ui/react';
import React from 'react';
import { stateVector } from '../../../simulation/tp7/juani/types/stateVector.type';
import { Servers } from '../../../simulation/tp7/juani/enum/Servers';

type Props = {
    queues: stateVector['queues'];
    current: stateVector['current'];
};
export default function QueuesShower({ queues, current }: Props) {
    return (
        <Box>
            <Table>
                <Thead>
                    <Tr>
                        <Th textAlign={'center'}>Servidor 1 - QA</Th>
                        <Th textAlign={'center'}>Servidor 2 - AA</Th>
                        <Th textAlign={'center'}>Servidor 3 - L 1</Th>
                        <Th textAlign={'center'}>Servidor 32 - L 2</Th>
                        <Th textAlign={'center'}>Servidor 4 - S</Th>
                        <Th textAlign={'center'}>Servidor 5 - PA</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr bgColor={"#22ff2266"}>
                        <Td py={1} textAlign="center">{current[Servers.server1] != null ? current[Servers.server1]?.id : "Libre" }</Td>
                        <Td py={1} textAlign="center">{current[Servers.server2] != null ? current[Servers.server2]?.id : "Libre" }</Td>
                        <Td py={1} textAlign="center">{current[Servers.server3] != null ? current[Servers.server3]?.id : "Libre" }</Td>
                        <Td py={1} textAlign="center">{current[Servers.server32] != null ? current[Servers.server32]?.id : "Libre" }</Td>
                        <Td py={1} textAlign="center">{current[Servers.server4] != null ? current[Servers.server4]?.id : "Libre" }</Td>
                        <Td py={1} textAlign="center">{current[Servers.server5] != null ? current[Servers.server5]?.id : "Libre" }</Td>
                    </Tr>
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
                                {queues[Servers.server32].map((s, i) => (
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
