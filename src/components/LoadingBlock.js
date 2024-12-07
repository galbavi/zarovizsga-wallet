import { Grid2, LinearProgress } from "@mui/material";

export const LoadingBlock = () => {
    return <Grid2 container spacing={2}>
        <br />
        <Grid2 size={{ xs: 12 }}>
            <LinearProgress />
        </Grid2>
    </Grid2>
}