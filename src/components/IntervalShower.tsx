import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { IInterval } from '../simulation/tp1/interfaces/IIntervals';
import { number } from 'yup';

type Props = {
    intervals: IInterval[];
    waitedUniform: number;
    totalNumbers?: number;
};

export default function IntervalShower({ intervals, totalNumbers }: Props) {
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
                    <Th>Límite inferior</Th>
                    <Th>Límite Superior</Th>
                    <Th>Observado</Th>
                    <Th>Esperado</Th>
                </Tr>
            </Thead>
            <Tbody>
                {intervals.map((interval, index) => (
                    <Tr key={index}>
                        <Td>{interval.lowerLimit.toFixed(4)}</Td>
                        <Td>{interval.upperLimit.toFixed(4)}</Td>
                        <Td>{interval.quantity}</Td>
                        <Td>
                            {interval.expected % 1 == 0
                                ? interval.expected
                                : interval.expected.toFixed(4)}
                        </Td>
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
                    <Td>{getTotalWaited()}</Td>
                </Tr>
            </Tfoot>
        </Table>
    );
}
