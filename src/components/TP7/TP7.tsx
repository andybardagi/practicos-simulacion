import { Heading, UnorderedList, ListItem, Text, Box, Button } from '@chakra-ui/react';

//import Ec.Diferencial from '../TP7';
// 

export default function TP7() {
    return (
        <Box p={4} w="100%">
            <Heading>Trabajo Práctico 7</Heading>
            <Box border="1px solid #efefef" borderRadius={8} p={4}>
                <Text color="#444444">
                    Una fábrica de galletitas posee cuatro silos de acopio de harina.  
                </Text>
                <Text color="#444444">
                    Los silos tienen una capacidad de 20 Tn. y son llenados desde una playa de descarga por un tubo aspirador. 
                    El tubo aspirador frena por completo cada vez que cambia de silo.
                </Text>
                <Text color="#444444">
                    La playa de descarga posee un solo lugar de descarga (tubo aspirador). 
                    Sólo se descarga harina en silos que no suministran harina a la planta en ese momento.
                </Text>
                <Text color="#444444">
                    La planta se abastece de un solo silo por vez, en lotes de media Tn por hora. 
                    Cuando un silo agota su carga la planta se abastece de otro, siempre que no esté siendo llenado por el tubo aspirador. 
                </Text>
                <Text color="#444444">
                    Si la descarga de una parte de la carga de un camión, completa la capacidad del silo, 
                    se efectúa una descarga del resto en otro silo que admita carga, luego de 1/6 de hora de preparación. 
                </Text>
                <Text color="#444444">
                    Camiones: 10 y 12 Tn. (con igual probabilidad), Tasa de llegada de camiones: 1 de 5 hs. a 9 hs. (uniforme). 
                </Text>
                <Box mx="auto" my={4}>
                    <Text color="#444444" >
                        La tasa de descarga, se rige por la siguiente ecuación:
                    </Text>
                    
                </Box>
                
                
            </Box>
        </Box>
    );
}
