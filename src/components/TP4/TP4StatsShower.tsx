import { Box, ListItem, UnorderedList, Text } from '@chakra-ui/react';
import React from 'react';
import { tp4StatsType } from '../../simulation/tp4/types/stats.type';

export default function TP4StatsShower({ stats }: { stats: tp4StatsType }) {
    return (
        <Box>
            <UnorderedList>
                <ListItem>
                    <Text>
                        <b>Duración promedio de la tarea de ensamble:</b> {stats.averageDuration}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Máxima duración de la tarea de ensamble:</b> {stats.maxDuration}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Mínima duración de la tarea de ensamble:</b> {stats.minDuration}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Probabilidad de terminar la tarea de ensamble en 45 días:</b>{' '}
                        {stats.pLess45}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>El 90% de las tareas simuladas termina antes del día:</b> {stats.trust90}
                    </Text>
                </ListItem>
            </UnorderedList>
        </Box>
    );
}
