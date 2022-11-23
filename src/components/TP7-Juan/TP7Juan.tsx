import {
    Box,
    Button,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    ListItem,
    Text,
    UnorderedList,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Coordinator } from '../../simulation/tp7/Coordinator';
import { stateVector } from '../../simulation/tp6/types/stateVector.type';
import { Stats } from '../../simulation/tp7/types/Stats';
import TP7StateVectorShower from '../TP7-Juan/TP7StateVectorShower';
import TP6StatsShower from './TP7StatsShower';
import { Flex } from '@chakra-ui/react';
import { RungeKuta } from '../../simulation/tp6/ConcreteServer/RungeKuta';
import { Servers } from '../../simulation/tp6/enum/Servers';
import Latex from 'react-latex';

export default function TP7Juan() {
    const coordinator = useRef<Coordinator>();
    const [flagSim, setFlagSim] = useState(false);
    const [form, setForm] = useState({
        cant: '10000',
    });
    const [stats, setStats] = useState<Stats[]>();
    const [stateVector, setStateVector] = useState<stateVector[]>();

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFlagSim(false);
        setStats(undefined);
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    };

    const handleSimulate = () => {
        if (!flagSim) {
            coordinator.current = new Coordinator(0.2, Number(form.cant));
        }
        if (coordinator.current == null) return;

        coordinator.current.simulateAll();
        const thisStats = coordinator.current.getStatsList();
        setFlagSim(true);
        setStats(thisStats);
        //setStateVector(coordinator.current.getStateVector());
        console.log(thisStats);
    };

    return (
        <Box p={4} w="100%">
            <Heading>Trabajo Práctico 7 - Juan Ezequiel Tamosaitis - 86570</Heading>
            <Box border="1px solid #efefef" borderRadius={8} p={4}>
                <Text color="#444444">
                    A una panadería llegan clientes con una distribución exponencial negativa de
                    media 3 minutos. Esta panadería cuenta con dos empleados, cualquiera de los
                    cuales demora entre 0,5 y 1,5 minutos (distribución uniforme) en atender a un
                    cliente, independientemente de cuántas cosas compre el cliente (compran entre 1
                    y 3 productos). La panadería posee un horno que genera productos una vez que los
                    mismos están cocinados. El horno se enciende cada 45 minutos o cuando la
                    panadería se queda sin stock de productos. La cocción de los productos finaliza
                    cuando el horno permanece 15 minutos en temperatura máxima. La tasa de cambio de
                    la temperatura del horno está representada por la siguiente ecuación:
                </Text>
                <Box mx="auto" w="fit-content" my={4}>
                <Latex displayMode={true}>{`$$\\frac{dT}{dt} = -0,5 T + \\frac{900}{P}$$`}</Latex>
                </Box>
                <Text color="#444444">
                    Donde la constante P representa la cantidad de productos que se están cocinando.
                    Inicialmente, el horno siempre tiene 5 grados. La cantidad de productos a
                    cocinar depende del stock de la panadería al momento de encender el horno. Si
                    hay productos para vender, se cargan 30 unidades para cocinar. En cambio, si no
                    hay stock, se cargan 45 unidades. Cuando un cliente llega, si no hay productos
                    para vender en los próximos 5 minutos, se retira. Si estaba esperando su turno,
                    y se terminan los productos, se retira. Si le toca su turno, y quedan menos
                    productos de la cantidad que pensaba comprar, compra lo que queda. Se desea
                    saber el porcentaje de clientes que se pierden por no haber existencia de
                    productos.
                </Text>
            </Box>
            <Flex direction={['column', 'column', 'row', 'row']} gap="2" my={2}>
                <InputGroup>
                    <InputLeftAddon>b</InputLeftAddon>
                    <Input value={form.cant} onChange={handleFormChange} name="cant"></Input>
                </InputGroup>
            </Flex>
            <Box>
                <Button colorScheme={'linkedin'} onClick={handleSimulate} mt={3} mb={3}>
                    Simular {form.cant} ensambles
                </Button>
            </Box>
            {flagSim && stats ? <TP7StateVectorShower stats={stats} /> : null}
            {/* {flagSim && stats ? <TP6StatsShower stats={stats} /> : null} */}
        </Box>
    );
}
