import { Box, ListItem, UnorderedList, Text } from '@chakra-ui/react';
import React from 'react';
import { tp5StatsType } from '../../simulation/tp5/types/stats.type';

export default function TP5StatsShower({ stats }: { stats: tp5StatsType }) {
    return (
        <Box>
            <UnorderedList>
                <ListItem>
                    <Text>
                        <b>Duración promedio de la tarea de ensamble:</b>{' '}
                        {stats.averageAssemblyDuration}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Proporción de ensambles realizados:</b> {stats.realizedAssembliesRatio}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Cola 1</b> {' '}
                        <UnorderedList>
                            <ListItem>
                                <Text>
                                Cantidad máxima: {stats.maxQueueQuantByServer[1]}
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                Tiempo promedio: {stats.queueAverageTimes[1]}
                                </Text>
                            </ListItem>
                        </UnorderedList>  
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Cola 2</b> {' '}
                        <UnorderedList>
                            <ListItem>
                                <Text>
                                Cantidad máxima: {stats.maxQueueQuantByServer[2]}
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                Tiempo promedio: {stats.queueAverageTimes[2]}
                                </Text>
                            </ListItem>
                        </UnorderedList>  
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Cola 3</b> {' '}
                        <UnorderedList>
                            <ListItem>
                                <Text>
                                Cantidad máxima: {stats.maxQueueQuantByServer[3]}
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                Tiempo promedio: {stats.queueAverageTimes[3]}
                                </Text>
                            </ListItem>
                        </UnorderedList>  
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Cola 4</b> {' '}
                        <UnorderedList>
                            <ListItem>
                                <Text>
                                Cantidad máxima: {stats.maxQueueQuantByServer[4]}
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                Tiempo promedio: {stats.queueAverageTimes[4]}
                                </Text>
                            </ListItem>
                        </UnorderedList>  
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Cola 5</b> {' '}
                        <UnorderedList>
                            <ListItem>
                                <Text>
                                Cantidad máxima: {stats.maxQueueQuantByServer[5]}
                                </Text>
                            </ListItem>
                            <ListItem>
                                <Text>
                                Tiempo promedio: {stats.queueAverageTimes[5]}
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
                        {stats.averageAssembliesPerHour}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Probabilidad de haber completado 3 o más ensambles por hora:</b>{' '}
                        {stats.pGreaterOrEqualThan3}
                    </Text>
                </ListItem>
            </UnorderedList>
        </Box>
    );
}
