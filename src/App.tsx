import { Box, ChakraProvider, Flex, Text } from '@chakra-ui/react';
import '@fontsource/roboto';
import Navbar from './components/Navbar';
import TP1 from './components/TP1';
import { theme } from './theme';

// #0295A9
// #12ADC1
// #FDD037
// #FFFFFF
function App() {
    return (
        <ChakraProvider theme={theme}>
            <Navbar />
            <Box>
                <Flex direction={'row'} minHeight={'100vh'}>
                    {/* <Sidebar /> */}
                    <Box py={2} px={4} w="100%">
                        <TP1></TP1>
                    </Box>
                </Flex>
            </Box>
            <Box p={4} display="grid" placeItems="center" bgColor="#12ADC1">
                <Text color={'#fff'}>Trabajos prácticos simulación</Text>
            </Box>
        </ChakraProvider>
    );
}

export default App;
