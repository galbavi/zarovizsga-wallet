import { Box, Container, Grid2, Link, Typography } from "@mui/material";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { CheckboxWithLabel, TextField } from 'formik-mui'
import { useNavigate } from "react-router-dom";
import { AXIOS_METHOD, doApiCall } from "../../hooks/useApi";
import { useAuth } from "../../hooks/useAuth";
import { SubmitButton } from "../../components/SubmitButton";
import * as yup from "yup";
import YupPassword from "yup-password";
import { PasswordField } from "../../components/PasswordField";

YupPassword(yup);

export const RegistrationPage = () => {
    const { handleLoginResult } = useAuth();
    const navigate = useNavigate();

    const validationShema = yup.object().shape({
        name: yup.string()
            .required('Username is required')
            .min(3, 'Username should be at least 3 characters'),
        password: yup.string().password()
            .password()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required')
            .minUppercase(1, 'Password must contain at least one uppercase character')
            .minLowercase(1, 'Password must contain at least one lowercase character')
            .minNumbers(1, 'Password must contain at least one number')
            .minSymbols(1, 'Password must contain at least one symbol')
            .notOneOf(['12345678', 'password'], 'Password is too weak'),
        passwordConfirm: yup.string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
    });

    return (
        <Container maxWidth="xs">
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom>
                    Registration
                </Typography>
                <Formik initialValues={{ name: "", password : "", legal: false }}
                    validationSchema={validationShema}
                    onSubmit={(value, { setFieldError, setSubmitting }) => {
                        setSubmitting(true);
                        const onFailure = (apiError) => {
                            setFieldError('name', apiError);
                            setSubmitting(false);
                        };

                        doApiCall(AXIOS_METHOD.POST, '/reg', (_unusedRegData) => {
                            doApiCall(AXIOS_METHOD.POST, '/login', (data) => {
                                handleLoginResult(data);
                                setSubmitting(false);
                                navigate('/');
                            }, onFailure, value);
                        }, onFailure, value);
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
                                <Field component={PasswordField} name="passwordConfirm" label="Confirm Password" fullWidth />
                            </Grid2>
                            <Grid2 size={{ xs: 12 }}>
                                <Field
                                    component={CheckboxWithLabel}
                                    type="checkbox"
                                    name="legal"
                                    Label={{ label: 'Legal' }}
                                    validate={value => value === false && 'Legal accept required!'}
                                    fullWidth
                                />
                                <Typography variant={"body2"} color={"error"}>
                                    <ErrorMessage name={"legal"} />
                                </Typography>
                            </Grid2>
                            <Grid2 size={{ xs: 12 }}>
                                <Field component={SubmitButton} label={"Register"} />
                            </Grid2>
                        </Grid2>
                    </Form>
                </Formik>
                <Typography variant="overline" align="center" gutterBottom style={{ color: "grey" }}>
                    Already have an account? <Link onClick={() => { navigate('/login') }}>Login</Link>
                </Typography>
            </Box>
        </Container>
    );
};