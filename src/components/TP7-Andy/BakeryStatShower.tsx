import { RepeatClockIcon, TimeIcon } from '@chakra-ui/icons';
import { Box, Text, Flex, VStack, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { EventEnumToName } from '../../simulation/tp7-andy/helpers/helpersBakery';
import { BakeryStats } from '../../simulation/tp7-andy/types/bakeryStatsType';
import { BakeryEventType } from '../../simulation/tp7-andy/types/BakeryEvents';
import QueueFlow from '../TP5/QueueFlow';

export default function BakeryStatShower({ stats }: { stats: BakeryStats }) {
    return (
        <Box p={4}>
            <Flex direction={'row'} justifyContent="space-between">
                <Flex alignItems={'center'} gap={2}>
                    <TimeIcon />
                    <Text>
                        {stats.clock.toFixed(2)} = {(stats.clock / 60).toFixed(0)} minutos y {(stats.clock % 60).toFixed(0)} segundos aproximadamente
                    </Text>
                </Flex>
                <Text>
                    <b>Evento N°</b> {stats.roundsSimulated}
                </Text>
            </Flex>
            <VStack border={'1px solid #eeeeee'} bgColor="#12ADC111" py={4} mb={4}>
                <Box>
                    <Text fontSize={'xl'}>
                        <b> Panadería</b>
                    </Text>
                </Box>
                <Flex w="100%" justifyContent={'space-around'}>
                    {[1, 2].map((n) => (
                        <Box
                            py={4}
                            px={16}
                            boxSizing={'border-box'}
                            width={'30%'}
                            borderRadius={8}
                            bgColor={stats.employees[n].isFree ? '#22ff2255' : '#ff223355'}
                        >
                            <Text textAlign={'center'}>Empleado {n}</Text>
                            <Text textAlign={'center'} fontSize="sm">
                                {stats.employees[n].isFree ? 'Libre' : 'Ocupado'}
                            </Text>
                            {!stats.employees[n].isFree ? (
                                <Text textAlign={'center'}>
                                    {' '}
                                    <br /> Atendiendo a {stats.employees[n].currentClient}
                                </Text>
                            ) : null}
                        </Box>
                    ))}
                </Flex>
            </VStack>
            <Text>
                {' '}
                <b>Productos en stock:</b> {stats.currentProductStock}
            </Text>

            <Text mt={4}>
                <b>Clientes que llegaron:</b> {stats.clientsCounters.arrived}
            </Text>
            <Text>
                <b>Clientes satisfechos: </b>
                {stats.clientsCounters.served}
            </Text>
            <Text>
                <b>Clientes perdidos:</b>{' '}
                {stats.clientsCounters.arrived - stats.clientsCounters.served}
            </Text>
            <Box>
                <Text mt={4}>
                    {' '}
                    <b>Eventos pendientes</b>
                </Text>
                <UnorderedList>
                    {stats.pendingEvents.map((e) => (
                        <Box p={2} _hover={{ bgColor: '#dedede' }}>
                            <Flex alignItems={'center'}>
                                <TimeIcon me={2} />
                                <Text>
                                    {e.time.toFixed(2)} - {EventEnumToName(e.eventType)}
                                </Text>
                            </Flex>
                            {e.eventType === BakeryEventType.clientExit ? (
                                <Text>Empleado que lo atiende: {e.employee}</Text>
                            ) : null}
                            {e.eventType == BakeryEventType.furnaceFinish ||
                            e.eventType == BakeryEventType.furnaceStart ? (
                                <Text>Cantidad de productos al horno: {e.quantity}</Text>
                            ) : null}
                        </Box>
                    ))}
                </UnorderedList>
            </Box>
        </Box>
    );
}
