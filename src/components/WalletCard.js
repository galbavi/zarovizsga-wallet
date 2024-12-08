import { Delete } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const WalletCard = ({ wallet, onDelete }) => {
  const { sessionUser } = useAuth();
  const navigate = useNavigate();
  const [raised, setRaised] = useState(false);

  return (
    <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card
        raised={raised}
        onMouseEnter={() => {
          setRaised(true);
        }}
        onMouseLeave={() => {
          setRaised(false);
        }}
      >
        <CardContent>
          <Typography variant="h5">{wallet.name}</Typography>
          {sessionUser.id !== wallet.created_by.id && (
            <Typography variant="subtitle1">
              {wallet.created_by.name}
            </Typography>
          )}
          <Typography
            mt={3}
            variant="h4"
            color={wallet.balance < 0 ? "error" : "success"}
          >
            {wallet.balance}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "right" }}>
          <Button
            variant="outlined"
            size="small"
            color="info"
            onClick={() => {
              navigate(`/wallet/${wallet.id}`);
            }}
          >
            Details
          </Button>
        </CardActions>
      </Card>
    </Grid2>
  );
};
