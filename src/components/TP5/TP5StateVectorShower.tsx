import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Text,
} from '@chakra-ui/react';
import React from 'react';
import { stateVector } from '../../simulation/tp5/types/stateVector.type';
import TP5StatsShower from './TP5StatsShower';

export default function TP5StateVectorShower({ stateVectors }: { stateVectors: stateVector[] }) {
    return (
        <Box mb={16}>
            <Accordion defaultIndex={[0]} allowMultiple>
                {stateVectors.map((s, i) => (
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    <Flex justifyContent={'space-between'}>
                                        <Text>
                                            <b>Reloj de simulación:</b> {s.clock.toFixed(2)} minutos
                                        </Text>
                                        <Text><b>Ensambles finalizados:</b> {s.finishedAssemblies}</Text>
                                    </Flex>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Box>
                                <Text>Colas por servidor</Text>
                                <Text>Eventos pendientes</Text>
                                <Text>Estadísticas parciales</Text>
                                <TP5StatsShower stats={s}></TP5StatsShower>
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
}
