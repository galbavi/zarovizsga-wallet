import { Delete, Edit } from "@mui/icons-material";
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
import { useAuth } from "../../../hooks/useAuth";

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
  onModifyTransaction,
}) => {
  const { showModal } = useModals();
  const { sessionUser } = useAuth();

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
          <TableCell colSpan={3}>
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
                {transaction.created_by.id === sessionUser.id && <IconButton size="small" onClick={() => {
                  onModifyTransaction(transaction);
                }}>
                  <Edit
                    color={"primary"}
                  />
                </IconButton>}
              </TableCell>
              <TableCell align="right">
                {transaction.created_by.id === sessionUser.id && <IconButton size="small" onClick={() => {
                  showModal(MODALS.CONFIRM, {
                    onConfirmed: () => {
                      onDeleteTransaction(transaction.id);
                    },
                    message:
                      "Are you sure you want to delete this transaction?",
                  });
                }}>
                  <Delete
                    color={"error"}
                  />
                </IconButton>}
              </TableCell>
            </TableRow>
          ))}
        {loading === true && (
          <TableRow>
            <TableCell sx={{ borderWidth: 0 }} colSpan={6}>
              <LinearProgress />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell sx={{ borderWidth: 0 }} colSpan={7}>
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
