import { RepeatClockIcon, TimeIcon } from '@chakra-ui/icons';
import { Box, Text, Flex, VStack, UnorderedList, Tooltip, Circle } from '@chakra-ui/react';
import React, { useState } from 'react';
import { EventEnumToName } from '../../simulation/tp7-andy/helpers/helpersBakery';
import { BakeryStats } from '../../simulation/tp7-andy/types/bakeryStatsType';
import { BakeryEventType } from '../../simulation/tp7-andy/types/BakeryEvents';
import { useEffect } from 'react';

export default function BakeryStatShower({ stats }: { stats: BakeryStats }) {
    const toMinutesAndSeconds = (ms: number): string => {
        const minutes = Math.floor(ms / 60);
        const seconds = (ms % 60);
        if (seconds < 10) {
            return `${minutes}m 0${seconds.toFixed(0)}s aprox`;
        }
        return `${minutes}m ${seconds.toFixed(0)}s aprox`;
    };

    const [effectivity, setEffectivity] = useState(0);

    const calculateEffectivityPercentage = (st: BakeryStats) => {
        const num = st.clientsCounters.left 
        let div = st.clientsCounters.arrived;
        div -= st.employees[1].currentClient != null ? 1 : 0;
        div -= st.employees[2].currentClient != null ? 1 : 0;
        if (div <= 0){
            return 0;
        }
        return (num / div) * 100;
    }

    return (
        <Box p={4}>
            <Flex direction={'row'} justifyContent="space-between">
                <Flex alignItems={'center'} gap={2}>
                    <TimeIcon />
                    <Text>
                        {stats.clock.toFixed(2)} = {toMinutesAndSeconds(stats.clock)}
                    </Text>
                </Flex>
                <Text>
                    <b>Evento N°</b> {stats.roundsSimulated}
                </Text>
            </Flex>
            <VStack border={'1px solid #eeeeee'} bgColor="#12ADC111" pt={4} mb={4}>
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
                                    <br /> Desea {stats.employees[n].wantedProducts} productos
                                </Text>
                            ) : null}
                        </Box>
                    ))}
                </Flex>
                <Box bg={"#12ADC1"} w="100%" p={4}>
                    <Text fontSize={'large'} textAlign={"center"} color="white">Cola de clientes</Text>
                    <Flex dir='row' gap={2}>
                        {stats.queue.map((client, i) => (
                            <Circle size={20} key={i} bg={"white"}>
                                <Text textAlign={'center'}> {client.name}</Text>
                            </Circle>
                        ))}
                    </Flex>

                </Box>
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
                <b>Clientes perdidos:</b> {stats.clientsCounters.left}
            </Text>
            <Text my={2} fontSize="large">
                <b>% de clientes perdidos por no tener stock:</b> {calculateEffectivityPercentage(stats).toFixed(2)}%
            </Text>
            <Box>
                <Text mt={4}>
                    {' '}
                    <b>Eventos pendientes</b>
                </Text>
                <UnorderedList>
                    {stats.pendingEvents.map((e, i) => (
                        <Tooltip key={i} label={e.time}>
                            <Box p={2} _hover={{ bgColor: '#dedede' }}>
                                <Flex alignItems={'center'}>
                                    <TimeIcon me={2} />
                                    <Text>
                                        {toMinutesAndSeconds(e.time)} -{' '}
                                        {EventEnumToName(e.eventType)}
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
                        </Tooltip>
                    ))}
                </UnorderedList>
            </Box>
        </Box>
    );
}
