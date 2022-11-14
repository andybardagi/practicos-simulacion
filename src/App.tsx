import { Box, ChakraProvider, Flex, HStack, Text } from '@chakra-ui/react';
import '@fontsource/roboto';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TP1 from './components/TP1/TP1';
import { theme } from './theme';
import Integrantes from './components/Integrantes';
import TP3 from './components/TP3/TP3';
import { NavigationProvider, useNavigationContext } from './hooks/NavigationContext';
import TP4 from './components/TP4/TP4';
import TP5 from './components/TP5/TP5';
import TP6 from './components/TP6/TP6';
import TP7 from './components/TP7/TP7';
// #0295A9
// #12ADC1
// #FDD037
// #FFFFFF
function App() {
    const { sidebarDisplay } = useNavigationContext();
    return (
        <ChakraProvider theme={theme}>
            <NavigationProvider>
                <Navbar />

                <HStack minHeight={'100vh'} alignItems="stretch" width={'100%'} m={0}>
                    <Sidebar />
                    <Box py={2} px={4} w={'100%'}>
                        <Routes>
                            <Route path="/" element={<Integrantes />} />
                            <Route path="/tp1" element={<TP1 />} />
                            <Route
                                path="/tp2"
                                element={<Text>Trabajo práctico N° 2 realizado en Excel</Text>}
                            />
                            <Route path="/tp3" element={<TP3 />} />
                            <Route path="/tp4" element={<TP4 />} />
                            <Route path="/tp5" element={<TP5 />} />
                            <Route
                                path="/tp6"
                                element={<TP6 />}
                            />
                            <Route
                                path="/tp7"
                                element={<TP7 />}
                            />
                        </Routes>
                    </Box>
                </HStack>

                <Box p={4} display="grid" placeItems="center" bgColor="#12ADC1">
                    <Text color={'#fff'}>Trabajos prácticos simulación</Text>
                </Box>
            </NavigationProvider>
        </ChakraProvider>
    );
}

export default App;
