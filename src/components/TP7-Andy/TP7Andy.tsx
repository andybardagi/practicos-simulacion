import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import Latex from 'react-latex';
import QueueFlow from '../TP6/QueueFlow';

export default function TP7Andy() {
    return (
        <Box p={4} w="100%">
            <Heading>Trabajo Práctico 7 - Andrés Bardagí Inchaurrondo (86069)</Heading>
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
                <Latex displayMode={true}>{`$$\\frac{dT}{dt} = -0,5 T + \\frac{900}{P}$$`}</Latex>
                <Text color="#444444">
                    Donde <b>la constante P</b> representa la cantidad de productos que se están
                    cocinando. Inicialmente, el horno siempre tiene 5 grados. La cantidad de
                    productos a cocinar depende del stock de la panadería al momento de encender el
                    horno. Si hay productos para vender, se cargan 30 unidades para cocinar. En
                    cambio, si no hay stock, se cargan 45 unidades. Cuando un cliente llega, si no
                    hay productos para vender en los próximos 5 minutos, se retira. Si estaba
                    esperando su turno, y se terminan los productos, se retira. Si le toca su turno,
                    y quedan menos productos de la cantidad que pensaba comprar, compra lo que
                    queda. Se desea saber el porcentaje de clientes que se pierden por no haber
                    existencia de productos.
                </Text>
            </Box>
        </Box>
    );
}
