import { Box, Table, TableContainer, Th, Thead, Tr, Tbody, Td } from '@chakra-ui/react';
import React from 'react';
import { stateVector } from '../../simulation/tp7/types/stateVector.type';
import { Silos } from '../../simulation/tp7/enum/Silos';

type Props = {
    queue: stateVector['queue'];
    states: stateVector['states'];
};
export default function queueShower({ queue, states: states }: Props) {
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
                        <Td py={1} textAlign="center">{states[Silos.silo1] != null ? states[Silos.silo1]?.getState() : "Libre" }</Td>
                        <Td py={1} textAlign="center">{states[Silos.silo2] != null ? states[Silos.silo2]?.getState() : "Libre" }</Td>
                        <Td py={1} textAlign="center">{states[Silos.silo3] != null ? states[Silos.silo3]?.getState() : "Libre" }</Td>
                        <Td py={1} textAlign="center">{states[Silos.silo4] != null ? states[Silos.silo4]?.getState() : "Libre" }</Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <Box>
                                {queue.map((s, i) => (
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
