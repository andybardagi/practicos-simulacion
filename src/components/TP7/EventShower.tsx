import { Box, ListItem } from '@chakra-ui/react';
import React from 'react';
import { EventType, SimulationEvent } from '../../simulation/tp7/enum/SimulationEvent';

type Props = {
    event: SimulationEvent;
};
export default function EventShower({ event }: Props) {
    if (event.type === EventType.finishDischarge)
        return (
            <ListItem>
                {event.time.toFixed(2)} - Finalización descarga de {event.cant} Tn en el silo {event.silo.getId()}
            </ListItem>
        );
    if (event.type === EventType.truckArrive) {
        return (
            <ListItem>
                {event.time.toFixed(2)} - Llegada de camion - Cantidad: {event.truck.getQuantity()} Tn
            </ListItem>
        );
    }
    if (event.type === EventType.useSilo) {
        return (
            <ListItem>
                {event.time.toFixed(2)} - Se consumio 1/2 Tn del silo {event.silo.getId()}
            </ListItem>
        );
    }
    return <Box>Mal evento</Box>;
}
