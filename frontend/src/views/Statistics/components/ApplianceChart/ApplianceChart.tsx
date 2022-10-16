import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { LoadingSpinner } from '../../../../components/LoadingSpinner/intex';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { Box, Typography } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ApplianceChart = () => {
    const [data, setData] = useState<number[]>([]);
    const [name, setName] = useState('WYBIERZ REGION');
    const dataMock = new Map<string, number[]>([
        ['Psie Pole - Zawidawie', [5, 7, 3, 7, 3, 2, 1]],
        ['Jagodno', [5, 7, 3, 7, 3, 7, 3]],
        ['Ołbin', [5, 2, 3, 7, 1, 4, 8]],
        ['Bieńkowice', [5, 7, 3, 3, 3, 7, 5]],
        ['Nadodrze', [5, 4, 3, 0, 2, 7, 8]],
        ['Wojszyce', [5, 7, 3, 7, 2, 5, 8]],
        ['Pawłowice', [2, 6, 3, 7, 3, 7, 7]],
        ['Szczepin', [5, 7, 9, 7, 6, 3, 8]],
        ['Księże', [8, 7, 3, 7, 3, 7, 5]],
        ['Sołtysowice', [5, 7, 2, 7, 6, 6, 8]],
    ])

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

    // if (data.length === 0) return <LoadingSpinner />;
    const handleSelect = (name: string) => {
        let dataToSet: number[] | undefined = dataMock.get(name);
        if (dataToSet) {
            setData(dataToSet);
            setName(name);
        }
    }

    return (
        <>
            <Typography align='center'>
                Udział poszczególnych urządzeń w zużyciu energi elektrycznej
            </Typography>
            <Box display="flex" justifyContent="center" >
                <DropDown names={Array.from(dataMock.keys())} onSelect={handleSelect} name={name} />
            </Box>
            <Pie data={dataSet} />
        </>
    )
}

interface DropDownProps {
    onSelect: (name: string) => void;
    names: string[];
    name: string
}

export const DropDown = ({ onSelect, names, name }: DropDownProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSelect = (name: string) => {
        onSelect(name);
        handleClose();
    }

    return (
        <>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {name}
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {names.map((name, index) => (
                    <MenuItem key={index} onClick={() => { handleSelect(name) }}>{name}</MenuItem>
                ))}
            </Menu>
        </>
    )
}