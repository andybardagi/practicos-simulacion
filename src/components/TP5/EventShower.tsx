import { Box, ListItem } from '@chakra-ui/react';
import React from 'react';
import { EventType, SimulationEvent } from '../../simulation/tp5/enum/SimulationEvent';

type Props = {
    event: SimulationEvent;
};
export default function EventShower({ event }: Props) {
    if (event.type === EventType.finishTask)
        return (
            <ListItem>
                {event.time.toFixed(2)} - Finalización servidor #{event.server}
            </ListItem>
        );
    if (event.type === EventType.orderArrive) {
        return (
            <ListItem>
                {event.time.toFixed(2)} - Llegada de ordenes - Cantidad: {event.orderQuantity}
            </ListItem>
        );
    }
    return <Box>Mal evento</Box>;
}
