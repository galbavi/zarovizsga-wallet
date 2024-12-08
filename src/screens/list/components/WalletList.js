import { Button, Divider, Grid2, Typography } from "@mui/material";
import { WalletCard } from "../../../components/WalletCard";
import { AddWallet } from "./AddWallet";

export const WalletList = ({ listName, wallets, onAddNewWallet }) => {
    return <Grid2 mt={2} container spacing={1}>
        <Grid2 size={{ xs: 6 }}>
            <Typography variant="h3">{listName}</Typography>
        </Grid2>
        <Grid2 size={{ xs: 6 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {onAddNewWallet && <Button variant={"contained"} color="success" onClick={() => { onAddNewWallet() }}>Add new wallet</Button>}
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
            <Divider sx={{ mt: 1, borderWidth: 1 }} variant="fullWidth" aria-hidden="true" />
        </Grid2>
        {
            wallets.map((wallet) => {
                return <WalletCard key={wallet.id} wallet={wallet} />
            })
        }
    </Grid2>
};