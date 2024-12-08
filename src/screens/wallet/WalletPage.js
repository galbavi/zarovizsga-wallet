import { useNavigate, useParams } from "react-router-dom";
import { AXIOS_METHOD, useApi } from "../../hooks/useApi";
import { LoadingBlock } from "../../components/LoadingBlock";
import { Button, Container, Divider, Grid2, Typography } from "@mui/material";
import { MODALS, useModals } from "../../hooks/useModal";
import { TransactionList } from "./components/TransactionList";

export const WalletPage = () => {
  const { showModal } = useModals();
  const navigate = useNavigate();
  const { id } = useParams();
  const [walletResult, loading, error, refreshWallet] = useApi(
    AXIOS_METHOD.GET,
    `/wallet/${id}`
  );

  if (loading === false && error !== false) {
    navigate("/");
    return null;
  }

  if (loading === true) {
    return <LoadingBlock />;
  }

  return (
    <Container>
      <Grid2 mt={2} container spacing={1}>
        <Grid2 size={{ xs: 6 }}>
          <Typography variant="h3">{walletResult.name}</Typography>
        </Grid2>
        <Grid2 size={{ xs: 6 }} alignContent={"center"} justifyItems={"right"}>
          <Typography variant="body1">
            Created By: {walletResult.created_by.name}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Divider
            sx={{ mt: 1, borderWidth: 1 }}
            variant="fullWidth"
            aria-hidden="true"
          />
        </Grid2>
        <Grid2 size={{ xs: 6 }} mt={2}>
          <Typography variant="h5">Balance: {walletResult.balance}</Typography>
        </Grid2>
        <Grid2 size={{ xs: 3 }} mt={2}>
          <Typography variant="h5">
            Access: {walletResult.access.map((user) => user.name).join(", ")}
          </Typography>
        </Grid2>
        <Grid2
          size={{ xs: 3 }}
          mt={2}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              showModal(MODALS.SHARE, {
                walletId: walletResult.id,
                onSuccessful: refreshWallet,
              });
            }}
          >
            Share
          </Button>
        </Grid2>
      </Grid2>
      <TransactionList walletId={id} refreshWallet={refreshWallet} />
    </Container>
  );
};
