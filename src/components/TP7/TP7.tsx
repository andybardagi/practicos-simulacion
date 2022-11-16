import { Heading, UnorderedList, ListItem, Text, Box, Button, InputGroup, Flex, InputLeftAddon, Input } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Coordinator } from '../../simulation/tp7/Coordinator';
import FormulaDisplay from './FormulaDisplay';
import TP7StateVectorShower from './TP7StateVectorShower';
import { stateVector } from '../../simulation/tp7/types/stateVector.type';
import { tp7StatsType } from '../../simulation/tp7/types/stats.type';

//import Ec.Diferencial from '../TP7';
// 

export default function TP7() {
    const coordinator = useRef<Coordinator>();
    const [flagSim, setFlagSim] = useState(false);
    const [stats, setStats] = useState<tp7StatsType>();
    
    const [form, setForm] = useState({
        cant: '10000',
        });
    
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFlagSim(false);
        setStats(undefined);
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    };
    const [stateVector, setStateVector] = useState<stateVector[]>();

    const simulate = () => {
        coordinator.current = new Coordinator();

        const isIncorrect =
            Object.values(form)
                .map((v) => v.replace(',', '.'))
                .map((v) => Number(v))
                .filter((v) => Number.isNaN(v)).length > 0;

        if (isIncorrect) {
            alert('Error en los valores ingresados');
            return;
        }
        const res = coordinator.current.simulate(Number(form.cant));
        setFlagSim(true);
        setStats(res);
        setStateVector(coordinator.current.getStateVector());
    };

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
                    <FormulaDisplay></FormulaDisplay>
                </Box>
                <Flex direction={'row'} mt={4} flexWrap="wrap" maxW="15%" gap={'5%'}>
                <InputGroup>
                    <InputLeftAddon>Cantidad</InputLeftAddon>
                    <Input value={form.cant} onChange={handleFormChange} name="cant"></Input>
                </InputGroup>
                </Flex>
                    <Box>
                        <Button colorScheme={'linkedin'} onClick={simulate} mt={3} mb={3}>
                            Simular {form.cant} eventos
                        </Button>
                    </Box>
                
            </Box>
            {flagSim && stateVector ? <TP7StateVectorShower stateVectors={stateVector} /> : null}
        </Box>
    );
}
