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
import { stateVector } from '../../simulation/tp6/types/stateVector.type';
import EventShower from './EventShower';
import QueuesShower from './QueuesShower';
import TP6StatsShower from './TP6StatsShower';

export default function TP6StateVectorShower({ stateVectors }: { stateVectors: stateVector[] }) {
    return (
        <Box mb={16}>
            <Accordion defaultIndex={[0]} allowMultiple>
                {stateVectors.map((s, i) => (
                    <AccordionItem>
                        <AccordionPanel pb={4}>
                            <Box>
                                {/* <Box p={8} bgColor="cyan.100" borderRadius={4}>
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
                                    <TP6StatsShower stats={s}></TP6StatsShower>
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
                                </Box> */}
                                <Box mt={6}>
                                    <Text fontSize={'18px'}>
                                        <b>Objetos en cola</b>
                                    </Text>
                                    <QueuesShower queues={s.queues} current={s.current}/>
                                </Box>
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
}
