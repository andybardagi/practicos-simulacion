import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
    evolution: number[];
    title: string;
};

export default function LineEvolution({ evolution, title }: Props) {
    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: false,
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 18,
                },
            },
            legend: {
                display: false,
            },
        },
    };
    const [data, setData] = useState({
        labels: evolution.map((e, i) => `${i}`),
        datasets: [
            {
                label: 'Dataset',
                data: evolution,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                pointRadius: 0,
                borderWidth: 1.5,
            },
        ],
    });

    return <Line options={options} data={data} />;
}
