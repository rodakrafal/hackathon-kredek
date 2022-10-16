import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Category } from "../../utils"
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, Tooltip, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));

export const ApplianceCalculator: React.FC = () => {
    const [cost, setCost] = useState(0);

    const [categories, setCategories] = useState<Category[]>([
        {
            id: '1',
            name: 'test',
            usage: 1
        },
        {
            id: '2',
            name: 'test',
            usage: 2
        },
        {
            id: '3',
            name: 'test',
            usage: 3
        },
        {
            id: '4',
            name: 'test',
            usage: 4
        },
        {
            id: '5',
            name: 'test',
            usage: 5
        },
    ]);

    const handleAdd = (id: string) => {
        let category = categories.find(x => x.id === id);

        if (!category) return;

        if (!category.amount) category.amount = 0;

        category.amount++;
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
        setCost(cost - category.usage);

        let filtredCategories = categories.filter(x => x.id !== id);

        setCategories([...filtredCategories, category]);
    }

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
                        <Tooltip title={category.usage}>
                            <Item id={category.id}>
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