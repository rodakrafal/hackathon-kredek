import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { LoadingSpinner } from '../../../../components/LoadingSpinner/intex';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ApplianceChart = () => {
    const [data, setData] = useState<number[]>([5, 7 ,3, 7 ,3, 7, 8]);
    const dataSet = {
        labels: ['Komputer stacjonarny', 'Laptop', 'Telewizor', 'Klimatyzacja', 'Lodówka', 'Zmywarka', 'Pralka', 'Piec elektryczny', 'Piec (inne)', 'Odkurzacz'],
        datasets: [
            {
                label: '# of Votes',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(200, 159, 64, 0.2)',
                    'rgba(220, 159, 64, 0.2)',
                    'rgba(130, 159, 64, 0.2)',
                    'rgba(66, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(200, 159, 64, 1)',
                    'rgba(220, 159, 64, 1)',
                    'rgba(130, 159, 64, 1)',
                    'rgba(66, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    if (data.length === 0) return <LoadingSpinner />;


    return (
        <>
            <Pie data={dataSet} />
        </>
    )
}