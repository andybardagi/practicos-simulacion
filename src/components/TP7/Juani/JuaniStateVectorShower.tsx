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
import { Servers } from '../../../simulation/tp7/juani/enum/Servers';
import { stateVector } from '../../../simulation/tp7/juani/types/stateVector.type';
import EventShower from './EventShower';
import QueuesShower from './QueuesShower';
import JuaniStatsShower from './JuaniStatsShower';
import RungeKuttaEvolution from './RungeKuttaEvolution';

export default function JuaniStateVectorShower({ stateVectors }: { stateVectors: stateVector[] }) {
    return (
        <Box mb={16}>
            <Accordion defaultIndex={[0]} allowMultiple>
                {stateVectors.map((s, i) => (
                    <AccordionItem key={i}>
                        <h2>
                            <AccordionButton bgColor={s.rungeKuttaEvolution.length > 0 ? "#00FFFF66" : ""}>
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
                                <Box py={4}>
                                    <Text fontSize={'18px'}>
                                        <b>Estadísticas parciales</b>
                                    </Text>
                                    <JuaniStatsShower stats={s}></JuaniStatsShower>
                                </Box>
                                <Box mt={6}>
                                    <Text fontSize={'18px'}>
                                        <b>Objetos en cola</b>
                                    </Text>
                                    <QueuesShower queues={s.queues} current={s.current}/>
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
                                                Servidor 3A:{' '}
                                                {(
                                                    s.serversOccupation[Servers.server3] * 100
                                                ).toFixed(4)}
                                                %
                                            </Text>
                                        </ListItem>
                                        <ListItem>
                                            <Text>
                                                Servidor 3B:{' '}
                                                {(
                                                    s.serversOccupation[Servers.server32] * 100
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
