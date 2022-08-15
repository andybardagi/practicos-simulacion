import React from 'react';
import { Bar } from 'react-chartjs-2';
import { IIntervalWithPercentage } from '../simulation/tp1/interfaces/IIntervalWithPercentage';
import { useState } from 'react';
import { Box } from '@chakra-ui/react';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
    intervals: IIntervalWithPercentage[];
    total: number;
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Comparación frecuencias observadas vs frecuencias esperadas',
        },
    },
};

export default function FrequencyComparator({ intervals, total }: Props) {
    const [data, setData] = useState({
        labels: intervals.map((i) => `[${i.lowerLimit.toFixed(2)};${i.upperLimit.toFixed(2)})`),
        datasets: [
            {
                label: 'Frec. esperada',
                data: intervals.map((i) => 1 / intervals.length),
                backgroundColor: '#0295A9',
            },
            {
                label: 'Frec. observada',
                data: intervals.map((i) => i.percentage),
                backgroundColor: '#FDD037',
            },
        ],
    });

    return (
        <Box maxW={'1000px'} mx="auto">
            <Bar data={data} options={options} />;
        </Box>
    );
}
