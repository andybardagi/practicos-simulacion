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
    const [stats, setStats] = useState<BakeryStats>();

    useEffect(() => {
        setIsValid(form.n != '' && !isNaN(Number(form.n)) && Number(form.n) > 20);
    }, [form.n]);

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((f) => ({ ...f, [name]: value }));
    };
    const coordinator = useRef<Coordinator>();
    const handleSimulate = () => {
        coordinator.current = new Coordinator(0.2, Number(form.n));
        coordinator.current.simulateUntilFinish();
        setStats(coordinator.current.getStats());
    };

    return (
        <Box p={4} w="100%">
            <Heading>Trabajo Práctico 7 - Andrés Bardagí Inchaurrondo (86069)</Heading>
            <Box border="1px solid #efefef" borderRadius={8} p={4}>
                <Consignas />
            </Box>
            <Box border="1px solid #efefef" borderRadius={8} p={4} my={2}>
                <InputGroup>
                    <InputLeftAddon>N</InputLeftAddon>
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
                    <Button colorScheme="facebook" disabled={!isValid}>
                        Simular 1
                    </Button>
                    <Button colorScheme="linkedin" disabled={!isValid} onClick={handleSimulate}>
                        Simular {form.n}
                    </Button>
                </Flex>
            </Box>
            {stats != null ? (
                <Flex border="1px solid #efefef" borderRadius={8} my={2} height="500px">
                    <Center width="50px" height={'100%'} _hover={{ bgColor: '#dfdfdf' }}>
                        <ArrowLeftIcon />{' '}
                    </Center>
                    <Box w={'100%'}>
                        <BakeryStatShower stats={stats} />
                    </Box>
                    <Center width="50px" height={'100%'} _hover={{ bgColor: '#dfdfdf' }}>
                        <ArrowRightIcon />
                    </Center>
                </Flex>
            ) : null}
        </Box>
    );
}
