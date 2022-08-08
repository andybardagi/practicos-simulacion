import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { IInterval } from '../simulation/tp1/IIntervals';
import { number } from 'yup';

type Props = {
    intervals: IInterval[];
    waitedUniform: number;
    totalNumbers: number;
};

export default function IntervalShower({
    intervals,
    waitedUniform,
    totalNumbers,
}: Props) {
    const getTotal = () => {
        const sum = intervals.reduce((accumulator, object) => {
            return accumulator + object.quantity;
        }, 0);
        return sum;
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Límite inferior</Th>
                    <Th>Límite Superior</Th>
                    <Th>Observado</Th>
                    <Th>Esperado</Th>
                </Tr>
            </Thead>
            <Tbody>
                {intervals.map((interval, index) => (
                    <Tr key={index}>
                        <Td>{interval.lowerLimit}</Td>
                        <Td>{interval.upperLimit}</Td>
                        <Td>{interval.quantity}</Td>
                        <Td>{waitedUniform}</Td>
                    </Tr>
                ))}
            </Tbody>
            <Tfoot fontWeight={'bold'}>
                <Tr>
                    <Td>
                        <strong>Total</strong>{' '}
                    </Td>
                    <Td></Td>
                    <Td>{getTotal()}</Td>
                    <Td>{waitedUniform * intervals.length}</Td>
                </Tr>
            </Tfoot>
        </Table>
    );
}
