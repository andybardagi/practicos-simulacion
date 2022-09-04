import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import PoissonDist from './PoissonDist';

export default function TP3() {
    return (
        <Box p={4} w="100%">
            <Heading>Trabajo Práctico 3</Heading>
            <Box border="1px solid #efefef" borderRadius={8} p={4}>
                <Text color="#444444">
                    a) Realizar una librería que proporcione (mediante funciones o métodos) la
                    funcionalidad necesaria para generar valores de variables aleatorias continuas
                    para las siguientes distribuciones: exponencial, poisson y normal.
                </Text>
                <Text color="#444444">
                    El usuario debe poder ingresar los parámetros de las distribuciones y la
                    cantidad de valores a generar. Los valores generados deben poder ser
                    visualizados.
                </Text>
                <Text color="#444444">
                    b) Realizar un programa que grafique las distribuciones anteriores utilizando la
                    librería pedida en el punto anterior. (La gráfica se aceptará que se genere en
                    base a un archivo de salida del programa, en Excel).
                </Text>
                <Text color="#444444">
                    La cantidad de intervalos de la gráfica debe ingresarse por parámetro. Y se
                    deberá realizar pruebas de los generadores (ChiCuadrado o alguna otra)
                </Text>
            </Box>
            {/*With the defaultIndex = 1 starts in the second tab: CombinedCongruent*/}
            <Tabs variant="enclosed" mt={4} w="100%" defaultIndex={0}>
                <TabList
                    overflowX="scroll"
                    overflowY={'hidden'}
                    style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                >
                    <Tab>Uniforme</Tab>
                    <Tab>Normal</Tab>
                    <Tab>Poisson</Tab>
                </TabList>
                <TabPanels border="1px solid #efefef">
                    <TabPanel>
                        <Text>1</Text>
                    </TabPanel>
                    <TabPanel>
                        <Text>2</Text>
                    </TabPanel>
                    <TabPanel>
                        <PoissonDist />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}
