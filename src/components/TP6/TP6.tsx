import { Heading, UnorderedList, ListItem, Text, Box, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useRef } from 'react';
import { Coordinator } from '../../simulation/tp5/Coordinator';
import { SimulationEvent } from '../../simulation/tp5/enum/SimulationEvent';
import TP5StatsShower from '../TP5/TP5StatsShower';
import { tp5StatsType } from '../../simulation/tp5/types/stats.type';
import { stateVector } from '../../simulation/tp5/types/stateVector.type';
import TP5StateVectorShower from '../TP5/TP5StateVectorShower';
import QueueFlow from '../TP5/QueueFlow';
import { estimators } from '../TP5/ConsignasTP5';

export default function TP6() {
    const activities = [
        'A1 - Distribución uniforme U [20, 30)',
        'A2 - Distribución uniforme U [30, 50)',
        'A3 - Distribución exponencial con media de 30',
        'A4 - Distribución uniforme U [10, 20)',
        'A5 - Distribución exponencial con media de 5',
    ];

    const coordinator = useRef<Coordinator>();
    const [flagSim, setFlagSim] = useState(false);
    const [stats, setStats] = useState<tp5StatsType>();
    const [stateVector, setStateVector] = useState<stateVector[]>();

    const simulate = () => {
        coordinator.current = new Coordinator();
        const res = coordinator.current.simulate(10_000);
        setFlagSim(true);
        setStats(res);
        setStateVector(coordinator.current.getStateVector());
    };

    return (
        <Box p={4} w="100%">
            <Heading>Trabajo Práctico 5</Heading>
            <Box border="1px solid #efefef" borderRadius={8} p={4}>
                <Text color="#444444">
                    Simule el siguiente Modelo dinámico obteniendo los estimadores solicitados y
                    luego responda las preguntas.
                </Text>
                <Text color="#444444">
                    Para todas las actividades utilice los datos en minutos y en unidades; el
                    proceso se desarrolla en forma continua en todas las secciones. Como se
                    trabajara las 24 horas del día no se hará distinción de días y usando solamente
                    minutos. Todas las secciones tienen capacidad de almacenamiento ilimitada.
                </Text>
                <Text color="#444444">
                    Al momento de inicio no hay ningún proceso realizado, incompleto ni pendiente y
                    tampoco hay productos en cola. Los servidores están libres
                </Text>
                <Box mx="auto" w="fit-content" my={4}>
                    <Text color="#444444" mb={2}>
                        Diagrama de precedencia de actividades
                    </Text>
                    <QueueFlow />
                </Box>
                <UnorderedList mb={2}>
                    {activities.map((a, i) => (
                        <ListItem key={i}>
                            <Text color="#444444">{a} </Text>
                        </ListItem>
                    ))}
                </UnorderedList>
                <Text color="#444444">
                    Llamaremos <b>duración de la tarea de ensamble</b> al "tiempo mínimo" en que
                    puede completarse dicha tarea.
                </Text>
                <Text color="#444444">
                    <b>
                        Se considera completada la tarea de ensamble cuando completamos las 5
                        actividades considerando sus precedencias
                    </b>
                </Text>
                <UnorderedList>
                    {estimators.map((e, i) => (
                        <ListItem key={i}>
                            <Text color={e.done == 1 ? '#444444' : 'red'}>{e.text}</Text>
                        </ListItem>
                    ))}
                </UnorderedList>
            </Box>

            <Box>
                <Button colorScheme={'linkedin'} onClick={simulate} mt={3} mb={3}>
                    Simular 10 ensambles
                </Button>
            </Box>
            {flagSim && stateVector ? <TP5StateVectorShower stateVectors={stateVector} /> : null}
            {flagSim && stats ? <TP5StatsShower stats={stats} /> : null}
        </Box>
    );
}
