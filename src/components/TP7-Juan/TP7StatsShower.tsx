import { Box, ListItem, UnorderedList, Text } from '@chakra-ui/react';
import React from 'react';
import { Stats } from '../../simulation/tp7/types/Stats';

export default function TP7StatsShower({ stats }: { stats: Stats }) {
    return (
        <Box>
            <UnorderedList>
                <ListItem>
                    <Text>
                        <b>Contadores de clientes:</b>{' '}
                    </Text>
                    <UnorderedList>
                        <ListItem>
                            <Text>Clientes que llegaron: {stats.customersCount.arrived}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Clientes atendidos: {stats.customersCount.attended}</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Clientes que se fueron: {stats.customersCount.gone}</Text>
                        </ListItem>
                    </UnorderedList>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Stock actual:</b> {stats.actualStock}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Porcentaje de clientes que se fueron:</b> {stats.percenteageGone} %
                    </Text>
                </ListItem>
                <ListItem>
                    <Box mt={6}>
                        <Text fontSize={'16px'}>
                            <b>Clientes en cola</b>
                        </Text>
                    </Box>
                    <UnorderedList>
                        {stats.queue.map((s, i) => (
                            <ListItem key={i}>
                                <Text>
                                    {s.name} - Cantidad solicitada: {s.quantity}
                                </Text>
                            </ListItem>
                        ))}
                    </UnorderedList>
                </ListItem>
                <ListItem>
                    <Text mt={6}>
                        <b>Empleado 1:</b>{' '}
                        {stats.workers[1].isVacant
                            ? 'Libre'
                            : `${stats.workers[1].currentCustomer} - Cantidad solicitada: ${stats.workers[1].unitiesToBuy}`}
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <b>Empleado 2:</b>{' '}
                        {stats.workers[2].isVacant
                            ? 'Libre'
                            : `${stats.workers[2].currentCustomer} - Cantidad solicitada: ${stats.workers[2].unitiesToBuy}`}
                    </Text>
                </ListItem>
            </UnorderedList>
        </Box>
    );
}
