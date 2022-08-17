import { Table, TableCaption, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { IGenerationIteration } from '../simulation/tp1/interfaces/IGenerationIteration';

type Props = {
    generationIteration: IGenerationIteration[];
    limits: string[];
};

const TableHeader = ({ generationIteration, limits }: Props) => (
    <Tr>
        <Th>#</Th>
        {generationIteration[0].x_i_1 ? (
            <Th>
                X<Text as="sub">i-1</Text>
            </Th>
        ) : (
            <></>
        )}
        <Th>
            X<Text as="sub">i</Text>
        </Th>

        <Th>Número</Th>
        {limits.map((lim, index) => (
            <Th key={index}>{lim}</Th>
        ))}
    </Tr>
);

export default function GenerationDisplay({ generationIteration, limits }: Props) {
    if (!generationIteration.length) {
        return null;
    }
    return (
        <Table overflow={'scroll'}>
            <Thead>
                <TableHeader generationIteration={generationIteration} limits={limits} />
            </Thead>
            <Tbody>
                {generationIteration.map((gen, index) => (
                    <Tr key={index}>
                        <Td>{gen.line}</Td>
                        {generationIteration[index].x_i_1 !== undefined ? (
                            <Td>{gen.x_i_1}</Td>
                        ) : null}
                        <Td>{gen.x_i}</Td>
                        <Td>{Math.round(gen.number * 10000) / 10000}</Td>
                        {gen.intervals.map((i, index) => (
                            <Td key={index}>{`${(i * 100).toFixed(2)}%`}</Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
            <Tfoot>
                <TableHeader generationIteration={generationIteration} limits={limits} />
            </Tfoot>
            <TableCaption>
                Números aleatorios generados, renglón, semilla y frecuencias correspondientes
            </TableCaption>
        </Table>
    );
}
