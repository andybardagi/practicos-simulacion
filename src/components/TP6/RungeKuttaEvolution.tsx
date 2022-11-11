import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { RungeKuttaLine } from '../../simulation/tp6/types/rungeKuttaEvolution';

type Props = {
    evolution: RungeKuttaLine[];
};
export default function RungeKuttaEvolution({ evolution }: Props) {
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th textAlign={'center'}>
                        t <sub>i</sub>
                    </Th>
                    <Th textAlign={'center'}>
                        x <sub>i</sub>
                    </Th>
                    <Th textAlign={'center'}>
                        y <sub>i</sub>
                    </Th>
                    <Th textAlign={'center'}>k1</Th>
                    <Th textAlign={'center'}>k2</Th>
                    <Th textAlign={'center'}>k3</Th>
                    <Th textAlign={'center'}>k4</Th>
                    <Th textAlign={'center'}>
                        x <sub>i+1</sub>
                    </Th>
                    <Th textAlign={'center'}>
                        y<sub>i+1</sub>
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {evolution.map((e, i) => (
                    <Tr>
                        <Td>{Math.round(e.t * 100) / 100}</Td>
                        <Td>{Math.round(e.x * 100000) / 100000}</Td>
                        <Td>{Math.round(e.y * 100000) / 100000}</Td>
                        <Td>{Math.round(e.k1 * 100000) / 100000}</Td>
                        <Td>{Math.round(e.k2 * 100000) / 100000}</Td>
                        <Td>{Math.round(e.k3 * 100000) / 100000}</Td>
                        <Td>{Math.round(e.k4 * 100000) / 100000}</Td>
                        <Td>{Math.round(e.xi_1 * 100000) / 100000}</Td>
                        <Td>{Math.round(e.yi_1 * 100000) / 100000}</Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}
