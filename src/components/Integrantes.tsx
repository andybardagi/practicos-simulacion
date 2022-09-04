import { Box, Table, Tbody, Td, Th, Thead, Tr, Text, Heading } from '@chakra-ui/react';

export default function Integrantes() {
    return (
        <Box p={6} shadow="lg" width={'fit-content'} borderRadius={8} border="1px solid #12ADC1">
            <Text fontWeight={'bold'} fontSize={20} textAlign="center" mb={4}>
                Integrantes (Grupo T){' '}
            </Text>
            <Table width={'fit-content'}>
                <Thead>
                    <Tr>
                        <Th>Legajo</Th>
                        <Th>Apellido y Nombre</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>86069</Td>
                        <Td>Bardagí Inchaurrondo Andrés</Td>
                    </Tr>
                    <Tr>
                        <Td>88850</Td>
                        <Td>Bertola Juan Ignacio</Td>
                    </Tr>
                    <Tr>
                        <Td>86570</Td>
                        <Td>Tamosaitis Juan Ezequiel</Td>
                    </Tr>
                    <Tr>
                        <Td>86852</Td>
                        <Td>Zuin Lorenzo</Td>
                    </Tr>
                </Tbody>
            </Table>
        </Box>
    );
}
