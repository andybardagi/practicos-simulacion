import {
    Box,
    Button,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    ListItem,
    Text,
    UnorderedList,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { Coordinator } from '../../../simulation/tp7/juani/Coordinator';
import { stateVector } from '../../../simulation/tp7/juani/types/stateVector.type';
import { tp7StatsType } from '../../../simulation/tp7/juani/types/stats.type';
import { activities } from '../../TP7/Juani/ConsignasTP7-Juani';
import QueueFlow from './QueueFlow';
import JuaniStateVectorShower from './JuaniStateVectorShower';
import TP7StatsShower from './JuaniStatsShower';
import { Flex } from '@chakra-ui/react';
import { RungeKutaServer } from '../../../simulation/tp7/juani/ConcreteServer/RungeKutaServer';
import { Servers } from '../../../simulation/tp7/juani/enum/Servers';

export default function Juani() {
    const coordinator = useRef<Coordinator>();
    const [flagSim, setFlagSim] = useState(false);
    const [stats, setStats] = useState<tp7StatsType>();
    const [form, setForm] = useState({
        cant: '10000',
        h: '0,05',
        x_0: '100',
    });
    const [stateVector, setStateVector] = useState<stateVector[]>();

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFlagSim(false);
        setStats(undefined);
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    };

    const simulate = () => {
        coordinator.current = new Coordinator();

        const isIncorrect =
            Object.values(form)
                .map((v) => v.replace(',', '.'))
                .map((v) => Number(v))
                .filter((v) => Number.isNaN(v)).length > 0;
        console.log(
            Object.values(form)
                .map((v) => v.replace(',', '.'))
                .map((v) => Number(v)),
        );
        if (isIncorrect) {
            alert('Error en los valores ingresados');
            return;
        }
        coordinator.current.setRungeServer(
            0,
            Number(form.x_0.replace(',', '.')),
            Number(form.h.replace(',', '.')),
        );
        const res = coordinator.current.simulate(Number(form.cant));
        setFlagSim(true);
        setStats(res);
        setStateVector(coordinator.current.getStateVector());
    };

    return (
        <Box p={4} w="100%">
            <Heading>Trabajo Práctico 6</Heading>
            <Box border="1px solid #efefef" borderRadius={8} p={4}>
                <Text color="#444444">
                    
                </Text>
                <Text color="#444444">
                    
                </Text>
                <Text color="#444444">
                    Al momento de inicio no hay ningún proceso realizado, incompleto ni pendiente y
                    tampoco hay productos en cola. Los servidores están libres
                </Text>
                <Box mx="auto" w="fit-content" my={4}>
                    <Text color="#444444" mb={2}>
                        Diagrama de precedencia de actividades
                    </Text>
                    <QueueFlow />
                </Box>
                <UnorderedList mb={2}>
                    {activities.map((a, i) => (
                        <ListItem key={i}>
                            <Text color="#444444">{a} </Text>
                        </ListItem>
                    ))}
                </UnorderedList>
                <Text color="#444444">
                   
                </Text>
                <Text color="#444444">
                    
                </Text>             
            </Box>
            <Flex direction={['column', 'column', 'row', 'row']} gap="2" my={2}>
                <InputGroup>
                    <InputLeftAddon>n</InputLeftAddon>
                    <Input value={form.cant} onChange={handleFormChange} name="cant"></Input>
                </InputGroup>
                <InputGroup>
                    <InputLeftAddon>h</InputLeftAddon>
                    <Input value={form.h} onChange={handleFormChange} name="h"></Input>
                </InputGroup>
                <InputGroup>
                    <InputLeftAddon>
                        y
                    </InputLeftAddon>
                    <Input value={form.x_0} onChange={handleFormChange} name="x_0"></Input>
                </InputGroup>                
            </Flex>

            <Box>
                <Button colorScheme={'linkedin'} onClick={simulate} mt={3} mb={3}>
                    Simular {form.cant} lavados
                </Button>
            </Box>
            {flagSim && stateVector ? <JuaniStateVectorShower stateVectors={stateVector} /> : null}
            {flagSim && stats ? <TP7StatsShower stats={stats} /> : null}
        </Box>
    );
}
