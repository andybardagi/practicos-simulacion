import { SlideProps } from "@chakra-ui/react";
import { Silo } from "../Silo";
import { Truck } from "../Truck";

export enum EventType {
    finishDischarge = "Fin de descarga",
    truckArrive = "Llegada de camión",
    useSilo = "Uso se silo",
}

type truckArrive = {
    type: EventType.truckArrive;
    time: number;
    truck: Truck;
};

type finishDischarge  = {
    type: EventType.finishDischarge;
    time: number;
    silo: Silo;
    cant: number,
};

type useSilo  = {
    type: EventType.useSilo;
    time: number;
    silo: Silo;
};

export type SimulationEvent = truckArrive | finishDischarge | useSilo;
