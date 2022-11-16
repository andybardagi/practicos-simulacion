import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Text,
    UnorderedList,
} from '@chakra-ui/react';
import { stateVector } from '../../../simulation/tp7/juani/types/stateVector.type';
import EventShower from './EventShower';
import QueuesShower from './QueuesShower';

import RungeKuttaEvolution from './RungeKuttaEvolution';

export default function JuaniStateVectorShower({ stateVectors }: { stateVectors: stateVector[] }) {
    return (
        <Box mb={16}>
            <Accordion defaultIndex={[0]} allowMultiple>
                {stateVectors.map((s, i) => (
                    <AccordionItem key={i}>
                        <h2>
                            <AccordionButton bgColor={s.rungeKuttaEvolution.length > 0 ? "#8CD5DC" : ""}>
                                <Box flex="1" textAlign="left">
                                    <Flex justifyContent={'space-between'}>
                                        <Text>
                                            <b>Reloj de simulación:</b> {s.clock.toFixed(2)} minutos
                                        </Text>
                                        <Text>
                                            <b>Lavados finalizados:</b> {s.finishedAssemblies}
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
                                        <b>Objetos en cola</b>
                                    </Text>
                                    <QueuesShower queues={s.queues} current={s.current}/>
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
