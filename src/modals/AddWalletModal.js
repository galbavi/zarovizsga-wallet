import { Dialog, DialogContent, DialogTitle, Grid2 } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { TextField } from 'formik-mui'
import { SubmitButton } from "../components/SubmitButton";
import { AXIOS_METHOD, doApiCall } from "../hooks/useApi";

const validateName = (name) => {
    if (!name) {
        return 'Name is required';
    }
}

const validateDescription = (description) => {
    if (!description) {
        return 'Description is required';
    }
}

export const AddWalletModal = ({ onClose, OnSuccessful = false }) => {
    return (<Dialog open={true} onClose={onClose}>
        <DialogTitle>New Wallet</DialogTitle>
        <DialogContent>
            <br />
            <Formik initialValues={{}} onSubmit={(value, { setFieldError, setSubmitting }) => {
                setSubmitting(true);
                doApiCall(AXIOS_METHOD.PUT, '/wallet', (_unusedNewWallet) => {
                    setSubmitting(false);
                    if (OnSuccessful !== false) {
                        OnSuccessful();
                    }

                    onClose();
                }, (apiError) => {
                    setFieldError('name', apiError);
                    setSubmitting(false);
                }, value);
            }}>
                <Form>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12 }}>
                            <Field component={TextField} name="name" label="Name" type="text" fullWidth validate={validateName} />
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <Field component={TextField} name="description" label="Description" type="text" multiline fullWidth minRows={8} validate={validateDescription} />
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <Field component={SubmitButton} label={"Add new wallet"} />
                        </Grid2>
                    </Grid2>
                </Form>
            </Formik>
        </DialogContent>
    </Dialog>)
}