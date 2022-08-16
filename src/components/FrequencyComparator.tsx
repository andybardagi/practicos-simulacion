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
    intervals: number[];
    limits: string[];
    total: number;
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                position: 'top',
                font: {
                    size: 16,
                },
            },
        },
        title: {
            display: true,
            text: 'Comparación frecuencias observadas vs frecuencias esperadas',
            font: {
                size: 18,
            },
        },
    },
};

export default function FrequencyComparator({ intervals, total, limits }: Props) {
    const [data, setData] = useState({
        labels: limits,
        datasets: [
            {
                label: 'Frec. esperada',
                data: intervals.map((i) => 1 / intervals.length),
                backgroundColor: '#0295A9',
            },
            {
                label: 'Frec. observada',
                data: intervals,
                backgroundColor: '#FDD037',
            },
        ],
    });

    return (
        <Box maxW={'1000px'} mx="auto">
            <Bar data={data} options={options} />
        </Box>
    );
}
