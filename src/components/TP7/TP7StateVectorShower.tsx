import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    ListItem,
    Text,
    UnorderedList,
} from '@chakra-ui/react';
import { Servers } from '../../simulation/tp6/enum/Servers';
import { stateVector } from '../../simulation/tp7/types/stateVector.type';
import EventShower from './EventShower';
import QueuesShower from './QueuesShower';
import RungeKuttaEvolution from './RungeKuttaEvolution';

export default function TP7StateVectorShower({ stateVectors }: { stateVectors: stateVector[] }) {
    return (
        <Box mb={16}>
            <Accordion defaultIndex={[0]} allowMultiple>
                {stateVectors.map((s, i) => (
                    <AccordionItem>
                        <h2>
                            <AccordionButton bgColor={s.rungeKuttaEvolution.length > 0 ? "#00FFFF66" : ""}>
                                <Box flex="1" textAlign="left">
                                    <Flex justifyContent={'space-between'}>
                                        <Text>
                                            <b>Reloj de simulación:</b> {s.clock.toFixed(2)} horas <b> Evento:</b> {s.currentEvent.type}
                                        </Text>
                                    </Flex>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Box>
                                <Box p={8} bgColor="cyan.100" borderRadius={4}>
                                    <Text>
                                        <b>Eventos pendientes</b>
                                    </Text>
                                    <UnorderedList>
                                        {s.events.map((s, i) => (
                                            <EventShower event={s} key={i} />
                                        ))}
                                    </UnorderedList>
                                </Box>

                                <Box mt={6}>
                                    <Text fontSize={'18px'}>
                                        <b>Estado Silos</b>
                                    </Text>
                                    <QueuesShower quantity={s.quantity} states={s.states}/>
                                </Box>

                                {s.rungeKuttaEvolution.length > 0 ? (
                                    <Box mt={6}>
                                        <Text fontSize={'18px'}>
                                            <b>Evolución de Runge Kutta</b>
                                        </Text>
                                        <RungeKuttaEvolution evolution={s.rungeKuttaEvolution} />
                                    </Box>
                                ) : null}
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
}
