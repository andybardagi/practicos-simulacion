import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    ListItem,
    Switch,
    Text,
    Tooltip,
    UnorderedList,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { ActivityCoordinator } from '../../simulation/tp4/handlers/ActivityCoordinator';
import { IntervalStatType } from '../../simulation/tp4/types/intervalStat.type';
import { tp4StatsType } from '../../simulation/tp4/types/stats.type';
import ErrorBox from '../ErrorBox';
import LineEvolution from '../LineEvolution';
import ActivityFlow from './ActivityFlow';
import TableIntervalStat from './TableIntervalStat';
import TP4StatsShower from './TP4StatsShower';
import { tp4FormSchema } from './form.schema';
import StateVectorTP4Shower from './StateVectorTP4Shower';

export default function TP4() {
    const consignas = [
        'Identifique las variables que deben ser definidas para el análisis',
        'Cómo se calcularia la duración de la tarea de ensamble',
        'Cuál es el tiempo promedio de duración de la tarea de ensamble',
        'Grafique la evolucion del tiempo promedio de duración anterior',
        'Identificar máximos y mínimos simulados de los valores de la duración mínima de la tarea de ensamble',
        'Indique cual es la probabilidad de haber completado la tarea de ensamble en 45 días',
        'Cuál es la fecha a fijar si se busca un nivel de confianza del 90% de terminar en esa fecha o antes',
        'Cuál es la fecha a fijar si se busca un nivel de confianza del 90% de terminar en esa fecha o antes. En base a las 14 simulaciones iniciales identifique 15 intervalos de frecuencia.',
    ];

    const activities = [
        'A1 - Distribución uniforme U [20, 30)',
        'A2 - Distribución uniforme U [30, 50)',
        'A3 - Distribución exponencial con media de 30',
        'A4 - Distribución uniforme U [10, 20)',
        'A5 - Distribución exponencial con media de 5',
    ];

    const activityHandler = useRef(new ActivityCoordinator(0, Infinity));
    const [form, setForm] = useState({ n: '10000', min: '1', max: '100' });
    const [flagSim, setFlagSim] = useState(false);
    const [flagGraph, setFlagGraph] = useState(true);
    const [error, setError] = useState({ isError: false, msg: [''] });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFlagSim(false);
        setError((p) => ({ ...p, isError: false }));
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    };
    const [stats, setStats] = useState({} as tp4StatsType);
    const [statsInterval, setStatsInterval] = useState([] as IntervalStatType[]);

    const simulate = () => {
        tp4FormSchema
            .validate(form, { abortEarly: false })
            .then(() => {
                if (Number(form.max) - Number(form.min) > 100) {
                    setError({
                        isError: true,
                        msg: ['La cantidad de vectores de estado no debe ser mayor a 100'],
                    });
                    return;
                }

                setFlagSim(true);
                activityHandler.current = new ActivityCoordinator(
                    Number(form.min),
                    Number(form.max),
                );
                activityHandler.current.simulateManyTasks(parseInt(form.n));
                const res = activityHandler.current.getStats();
                res.averageEvolution = !flagGraph
                    ? res.averageEvolution
                    : res.averageEvolution.slice(0, 1000);
                setStats(res);
                setStatsInterval(activityHandler.current.getIntervalStats());
            })
            .catch((err) => {
                console.log('a');
                console.log(err.inner.map((i: { path: string; message: string }) => i.message));
                setError({
                    isError: true,
                    msg: err.inner.map((i: { path: string; message: string }) => i.message),
                });
            });
    };

    return (
        <Box p={4} w="100%">
            <Heading>Trabajo Práctico 4</Heading>
            <Box border="1px solid #efefef" borderRadius={8} p={4}>
                <Text color="#444444">
                    Simule el siguiente proyecto en red y luego responda las siguientes preguntas
                </Text>
                <Box mx="auto" w="fit-content" my={4}>
                    <Text color="#444444" mb={2}>
                        Diagrama de precedencia de actividades
                    </Text>
                    <ActivityFlow />
                </Box>
                <UnorderedList mb={2}>
                    {activities.map((a, i) => (
                        <ListItem>
                            <Text color="#444444">{a} </Text>
                        </ListItem>
                    ))}
                </UnorderedList>
                <Text color="#444444">
                    Llamaremos <b>duración de la tarea de ensamble</b> al "tiempo mínimo" en que
                    puede completarse dicha tarea.
                </Text>
                <Text color="#444444">
                    <b>
                        Se considera completada la tarea de ensamble cuando completamos las 5
                        actividades considerando sus precedencias
                    </b>
                </Text>
                <UnorderedList>
                    {consignas.map((c, i) => (
                        <ListItem key={i}>
                            <Text color="#444444">{c}</Text>
                        </ListItem>
                    ))}
                </UnorderedList>
            </Box>

            <Box border="1px solid #efefef" borderRadius={8} p={4} mt={4}>
                <Text size="md">Límites de muestreo de vector de estados</Text>
                <Flex my={2} gap={2} direction={['column', 'column', 'row', 'row']}>
                    <InputGroup>
                        <InputLeftAddon>
                            <Tooltip label="Limite inferior para guardado de vector de estado">
                                Min
                            </Tooltip>
                        </InputLeftAddon>
                        <Input
                            onChange={handleInputChange}
                            value={form.min}
                            type="number"
                            name="min"
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftAddon>
                            <Tooltip label="Limite superior para guardado de vector de estado">
                                Max
                            </Tooltip>
                        </InputLeftAddon>
                        <Input
                            onChange={handleInputChange}
                            value={form.max}
                            type="number"
                            name="max"
                        />
                    </InputGroup>
                </Flex>
                <Flex justify={'flex-end'} my={2} gap={2}>
                    <InputGroup>
                        <InputLeftAddon>
                            <Tooltip label="Cantidad de simulaciones">N</Tooltip>
                        </InputLeftAddon>
                        <Input
                            onChange={handleInputChange}
                            value={form.n}
                            type="number"
                            name="n"
                        />
                    </InputGroup>
                    <Button onClick={simulate} colorScheme={'linkedin'}>
                        Simular
                    </Button>
                </Flex>
                {error.isError ? <ErrorBox errorMsg={error.msg} /> : null}
                {flagSim ? <TP4StatsShower stats={stats} /> : null}
                <Flex alignItems="center" gap={2} my={4}>
                    <Switch
                        size={'md'}
                        id="graphActivator"
                        isChecked={flagGraph}
                        onChange={() => setFlagGraph(!flagGraph)}
                    ></Switch>
                    <Text>Recortar primeras 1000 simulaciones en gráfico </Text>
                </Flex>

                {flagSim ? <StateVectorTP4Shower stateVectors={stats.stateVectors} /> : <></>}
                {flagSim ? <TableIntervalStat intervals={statsInterval} /> : <></>}
                {flagSim ? (
                    <LineEvolution
                        key={stats.trust90}
                        evolution={stats.averageEvolution}
                        title="Evolución del promedio"
                    />
                ) : null}
            </Box>
        </Box>
    );
}
