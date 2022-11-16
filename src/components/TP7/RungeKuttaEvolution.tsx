import { Box, Table, Tbody, Td, Th, Thead, Tr, Text } from '@chakra-ui/react';
import React from 'react';
import { RungeKuttaLine } from '../../simulation/tp6/types/rungeKuttaEvolution';
import DoubleFunctionGraph from './DoubleFunctionGraph';
import FuntionGraph from './FunctionGraph';

type Props = {
    evolution: RungeKuttaLine[];
};
export default function RungeKuttaEvolution({ evolution }: Props) {
    let evolutionSortedByX = structuredClone(evolution);
    evolutionSortedByX = evolutionSortedByX.sort((a, b) => a.x - b.x);

    return (
        <Box>
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
            {/* <Box>
                <DoubleFunctionGraph
                    title="x'' y x' en funcion de x"
                    evolutionX={evolution
                        .sort((a, b) => a.t - b.t)
                        .map((e) => Math.round(e.t * 100) / 100)}
                    evolutionY2={evolution.map((e) => e.x)}
                    evolutionY={evolution.map((e) => e.y)}
                />
            </Box> */}
            {/* <Box>
                <FuntionGraph
                    title="x' en funcion de x"
                    evolutionX={evolution.map((e) => Math.round(e.t * 100) / 100)}
                    evolutionY={evolution.map((e) => e.x)}
                />
            </Box>
            <Box>
                <FuntionGraph
                    title="x'' en funcion de x"
                    evolutionX={evolution.map((e) => Math.round(e.t * 100) / 100)}
                    evolutionY={evolution.map((e) => e.y)}
                />
            </Box>
            <Box>
                <FuntionGraph
                    title="x'' en funcion de x'"
                    evolutionX={evolutionSortedByX.map((e) => Math.round(e.x * 10000) / 10000)}
                    evolutionY={evolution.map((e) => e.y)}
                />
            </Box> */}
        </Box>
    );
}
