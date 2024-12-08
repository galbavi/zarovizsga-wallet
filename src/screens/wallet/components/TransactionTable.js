import { Delete } from "@mui/icons-material";
import {
  Button,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { MODALS, useModals } from "../../../hooks/useModal";

const formatterToDateString = new Intl.DateTimeFormat("hu-HU", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const formatterToTimeString = new Intl.DateTimeFormat("hu-HU", {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

export const TransactionTable = ({
  transactions,
  hasMore,
  onLoadMore,
  loading,
  onDeleteTransaction,
}) => {
  const { showModal } = useModals();

  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h6">Title</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">Created By</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">Date</Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h6">Time</Typography>
          </TableCell>
          <TableCell colSpan={2}>
            <Typography variant="h6">Amount</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions &&
          transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.title}</TableCell>
              <TableCell>{transaction.created_by.name}</TableCell>
              <TableCell>
                {formatterToDateString.format(new Date(transaction.created_at))}
              </TableCell>
              <TableCell>
                {formatterToTimeString.format(new Date(transaction.created_at))}
              </TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell align="right">
                <IconButton size="small">
                  <Delete
                    color={"error"}
                    onClick={() => {
                      showModal(MODALS.CONFIRM, {
                        onConfirmed: () => {
                          onDeleteTransaction(transaction.id);
                        },
                        message:
                          "Are you sure you want to delete this transaction?",
                      });
                    }}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        {loading === true && (
          <TableRow>
            <TableCell sx={{ borderWidth: 0 }} colSpan={5}>
              <LinearProgress />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell sx={{ borderWidth: 0 }} colSpan={6}>
            {hasMore && !loading && (
              <Button variant="contained" onClick={onLoadMore} fullWidth>
                Load more
              </Button>
            )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
