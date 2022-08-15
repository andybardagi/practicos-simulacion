import { Table, TableCaption, Tbody, Td, Th, Thead, Tr, Text, Tfoot } from '@chakra-ui/react';
import { IGenerationIteration } from '../simulation/tp1/interfaces/IGenerationIteration';

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
                    <Th>
                        X<Text as="sub">i</Text>
                    </Th>
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
                        <Td>{gen.line}</Td>
                        <Td>{gen.x_i}</Td>
                        <Td>{Math.round(gen.number * 10000) / 10000}</Td>
                        {gen.intervals.map((i, index) => (
                            <Td
                                key={index}
                                color={
                                    i.lowerLimit < gen.number && gen.number < i.upperLimit
                                        ? '#0295A9'
                                        : 'black'
                                }
                            >
                                {`${(i.percentage * 100).toFixed(2)}%`}
                            </Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
            <Tfoot>
                <Tr>
                    <Th>#</Th>
                    <Th>
                        X<Text as="sub">i</Text>
                    </Th>
                    <Th>Número</Th>
                    {generationIteration[0].intervals.map((interval, index) => (
                        <Th key={index}>{`[${interval.lowerLimit.toFixed(
                            2,
                        )}; ${interval.upperLimit.toFixed(2)})`}</Th>
                    ))}
                </Tr>
            </Tfoot>
            <TableCaption>
                Números aleatorios generados, renglón, semilla y frecuencias correspondientes
            </TableCaption>
        </Table>
    );
}
