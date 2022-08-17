import { Table, TableCaption, Tbody, Td, Th, Thead, Tr, Text, Tfoot } from '@chakra-ui/react';
import { IGenerationIteration } from '../simulation/tp1/interfaces/IGenerationIteration';

type Props = {
    generationIteration: IGenerationIteration[];
    limits: string[];
};

export default function GenerationDisplay({ generationIteration, limits }: Props) {
    if (!generationIteration.length) {
        return null;
    }
    return (
        <Table overflow={'scroll'}>
            <Thead>
                <Tr>
                    <Th>#</Th>
                    <Th>
                        X<Text as="sub">i</Text>
                    </Th>
                    <Th>Número</Th>
                    {limits.map((lim, index) => (
                        <Th key={index}>{lim}</Th>
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
                            <Td key={index}>{`${(i * 100).toFixed(2)}%`}</Td>
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
                    {limits.map((lim, index) => (
                        <Th key={index}>{lim}</Th>
                    ))}
                </Tr>
            </Tfoot>
            <TableCaption>
                Números aleatorios generados, renglón, semilla y frecuencias correspondientes
            </TableCaption>
        </Table>
    );
}
