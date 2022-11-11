import { Box, ListItem, UnorderedList, Text } from '@chakra-ui/react';
import React from 'react';
import { tp7StatsType } from '../../simulation/tp7-juani/types/stats.type';

export default function TP7StatsShower({ stats }: { stats: tp7StatsType }) {
    return (
        <Box>
            <UnorderedList>
                <ListItem>
                    <Text>
                        <b>Duración promedio de la tarea de ensamble:</b>{' '}
                        {Number.isNaN(stats.averageAssemblyDuration)
                            ? 'Sin datos'
                            : stats.averageAssemblyDuration}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Proporción de ensambles realizados:</b>{' '}
                        {Number.isNaN(stats.realizedAssembliesRatio)
                            ? 'Sin datos'
                            : stats.realizedAssembliesRatio}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Cola 1</b>{' '}
                        <UnorderedList>
                            <ListItem>
                                <Text>Cantidad máxima: {stats.maxQueueQuantByServer[1]}</Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                    Tiempo promedio:{' '}
                                    {Number.isNaN(stats.queueAverageTimes[1])
                                        ? 'Sin datos'
                                        : stats.queueAverageTimes[1]}
                                </Text>
                            </ListItem>
                        </UnorderedList>
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Cola 2</b>{' '}
                        <UnorderedList>
                            <ListItem>
                                <Text>Cantidad máxima: {stats.maxQueueQuantByServer[2]}</Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                    Tiempo promedio:{' '}
                                    {Number.isNaN(stats.queueAverageTimes[2])
                                        ? 'Sin datos'
                                        : stats.queueAverageTimes[2]}
                                </Text>
                            </ListItem>
                        </UnorderedList>
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Cola 3</b>{' '}
                        <UnorderedList>
                            <ListItem>
                                <Text>Cantidad máxima: {stats.maxQueueQuantByServer[3]}</Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                    Tiempo promedio:{' '}
                                    {Number.isNaN(stats.queueAverageTimes[3])
                                        ? 'Sin datos'
                                        : stats.queueAverageTimes[3]}
                                </Text>
                            </ListItem>
                        </UnorderedList>
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Cola 4</b>{' '}
                        <UnorderedList>
                            <ListItem>
                                <Text>Cantidad máxima: {stats.maxQueueQuantByServer[4]}</Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                    Tiempo promedio:{' '}
                                    {Number.isNaN(stats.queueAverageTimes[4])
                                        ? 'Sin datos'
                                        : stats.queueAverageTimes[4]}
                                </Text>
                            </ListItem>
                        </UnorderedList>
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Cola 5</b>{' '}
                        <UnorderedList>
                            <ListItem>
                                <Text>Cantidad máxima: {stats.maxQueueQuantByServer[5]}</Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                    Tiempo promedio:{' '}
                                    {Number.isNaN(stats.queueAverageTimes[5])
                                        ? 'Sin datos'
                                        : stats.queueAverageTimes[5]}
                                </Text>
                            </ListItem>
                        </UnorderedList>
                    </Text>
                </ListItem>
                {/* <ListItem>
                    <Text>
                        <b>Cantidad de ensambles por hora:</b> {stats.assembliesQuantPerHour}
                    </Text>
                </ListItem> */}
                <ListItem>
                    <Text>
                        <b>Cantidad promedio de ensambles por hora:</b>{' '}
                        {Number.isNaN(stats.averageAssembliesPerHour)
                            ? 'Sin datos'
                            : stats.averageAssembliesPerHour}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Probabilidad de haber completado 3 o más ensambles por hora:</b>{' '}
                        {stats.pGreaterOrEqualThan3}
                    </Text>
                </ListItem>
            </UnorderedList>
            <Box mt={6}>
                <Text fontSize={'18px'}>
                    <b>Ensambles por hora</b>
                </Text>
                <UnorderedList>
                    {Object.entries(stats.assembliesQuantPerHour).map(([hora, cantidad], i) => (
                        <ListItem key={i}>
                            {hora}° hora: {cantidad} ensambles.
                        </ListItem>
                    ))}
                </UnorderedList>
            </Box>
        </Box>
    );
}
