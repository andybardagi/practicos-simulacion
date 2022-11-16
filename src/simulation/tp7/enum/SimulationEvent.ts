import { SlideProps } from "@chakra-ui/react";
import { RungeKuta } from "../RungeKuta";
import { Silo } from "../Silo";
import { Truck } from "../Truck";

export enum EventType {
    finishDischarge = "Fin de descarga",
    truckArrive = "Llegada de camión",
    useSilo = "Uso se silo",
    inicio = "Inicio"
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
    cant: number;
    rk: RungeKuta;
};

type useSilo  = {
    type: EventType.useSilo;
    time: number;
    silo: Silo;
};

type inicio = {
    type: EventType.inicio;
    time: number;
};

export type SimulationEvent = truckArrive | finishDischarge | useSilo;
