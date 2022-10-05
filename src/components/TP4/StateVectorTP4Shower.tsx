import { Box, Heading, Table, Tbody, Td, Thead, Tooltip, Tr } from '@chakra-ui/react';
import React from 'react';
import { stateVector } from '../../simulation/tp4/types/stateVector.type';
import { number } from 'yup';

type Prop = {
    stateVectors: stateVector[];
};

const TooltipNumberCell = ({ n, bold, color}: { n: number; bold?: boolean, color?: string}) => {
    const number = n % 1 == 0 ? n : n.toFixed(3);
    return (
        <Tooltip label={n.toString()}>
            <Td background={color ? `${color}55` : "" }>{!bold ? <>{number}</> : <b>{number}</b>}</Td>
        </Tooltip>
    );
};

export default function StateVectorTP4Shower({ stateVectors }: Prop) {

    const colors = [
        "#60A917",
        "#1BA1E2",
        "#F472D0",
        "#EBC800",
        "#A20025",
    ]

    return (
        <Box>
            <Heading size="md">Vectores de estado</Heading>
            <Table>
                <Thead>
                    <Tr>
                        <Td>#</Td>
                        {[0, 1, 2, 3, 4].map((a, i) => (
                            <>
                                <Td background={`${colors[i]}55`}>uRND</Td>
                                <Td background={`${colors[i]}55`}>Random</Td>
                            </>
                        ))}
                        <Td>T. Ensamble</Td>
                        <Td>Duración acum.</Td>
                        <Td>Prom.</Td>
                        <Td>&lt;45</Td>
                        <Td>Max</Td>
                        <Td>Min</Td>
                    </Tr>
                </Thead>
                <Tbody>
                    {stateVectors.map((s) => (
                        <Tr>
                            <Td>{s.simulationCounter}</Td>
                            {s.activities.map((a, i) => (
                                <>
                                    <TooltipNumberCell color={colors[i]} n={a.uRnd} />
                                    <TooltipNumberCell color={colors[i]} n={a.random} />
                                </>
                            ))}
                            <TooltipNumberCell n={s.assemblyDuration} bold />
                            <TooltipNumberCell n={s.durationAcumulator} />
                            <TooltipNumberCell n={s.durationAcumulator / s.simulationCounter} />
                            <TooltipNumberCell n={s.finishedBefore45Counter} />
                            <TooltipNumberCell n={s.maxDuration} />
                            <TooltipNumberCell n={s.minDuration} />
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
}
