import { CircularProgress, Box } from "@mui/material"


export const LoadingSpinner = () => {


    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        </>
    )
}