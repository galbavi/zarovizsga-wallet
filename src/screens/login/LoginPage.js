import { Box, Container, Grid2, Link, Typography } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { AXIOS_METHOD, doApiCall } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";
import { SubmitButton } from "../../components/SubmitButton";
import { PasswordField } from "../../components/PasswordField";
import { TextField } from "formik-mui";

export const LoginPage = () => {
    const { handleLoginResult } = useAuth();
    const navigate = useNavigate();

    return (
        <Container maxWidth="xs">
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <Formik initialValues={{}} onSubmit={(value, { setFieldError, setSubmitting }) => {
                    setSubmitting(true);
                    doApiCall(AXIOS_METHOD.POST, '/login', (data) => {
                        handleLoginResult(data);
                        setSubmitting(false);
                        navigate('/');
                    }, (apiError) => {
                        setFieldError('password', apiError);
                        setSubmitting(false);
                    }, value);
                }}>
                    <Form>
                        <Grid2 container spacing={2}>
                            <Grid2 size={{ xs: 12 }}>
                                <Field component={TextField} name="name" label="Username" type="text" fullWidth />
                            </Grid2>
                            <Grid2 size={{ xs: 12 }}>
                                <Field component={PasswordField} name="password" label="Password" type="password" fullWidth />
                            </Grid2>
                            <Grid2 size={{ xs: 12 }}>
                                <Field component={SubmitButton} label={"Login"} />
                            </Grid2>
                        </Grid2>
                    </Form>
                </Formik>
                <Typography variant="overline" align="center" gutterBottom style={{ color: "grey" }}>
                    Don't have an account yet? <Link onClick={() => { navigate('/reg') }}>Register</Link>
                </Typography>
            </Box>
        </Container>
    );
};