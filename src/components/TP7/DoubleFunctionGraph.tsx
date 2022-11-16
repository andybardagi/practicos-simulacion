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
    evolutionY2: number[];
    title: string;
};

export default function DoubleFunctionGraph({ evolutionX, evolutionY, evolutionY2 ,title }: Props) {
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
                label: "x''",
                data: evolutionY,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                pointRadius: 0,
                borderWidth: 1.5,
            },
            {
                label: "x'",
                data: evolutionY2,
                borderColor: 'rgb(255, 87, 51)',
                backgroundColor: 'rgba(255, 87, 51, 0.5)',
                pointRadius: 0,
                borderWidth: 1.5,
            }
        ],
    });

    return <Line options={options} data={data} />;
}
