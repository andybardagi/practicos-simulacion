import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    Text,
} from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import Consignas from './Consignas';
import { Coordinator } from '../../simulation/tp7-andy/Coordinator';
import { BakeryStats } from '../../simulation/tp7-andy/types/bakeryStatsType';
import BakeryStatShower from './BakeryStatShower';

export default function TP7Andy() {
    const [form, setForm] = useState({
        n: '10000',
    });

    const [isValid, setIsValid] = useState(true);
    const [stats, setStats] = useState<BakeryStats[]>([]);
    const [currentStat, setCurrentStat] = useState(0);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        setIsValid(form.n != '' && !isNaN(Number(form.n)) && Number(form.n) > 20);
    }, [form.n]);

    useEffect(() => {
        setCurrentStat(stats.length - 1);
    }, [stats]);

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleClear = () => {
        setForm({ n: '10000' });
        setStats([]);
        setCurrentStat(0);
        setFlag(false);
    };

    const handleCurrentChange = (n: number) => {
        if (currentStat + n < 0 || currentStat + n >= stats.length) return;
        setCurrentStat(currentStat + n);
    };

    const coordinator = useRef<Coordinator>();
    const handleSimulate = (finish: boolean) => {
        if (!flag) {
            coordinator.current = new Coordinator(0.2, Number(form.n));
            setStats([]);
        }
        if (coordinator.current == null) return;

        if (finish) {
            coordinator.current.simulateUntilFinish();
        } else {
            coordinator.current.simulateEvents(1);
        }

        const thisStats = coordinator.current.getStats();
        setStats((s) => [...s, thisStats]);
        setFlag(true);
    };

    return (
        <Box p={4} w="100%">
            <Heading>Trabajo Práctico 7 - Andrés Bardagí Inchaurrondo (86069)</Heading>
            <Box border="1px solid #efefef" borderRadius={8} p={4}>
                <Consignas />
            </Box>
            <Box border="1px solid #efefef" borderRadius={8} p={4} my={2}>
                <InputGroup>
                    <InputLeftAddon>Eventos a simular</InputLeftAddon>
                    <Input
                        placeholder="Cantidad de eventos"
                        name="n"
                        onChange={handleFormChange}
                        isInvalid={isNaN(Number(form.n))}
                        value={form.n}
                    ></Input>
                </InputGroup>
                <Text color={'#777777'} fontSize="small">
                    Debe ingresar un número mayor a 20
                </Text>
                <Flex justifyContent={'end'} mt={2} gap={4}>
                    <Button colorScheme="orange" onClick={() => handleClear()}>
                        Limpiar
                    </Button>
                    <Button
                        colorScheme="facebook"
                        disabled={!isValid}
                        onClick={() => handleSimulate(false)}
                    >
                        Simular 1
                    </Button>
                    <Button
                        colorScheme="linkedin"
                        disabled={!isValid}
                        onClick={() => handleSimulate(true)}
                    >
                        Simular hasta {form.n}
                    </Button>
                </Flex>
            </Box>
            {stats[currentStat] != null ? (
                <Flex border="1px solid #efefef" borderRadius={8} my={2} alignItems="stretch">
                    <Center
                        width="50px"
                        _hover={{ bgColor: '#dfdfdf' }}
                        onClick={() => handleCurrentChange(-1)}
                    >
                        <ArrowLeftIcon />{' '}
                    </Center>
                    <Box w={'100%'}>
                        <BakeryStatShower stats={stats[currentStat]} />
                    </Box>
                    <Center
                        width="50px"
                        _hover={{ bgColor: '#dfdfdf' }}
                        onClick={() => handleCurrentChange(1)}
                    >
                        <ArrowRightIcon />
                    </Center>
                </Flex>
            ) : null}
        </Box>
    );
}
