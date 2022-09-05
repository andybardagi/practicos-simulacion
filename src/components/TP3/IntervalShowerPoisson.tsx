import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { IInterval } from '../../simulation/tp1/interfaces/IIntervals';
import { number } from 'yup';

type Props = {
    intervals: IInterval[];
    totalNumbers?: number;
};

export default function IntervalShowerPoisson({ intervals, totalNumbers }: Props) {
    const getTotal = () => {
        const sum = intervals.reduce((accumulator, object) => {
            return accumulator + object.quantity;
        }, 0);
        return sum;
    };

    const getTotalWaited = () => {
        const sum = intervals.reduce((accumulator, object) => {
            return accumulator + object.expected;
        }, 0);
        return sum;
    };
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Valor</Th>
                    <Th>Observado</Th>
                    <Th>Esperado</Th>
                </Tr>
            </Thead>
            <Tbody>
                {intervals.map((interval, index) => (
                    <Tr key={index}>
                        <Td>{(interval.upperLimit-0.5).toFixed(0).toString()}</Td>
                        <Td>{interval.quantity}</Td>
                        <Td>
                            {interval.expected % 1 == 0
                                ? interval.expected
                                : interval.expected.toFixed(4).toString().replace('.', ',')}
                        </Td>
                    </Tr>
                ))}
            </Tbody>
            <Tfoot fontWeight={'bold'}>
                <Tr>
                    <Td>
                        <strong>Total</strong>{' '}
                    </Td>
                    <Td>{getTotal()}</Td>
                    <Td>{getTotalWaited()}</Td>
                </Tr>
            </Tfoot>
        </Table>
    );
}
