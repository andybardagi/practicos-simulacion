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
import React from 'react';
import { stateVector } from '../../simulation/tp5/types/stateVector.type';
import EventShower from './EventShower';
import QueuesShower from './QueuesShower';
import TP5StatsShower from './TP5StatsShower';
import { Servers } from '../../simulation/tp5/enum/Servers';
import { ListItem } from '@chakra-ui/react';

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
                                        <Text>
                                            <b>Ensambles finalizados:</b> {s.finishedAssemblies}
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
                                <Box py={4}>
                                    <Text fontSize={'18px'}>
                                        <b>Estadísticas parciales</b>
                                    </Text>
                                    <TP5StatsShower stats={s}></TP5StatsShower>
                                </Box>
                                <Box>
                                    <Text fontSize={'18px'}>
                                        <b>Porcentaje de ocupación de servidores</b>
                                    </Text>
                                    <UnorderedList>
                                        <ListItem>
                                            <Text>
                                                Servidor 1:{' '}
                                                {(
                                                    s.serversOccupation[Servers.server1] * 100
                                                ).toFixed(4)}
                                                %
                                            </Text>
                                        </ListItem>
                                        <ListItem>
                                            <Text>
                                                Servidor 2:{' '}
                                                {(
                                                    s.serversOccupation[Servers.server2] * 100
                                                ).toFixed(4)}
                                                %
                                            </Text>
                                        </ListItem>
                                        <ListItem>
                                            <Text>
                                                Servidor 3:{' '}
                                                {(
                                                    s.serversOccupation[Servers.server3] * 100
                                                ).toFixed(4)}
                                                %
                                            </Text>
                                        </ListItem>
                                        <ListItem>
                                            <Text>
                                                Servidor 4:{' '}
                                                {(
                                                    s.serversOccupation[Servers.server4] * 100
                                                ).toFixed(4)}
                                                %
                                            </Text>
                                        </ListItem>
                                        <ListItem>
                                            <Text>
                                                Servidor 5:{' '}
                                                {(
                                                    s.serversOccupation[Servers.server5] * 100
                                                ).toFixed(4)}
                                                %
                                            </Text>
                                        </ListItem>
                                    </UnorderedList>
                                </Box>
                                <Box mt={6}>
                                    <Text fontSize={'18px'}>
                                        <b>Cantidad promedio de ensambles por hora: </b>
                                        {Number.isNaN(s.averageAssembliesPerHour)
                                            ? 'Sin datos'
                                            : s.averageAssembliesPerHour.toFixed(2)}
                                    </Text>
                                </Box>
                                <Box mt={6}>
                                    <Text fontSize={'18px'}>
                                        <b>Ensambles por hora</b>
                                    </Text>
                                    <UnorderedList>
                                        {Object.entries(s.assembliesQuantPerHour).map(
                                            ([hora, cantidad], i) => (
                                                <ListItem key={i}>
                                                    {hora}° hora: {cantidad} ensambles.
                                                </ListItem>
                                            ),
                                        )}
                                    </UnorderedList>
                                </Box>

                                <Box mt={6}>
                                    <Text fontSize={'18px'}>
                                        <b>Objetos en cola</b>
                                    </Text>
                                    <QueuesShower queues={s.queues} />
                                </Box>
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
}
