import {
    Box,
    Text,
    ChakraProvider,
    Flex,
    List,
    ListItem,
} from '@chakra-ui/react';
import Navbar from './components/Navbar';
import TP1 from './components/TP1';
import Sidebar from './components/Sidebar';
// #0295A9
// #12ADC1
// #FDD037
// #FFFFFF
function App() {
    return (
        <ChakraProvider>
            <Navbar />
            <Box>
                <Flex direction={'row'} minHeight={'100vh'}>
                    <Sidebar />
                    <Box py={2} px={4} w="85%" >
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
