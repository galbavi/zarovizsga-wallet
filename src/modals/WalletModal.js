import { Dialog, DialogContent, DialogTitle, Grid2 } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { TextField } from "formik-mui";
import { SubmitButton } from "../components/SubmitButton";
import { AXIOS_METHOD, doApiCall } from "../hooks/useApi";

const validateName = (name) => {
  if (!name) {
    return "Name is required";
  }
};

const validateDescription = (description) => {
  if (!description) {
    return "Description is required";
  }
};

export const WalletModal = ({
  onClose,
  onSuccessful = false,
  wallet = false,
}) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>New Wallet</DialogTitle>
      <DialogContent>
        <br />
        <Formik
          initialValues={wallet !== false ? wallet : { name: "", description: "" }}
          onSubmit={(value, { setFieldError, setSubmitting }) => {
            setSubmitting(true);
            if (wallet === false) {
              doApiCall(
                AXIOS_METHOD.PUT,
                "/wallet",
                (_unusedNewWallet) => {
                  setSubmitting(false);
                  if (onSuccessful !== false) {
                    onSuccessful();
                  }

                  onClose();
                },
                (apiError) => {
                  setFieldError("name", apiError);
                  setSubmitting(false);
                },
                value
              );
            }
            else {
              doApiCall(
                AXIOS_METHOD.PATCH,
                `/wallet/${wallet.id}`,
                (_unusedNewWallet) => {
                  setSubmitting(false);
                  if (onSuccessful !== false) {
                    onSuccessful();
                  }

                  onClose();
                },
                (apiError) => {
                  setFieldError("name", apiError);
                  setSubmitting(false);
                },
                { description: value.description }
              );
            }
          }}
        >
          <Form>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12 }}>
                <Field
                  component={TextField}
                  name="name"
                  label="Name"
                  type="text"
                  fullWidth
                  disabled={wallet !== false}
                  validate={validateName}
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <Field
                  component={TextField}
                  name="description"
                  label="Description"
                  type="text"
                  multiline
                  fullWidth
                  minRows={8}
                  validate={validateDescription}
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <Field component={SubmitButton} label={"Save wallet"} />
              </Grid2>
            </Grid2>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
