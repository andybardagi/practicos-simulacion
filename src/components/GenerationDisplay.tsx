import {
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import React from 'react';
import { IGenerationIteration } from '../simulation/tp1/interfaces/IGenerationIteration';
import { IInterval } from '../simulation/tp1/interfaces/IIntervals';
import { IntervalWithPercentage } from '../simulation/tp1/interfaces/IIntervalWithPercentage';

type Props = {
    generationIteration: IGenerationIteration[];
};

export default function GenerationDisplay({ generationIteration }: Props) {
    if (!generationIteration.length) {
        return null;
    }
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>Número</Th>
                    {generationIteration[0].intervals.map((interval, index) => (
                        <Th key={index}>{`[${interval.lowerLimit.toFixed(
                            2,
                        )}; ${interval.upperLimit.toFixed(2)})`}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {generationIteration.map((gen, index) => (
                    <Tr key={index}>
                        <Td>{index}</Td>
                        <Td>{gen.number}</Td>
                        {gen.intervals.map((i, index) => (
                            <Td key={index}>{`${i.percentage * 100}%`}</Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
            <TableCaption>Generated Numbers</TableCaption>
        </Table>
    );
}
