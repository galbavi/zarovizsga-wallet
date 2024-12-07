import { Delete} from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Grid2, IconButton, Typography } from "@mui/material"
import { useState } from "react";

export const WalletCard = ({ wallet, onDelete }) => {
    const [raised, setRaised] = useState(false);

    return <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <Card raised={raised} onMouseEnter={() => { setRaised(true) }} onMouseLeave={() => { setRaised(false) }} >
            <CardContent>
                <Typography variant="h4">{wallet.name}</Typography>
                <Typography variant="body1">{wallet.description}</Typography>
                <Typography variant="body2">Balance: {wallet.balance}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Details
                </Button>
                <IconButton color={"error"} onClick={onDelete}>
                    <Delete/>
                </IconButton>
            </CardActions>
        </Card>
    </Grid2>;
}