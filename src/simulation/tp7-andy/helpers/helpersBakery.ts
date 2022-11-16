import { BakeryEventType } from '../types/BakeryEvents';
export function EventEnumToName(e: BakeryEventType): string {
    switch (e) {
        case BakeryEventType.clientArrive:
            return 'Llegada de cliente';
        case BakeryEventType.clientExit:
            return 'Salida de cliente';
        case BakeryEventType.furnaceFinish:
            return 'Finalización de horno';
        case BakeryEventType.furnaceStart:
            return 'Inicio de horno';
    }
}
