import { Box, ListItem } from '@chakra-ui/react';
import React from 'react';
import { BakeEvent, EventsType } from '../../simulation/tp7/types/Events';

type Props = {
    event: BakeEvent;
};
export default function EventShower({ event }: Props) {
    if (event.eventType === EventsType.customerArrive)
        return (
            <ListItem>
                {event.time.toFixed(2)} - Llegada cliente
            </ListItem>
        );
    if (event.eventType === EventsType.customerExit) {
        return (
            <ListItem>
                {event.time.toFixed(2)} - Retirada cliente - Empleado #{event.worker}
            </ListItem>
        );
    }
    if (event.eventType === EventsType.ovenFinish) {
        return (
            <ListItem>
                {event.time.toFixed(2)} - Apagado de horno - Cantidad de productos: {event.quantity}
            </ListItem>
        );
    }
    if (event.eventType === EventsType.ovenStart) {
        return (
            <ListItem>
                {event.time.toFixed(2)} - Encendido de horno - Cantidad de productos: {event.quantity}
            </ListItem>
        );
    }
    return <Box>Mal evento</Box>;
}
