import { useNavigate, useParams } from "react-router-dom";
import { AXIOS_METHOD, doApiCall, useApi } from "../../hooks/useApi";
import { LoadingBlock } from "../../components/LoadingBlock";
import { Button, Container, Divider, Grid2, Typography } from "@mui/material";
import { MODALS, useModals } from "../../hooks/useModal";
import { TransactionList } from "./components/TransactionList";
import { useAuth } from "../../hooks/useAuth";
import { UserList } from "./components/UserList";

export const WalletPage = () => {
  const { sessionUser } = useAuth();
  const { showModal } = useModals();
  const navigate = useNavigate();
  const { id } = useParams();
  const [walletResult, loading, error, refreshWallet] = useApi(
    AXIOS_METHOD.GET,
    `/wallet/${id}`
  );

  function deleteWallet(walletId) {
    doApiCall(
      AXIOS_METHOD.DELETE,
      `/wallet/${walletId}`,
      (_unusedNewWallet) => {
        navigate("/");
      },
      (apiError) => {
        showModal(MODALS.ERROR, { message: apiError });
      }
    );
  }

  function deleteAccess(userId) {
    doApiCall(
      AXIOS_METHOD.POST,
      `/wallet/${walletResult.id}/remove_access`,
      (_unusedData) => {
        refreshWallet();
      },
      (apiError) => {
        showModal(MODALS.ERROR, { message: apiError });
      },
      { user_id: userId }
    );
  }

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
        <Grid2 size={{ xs: 7 }}>
          <Typography variant="h3">{walletResult.name}</Typography>
        </Grid2>
        <Grid2 size={{ xs: 3 }} alignContent={"center"} justifyItems={"right"}>
          <Typography variant="body1">
            Created By: {walletResult.created_by.name}
          </Typography>
        </Grid2>
        <Grid2
          size={{ xs: 1 }} alignContent={"center"} 
        >
          {walletResult.created_by.id === sessionUser.id && <Button
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
          </Button>}
        </Grid2>
        <Grid2 size={{ xs: 1 }} alignContent={"center"} justifyItems={"right"}>
          {walletResult.created_by.id === sessionUser.id && <Button
            variant="contained"
            color="error"
            onClick={() => {
              showModal(MODALS.CONFIRM, {
                onConfirmed: () => {
                  deleteWallet(walletResult.id);
                },
                message:
                  "Are you sure you want to delete the wallet?",
              });
            }}
          >
            Delete
          </Button>}
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
        <Grid2 size={{ xs: 6 }} mt={2}>
          <Typography variant="h5">
            Access
          </Typography>
          <UserList users={walletResult?.access || []} onDelete={(userId) => {
            showModal(MODALS.CONFIRM, {
              onConfirmed: () => {
                deleteAccess(userId);
              },
              message: "Are you sure you want to delete the access?",
            });
          }} />
        </Grid2>
      </Grid2>
      <TransactionList walletId={id} refreshWallet={refreshWallet} />
    </Container>
  );
};
