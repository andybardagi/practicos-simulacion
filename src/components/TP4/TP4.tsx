import {
    Box,
    Button,
    Flex,
    FormLabel,
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
import { tp4StatsType } from '../../simulation/tp4/types/stats.type';
import ErrorBox from '../ErrorBox';
import LineEvolution from '../LineEvolution';
import TP4StatsShower from './TP4StatsShower';

export default function TP4() {
    const consignas = [
        'Identifique las variables que deben ser definidas para el análisis',
        'Cómo se calcularia la duración de la tarea de ensamble',
        'Cuál es el tiempo promedio de duración de la tarea de ensamble',
        'Grafique la evolucion del tiempo promedio de duración anterior',
        'Identificar máximos y mínimos simulados de los valores de la duración mínima de la tarea de ensamble',
        'Indique cual es la probabilidad de haber completado la tarea de ensamble en 45 días',
        'Cuál es la fecha a fijar si se busca un nivel de confianza del 90% de terminar en esa fecha o antes',
    ];

    const activityHandler = useRef(new ActivityCoordinator());
    const [n, setN] = useState('10000');
    const [flagSim, setFlagSim] = useState(false);
    const [flagGraph, setFlagGraph] = useState(true);
    const [error, setError] = useState({ isError: false, msg: [''] });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFlagSim(false);
        setError((p) => ({ ...p, isError: false }));
        setN(e.target.value);
    };
    const [stats, setStats] = useState({} as tp4StatsType);

    const simulate = () => {
        if (isNaN(parseInt(n))) {
            setError({ isError: true, msg: ['El valor de N es inválido'] });
        } else {
            setFlagSim(true);
            activityHandler.current = new ActivityCoordinator();
            activityHandler.current.simulateManyTasks(parseInt(n));
            setStats(activityHandler.current.getStats());
        }
    };

    return (
        <Box p={4} w="100%">
            <Heading>Trabajo Práctico 4</Heading>
            <Box border="1px solid #efefef" borderRadius={8} p={4}>
                <Text color="#444444">
                    Simule el siguiente proyecto en red y luego responda las siguientes preguntas
                </Text>
                <Text color="#444444">
                    Llamaremos "duración de la tarea de ensamble" al "tiempo mínimo" en que puede
                    completarse dicha tarea.
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
                <Flex justify={'flex-end'} my={2} gap={2}>
                    <InputGroup>
                        <InputLeftAddon>
                            <Tooltip label="Cantidad de simulaciones">N</Tooltip>
                        </InputLeftAddon>
                        <Input onChange={handleInputChange} value={n} type="number" />
                    </InputGroup>
                    <Button onClick={simulate} colorScheme={'linkedin'}>
                        Simular
                    </Button>
                </Flex>
                {error.isError ? <ErrorBox errorMsg={error.msg} /> : null}
                {flagSim ? <TP4StatsShower stats={stats} /> : null}
                <Flex alignItems="center" gap={2}>
                    <Text>Activar gráfico</Text>
                    <Switch
                        size={'md'}
                        id="graphActivator"
                        isChecked={flagGraph}
                        onChange={() => setFlagGraph(!flagGraph)}
                    ></Switch>
                </Flex>
                {flagSim && flagGraph ? (
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
/*

*/
