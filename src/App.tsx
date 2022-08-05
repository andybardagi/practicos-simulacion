import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import TP1 from './components/TP1';
// #0295A9
// #12ADC1
// #FDD037
// #FFFFFF
function App() {
    return (
        <ChakraProvider>
                <Navbar />
                <TP1></TP1>
        </ChakraProvider>
    );
}

export default App;
