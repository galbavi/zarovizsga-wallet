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

export const AddTransactionModal = ({
  onClose,
  walletId,
  OnSuccessful: onSuccessful = false,
}) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>New Transaction</DialogTitle>
      <DialogContent>
        <br />
        <Formik
          initialValues={{ wallet_id: walletId, title: "", amount: 0 }}
          onSubmit={(value, { setFieldError, setSubmitting }) => {
            setSubmitting(true);
            console.log(value);
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
                <Field component={SubmitButton} label={"Add new transaction"} />
              </Grid2>
            </Grid2>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
