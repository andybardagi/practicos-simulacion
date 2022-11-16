import { Box, Table, TableContainer, Th, Thead, Tr, Tbody, Td } from '@chakra-ui/react';
import React from 'react';
import { stateVector } from '../../simulation/tp7/types/stateVector.type';
import { Silos } from '../../simulation/tp7/enum/Silos';

type Props = {
    quantity: stateVector['quantity'];
    states: stateVector['states'];
};
export default function queueShower({ quantity, states: states }: Props) {
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
                        <Td py={1} textAlign="center">{states[Silos.silo1] }</Td>
                        <Td py={1} textAlign="center">{states[Silos.silo2] }</Td>
                        <Td py={1} textAlign="center">{states[Silos.silo3] }</Td>
                        <Td py={1} textAlign="center">{states[Silos.silo4] }</Td>
                    </Tr>
                    <Tr>
                        <Td py={1} textAlign="center"><Box>{quantity[Silos.silo1] } Tn</Box></Td>
                        <Td py={1} textAlign="center"><Box>{quantity[Silos.silo2] } Tn</Box></Td>
                        <Td py={1} textAlign="center"><Box>{quantity[Silos.silo3] } Tn</Box></Td>
                        <Td py={1} textAlign="center"><Box>{quantity[Silos.silo4] } Tn</Box></Td>
                    </Tr>
                </Tbody>
            </Table>
        </Box>
    );
}
