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
import { Stats } from '../../simulation/tp7/types/Stats';
import EventShower from './EventShower';
import TP7StatsShower from './TP7StatsShower';

export default function TP7StateVectorShower({ stats }: { stats: Stats[] }) {
    return (
        <Box mb={16}>
            <Accordion defaultIndex={[0]} allowMultiple>
                {stats.map((s, i) => (
                    <AccordionItem key={i}>
                        <h2>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                    <Flex justifyContent={'space-between'}>
                                        <Text>
                                            <b>Reloj de simulación:</b> {s.clock.toFixed(2)}{' '}
                                            segundos - {(s.clock / 60).toFixed(2)} minutos
                                        </Text>
                                    </Flex>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <Box bgColor={'#C4F1F9'} p={6}>
                                <Text>
                                    <b>Eventos pendientes</b>
                                </Text>
                            <UnorderedList>
                                {s.pendingEvents.map((e, i) => (
                                    <EventShower event={e} key={i} />
                                ))}
                            </UnorderedList>
                            </Box>
                            <Box>
                                {
                                    <Box py={4}>
                                        <Text fontSize={'18px'}>
                                            <b>Estadísticas parciales</b>
                                        </Text>
                                        <TP7StatsShower stats={s}></TP7StatsShower>
                                    </Box>
                                }
                            </Box>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
}
