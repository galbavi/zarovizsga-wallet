import { Container, Grid2 } from "@mui/material";
import { MyWalletList } from "./MyWalletList";
import { SharedWalletList } from "./SharedWalletList";

export const MainPage = () => {
    return <Container maxWidth="lg">
        <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12 }}>
                <MyWalletList />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
                <SharedWalletList />
            </Grid2>
        </Grid2>
    </Container>;
}