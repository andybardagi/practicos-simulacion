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
    evolutionX: number[];
    evolutionY: number[];
    title: string;
};

export default function FuntionGraph({ evolutionX, evolutionY ,title }: Props) {
    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
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
        labels: evolutionX,
        datasets: [
            {
                label: 'Dataset',
                data: evolutionY,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                pointRadius: 0,
                borderWidth: 1.5,
            },
        ],
    });

    return <Line options={options} data={data} />;
}
