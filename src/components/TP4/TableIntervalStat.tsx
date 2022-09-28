import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { IntervalStatType } from '../../simulation/tp4/types/intervalStat.type';

type PropType = {
    intervals: IntervalStatType[];
};
export default function TableIntervalStat({ intervals }: PropType) {
    return (
        <Box>
            <Table>
                <Thead>
                    <Tr>
                        <Th>#</Th>
                        <Th>Lím. Superior</Th>
                        <Th>F. Observada</Th>
                        <Th>Prob</Th>
                        <Th>Prob acum.</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {intervals.map((i, ind) => (
                        <Tr key={ind}>
                            <Td>{ind+1}</Td>
                            <Td>{i.upperLimit === Infinity ? "Todos los demás" : i.upperLimit.toFixed(4)}</Td>
                            <Td>{i.observed}</Td>
                            <Td>{i.prob.toFixed(4)}</Td>
                            <Td>{ind == intervals.length - 1 ? 1 : i.acumProb.toFixed(4)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}
