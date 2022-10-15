import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Category } from "../../utils"
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import { LoadingSpinner } from '../../../../components/LoadingSpinner/intex';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));

export const ApplianceCalculator: React.FC = () => {
    const [cost, setCost] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get<Category[]>('https://localhost:7190/api/category')
            .then(response => setCategories(response.data))
            .then(() => setLoading(false));
    },[]);

    const [categories, setCategories] = useState<Category[]>([]);

    const handleAdd = (id: string) => {
        let category = categories.find(x => x.id === id);

        if (!category) return;

        if (!category.amount) category.amount = 0;

        category.amount++;
        console.log(typeof(cost));
        console.log(typeof(category.usage));
        setCost(cost + category.usage);

        let filtredCategories = categories.filter(x => x.id !== id);

        setCategories([...filtredCategories, category]);
    }

    const handleRemove = (id: string) => {
        let category = categories.find(x => x.id === id);

        if (!category) return;

        if (!category.amount) category.amount = 0;


        if (category.amount === 0) return;

        category.amount--;
        console.log(typeof(cost));
        console.log(typeof(category.usage));
        setCost(cost - category.usage);

        let filtredCategories = categories.filter(x => x.id !== id);

        setCategories([...filtredCategories, category]);
    }

    if (loading) return <LoadingSpinner />

    return (
        <>
            <Box>
                <Box
                    sx={{
                        p: 2,
                        bgcolor: 'background.default',
                        display: 'grid',
                        gridTemplateColumns: { md: '1fr 1fr' },
                        gap: 2,
                    }}
                >
                    {categories.sort((a, b) => a.id.localeCompare(b.id)).map((category) => (
                        <Tooltip title={category.usage} key={category.id}>
                            <Item>
                                <IconButton aria-label="add" onClick={() => handleAdd(category.id)}>
                                    <AddIcon />
                                </IconButton>
                                {`${category.name} (${category.amount || '0'})`}
                                <IconButton aria-label="remove" onClick={() => handleRemove(category.id)}>
                                    <RemoveIcon />
                                </IconButton>
                            </Item>
                        </Tooltip>
                    ))}
                </Box>
                <Typography align='center'>
                    Szacowane roczne zużycie: {cost / 1000} kWh
                </Typography>
            </Box>
        </>
    )
}