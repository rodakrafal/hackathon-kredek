import { Box, Tab, Tabs, Typography } from "@mui/material"
import { useState } from "react";
import { ApplianceChart } from "./components/ApplianceChart";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const Statistics = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                minHeight="100%"
            >
                <Box>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{width: '40vw'}}>
                            <Tab label="Urządzenia elektryczne" {...a11yProps(0)} />
                            <Tab label="[Not implemented]" {...a11yProps(1)} />
                            <Tab label="[Not implemented]" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ApplianceChart />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        [Not implemented]
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        [Not implemented]
                    </TabPanel>
                </Box>
            </Box>
        </>
    )
}