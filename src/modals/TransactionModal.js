import { Dialog, DialogContent, DialogTitle, Grid2 } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { TextField } from "formik-mui";
import { SubmitButton } from "../components/SubmitButton";
import { AXIOS_METHOD, doApiCall } from "../hooks/useApi";

const validateTitle = (title) => {
  if (!title) {
    return "Title is required";
  }
};

const validateAmount = (amount) => {
  if (!amount || isNaN(amount) || amount === 0) {
    return "Amount is required";
  }
};

export const TransactionModal = ({
  onClose,
  walletId,
  onSuccessful = false,
  transaction = false,
}) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>New Transaction</DialogTitle>
      <DialogContent>
        <br />
        <Formik
          initialValues={ transaction !== false ? {wallet_id: walletId, title : transaction.title, amount : transaction.amount} : { wallet_id: walletId, title: "", amount: 0 }}
          onSubmit={(value, { setFieldError, setSubmitting }) => {
            setSubmitting(true);
            if (transaction === false) {
              doApiCall(
                AXIOS_METHOD.PUT,
                "/transactions",
                (_unusedNewWallet) => {
                  setSubmitting(false);
                  if (onSuccessful !== false) {
                    onSuccessful();
                  }

                  onClose();
                },
                (apiError) => {
                  setFieldError("title", apiError);
                  setSubmitting(false);
                },
                value
              );
            }
            else {
              doApiCall(
                AXIOS_METHOD.PATCH,
                `/transaction/${transaction.id}`,
                (_unusedNewWallet) => {
                  setSubmitting(false);
                  if (onSuccessful !== false) {
                    onSuccessful();
                  }

                  onClose();
                },
                (apiError) => {
                  setFieldError("title", apiError);
                  setSubmitting(false);
                },
                {
                  title: value.title,
                  amount: value.amount,
                }
              );
            }
          }}
        >
          <Form>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12 }}>
                <Field
                  component={TextField}
                  name="title"
                  label="Title"
                  type="text"
                  fullWidth
                  validate={validateTitle}
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <Field
                  component={TextField}
                  name="amount"
                  label="Amount"
                  type="number"
                  fullWidth
                  validate={validateAmount}
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <Field component={SubmitButton} label={"Save transaction"} />
              </Grid2>
            </Grid2>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
