import { Divider, Grid2, Typography } from "@mui/material";
import { useTransactions } from "../../../hooks/useTransactions";
import { MODALS, useModals } from "../../../hooks/useModal";
import { AddTransaction } from "./AddTransaction";
import { TransactionTable } from "./TransactionTable";
import { AXIOS_METHOD, doApiCall } from "../../../hooks/useApi";

export const TransactionList = ({ walletId, refreshWallet }) => {
  const { showModal } = useModals();
  const [
    transactions,
    loading,
    error,
    onLoadMore,
    hasMore,
    resetTransactionList,
  ] = useTransactions(walletId, 5);

  const refreshWalletAndTransactions = () => {
    refreshWallet();
    resetTransactionList();
  };

  const onAddNewTransaction = () => {
    showModal(MODALS.ADD_TRANSACTION, {
      walletId: walletId,
      OnSuccessful: refreshWalletAndTransactions,
    });
  };

  const onDeleteTransaction = (transactionId) => {
    doApiCall(
      AXIOS_METHOD.DELETE,
      `/transaction/${transactionId}`,
      (_unusedNewWallet) => {
        refreshWalletAndTransactions();
      },
      (apiError) => {
        showModal(MODALS.ERROR, { message: apiError });
      }
    );
  };

  return (
    <Grid2 mt={2} container spacing={1}>
      <Grid2 mt={5} size={{ xs: 6 }}>
        <Typography variant="h4">Transactions</Typography>
      </Grid2>
      <Grid2
        size={{ xs: 6 }}
        mt={5}
        sx={{ display: "flex", justifyContent: "flex-end" }}
      >
        <AddTransaction
          walletId={walletId}
          onAddNewTransaction={onAddNewTransaction}
        />
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
        <Divider
          sx={{ mt: 1, borderWidth: 1 }}
          variant="fullWidth"
          aria-hidden="true"
        />
      </Grid2>
      <Grid2 size={{ xs: 12 }} mt={2}>
        <TransactionTable
          transactions={transactions}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={onLoadMore}
          onDeleteTransaction={onDeleteTransaction}
        />
      </Grid2>
    </Grid2>
  );
};
