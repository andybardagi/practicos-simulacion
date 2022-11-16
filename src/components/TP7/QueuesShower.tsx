import { Box, Table, TableContainer, Th, Thead, Tr, Tbody, Td } from '@chakra-ui/react';
import React from 'react';
import { stateVector } from '../../simulation/tp6/types/stateVector.type';
import { Silos } from '../../simulation/tp7/enum/Silos';

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
                        <Th textAlign={'center'}>Silo 1</Th>
                        <Th textAlign={'center'}>Silo 2</Th>
                        <Th textAlign={'center'}>Silo 3</Th>
                        <Th textAlign={'center'}>Silo 4</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr bgColor={"#22ff2266"}>
                        <Td py={1} textAlign="center">{current[Silos.silo1] != null ? current[Silos.silo1]?.id : "Libre" }</Td>
                        <Td py={1} textAlign="center">{current[Silos.silo2] != null ? current[Silos.silo2]?.id : "Libre" }</Td>
                        <Td py={1} textAlign="center">{current[Silos.silo3] != null ? current[Silos.silo3]?.id : "Libre" }</Td>
                        <Td py={1} textAlign="center">{current[Silos.silo4] != null ? current[Silos.silo4]?.id : "Libre" }</Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <Box>
                                {queues[Silos.silo1].map((s, i) => (
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
                                {queues[Silos.silo2].map((s, i) => (
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
                                {queues[Silos.silo3].map((s, i) => (
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
                                {queues[Silos.silo4].map((s, i) => (
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
