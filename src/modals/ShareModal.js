import { useState } from "react";
import { AXIOS_METHOD, doApiCall } from "../hooks/useApi";
import { Dialog, DialogContent, DialogTitle, Grid2 } from "@mui/material";
import { TextField } from "formik-mui";
import { Field, Form, Formik } from "formik";
import { SubmitButton } from "../components/SubmitButton";

export const ShareModal = ({ onClose, walletId, onSuccessful = false }) => {
  const validateName = (name) => {
    if (!name) {
      return "Name is required";
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Share</DialogTitle>
      <DialogContent>
        <br />
        <Formik
          initialValues={{name: ""}}
          onSubmit={(value, { setFieldError, setSubmitting }) => {
            setSubmitting(true);
            doApiCall(
              AXIOS_METHOD.POST,
              `/user/search`,
              (responseData) => {
                doApiCall(
                  AXIOS_METHOD.POST,
                  `/wallet/${walletId}/grant_access`,
                  (_unusedResponse) => {
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
                  {
                    user_id: responseData,
                  }
                );
              },
              (errorMessage) => {
                setFieldError("name", "User not found!");
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
                  name="name"
                  label="Username"
                  type="text"
                  fullWidth
                  validate={validateName}
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <Field component={SubmitButton} label={"Add new user"} />
              </Grid2>
            </Grid2>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
