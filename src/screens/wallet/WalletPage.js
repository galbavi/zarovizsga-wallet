import { useNavigate, useParams } from "react-router-dom";
import { AXIOS_METHOD, useApi } from "../../hooks/useApi";
import { LoadingBlock } from "../../components/LoadingBlock";
import { Divider, Grid2, Typography } from "@mui/material";
import { AddTransaction } from "./components/AddTransaction";

export const WalletPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [walletResult, loading, error, refreshWallet] = useApi(AXIOS_METHOD.GET, `/wallet/${id}`);

    if (loading === false && error !== false) {
        navigate('/');
        return null;
    }

    if (loading === true) {
        return <LoadingBlock />;
    }

    return <Grid2 mt={2} container spacing={1}>
    <Grid2 size={{ xs: 6 }}>
        <Typography variant="h3">{walletResult.name}</Typography>
    </Grid2>
    <Grid2 size={{ xs: 12 }}>
        <Divider sx={{mt : 1, borderWidth : 1}} variant="fullWidth" aria-hidden="true"/>
    </Grid2>
</Grid2>
}