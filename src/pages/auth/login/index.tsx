import React from "react";
import {Alert, Button, Grid, TextField, Typography, useTheme,} from "@mui/material";
import {Helmet} from "react-helmet";
import {useFormik} from "formik";
import {object, string} from "yup";
import styled from "styled-components";

import {AuthContext} from "../../../Context/AuthManager";
import {AUTH_DETAILS} from "../../../config/Constants";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CustomLoader from "../../../components/CustomLoader";
import {AuthResponse, LoginPayload, useLoginMutation,} from "../../../generated";
import {useRouter} from "next/router";
import CustomButton from "../../components/Login/CustomButton";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  text-align: center;
  margin-top: 40%;
`;
const Login = (): JSX.Element => {
    const [login, {loading}] = useLoginMutation();
    const [err, setError] = React.useState<string>("");
    const authContext = React.useContext(AuthContext);
    const router = useRouter()

    const handleInputStart = (): void => {
        setError("");
    };

    const handleSign = async (payload: LoginPayload): Promise<void> => {
        handleInputStart();
        try {
            const {data, errors} = await login({variables: {payload}});

            if (errors != null) {
                return setError(errors[0].message);
            }

            if (data !== undefined) {
                authContext?.setAuthDetails(data?.login as AuthResponse);
                localStorage.setItem(AUTH_DETAILS, JSON.stringify(data?.login));
                const searchParams = Object.fromEntries(
                    new URLSearchParams(location.search)
                );

                const {redirect} = searchParams;
                if (redirect && redirect !== "/") {
                    await router.push(redirect);
                }

                await router.push("/dashboard");
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            setError(e.message as string);
        }
    };

    const validationSchema = object().shape({
        email: string()
            .email("Please provide a valid email")
            .required("Please provide an email!"),
        password: string().required("Please provide a password"),
    });
    const {values, errors, touched, setFieldValue, handleSubmit} =
        useFormik<LoginPayload>({
            initialValues: {
                password: "",
                email: "",
            },
            validationSchema,
            onSubmit: handleSign,
        });

    const theme = useTheme();
    const errorText = React.useMemo(() => {
        if (err !== "") return err;
        return null;
    }, [err]);

    return (
        <Grid
            height={"100vh"}
            container
            alignItems={"center"}
            id={"login-component"}
            justifyContent={"center"}
        >
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Grid
                item
                bgcolor={theme.palette.primary.main}
                xs={0}
                md={6}
                xl={6}
            >
                <Grid container justifyContent={"center"} alignItems={"center"} height={"100vh"}>
                    <Grid item>
                        <div>
                            <Typography textAlign={"center"} variant={"h2"} color={"light"}>
                                Welcome Back
                            </Typography>
                        </div>
                        <div>
                            <CustomButton>Create Account</CustomButton>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                height={"100%"}
                item
                padding={3}
                xs={12}
                sm={12}
                md={6}
                xl={6}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Grid
                    item
                    component={"form"}
                    onSubmit={handleSubmit}
                    noValidate={true}
                    mt={"40%"}
                >
                    <Grid container spacing={3}>
                        <Grid item>
                            <Typography variant={"h3"} color={"primary"}>
                                Log In To Continue
                            </Typography>
                        </Grid>
                        {errorText !== null && (
                            <Grid width={"100%"} item>
                                <Alert
                                    sx={{width: "100%"}}
                                    variant={"filled"}
                                    color={"error"}
                                >
                                    {JSON.stringify(errorText)}
                                </Alert>
                            </Grid>
                        )}
                        <Grid xs={12} item>
                            <TextField
                                label={"Email"}
                                type={"email"}
                                fullWidth={true}
                                value={values.email}
                                error={Boolean(touched.email === true && errors.email)}
                                helperText={touched.email === true ? errors.email : undefined}
                                onChange={async (e) =>
                                    await setFieldValue("email", e.target.value).then()
                                }
                            />
                        </Grid>
                        <Grid xs={12} item>
                            <TextField
                                type={"password"}
                                label={"Password"}
                                fullWidth={true}
                                value={values.password}
                                onChange={async (e) =>
                                    await setFieldValue("password", e.target.value)
                                }
                                error={Boolean(touched?.password && Boolean(errors.password))}
                                helperText={
                                    touched?.password && Boolean(errors.password)
                                        ? errors.password
                                        : undefined
                                }
                            />
                        </Grid>
                        <Grid xs={12} item textAlign={"end"}>
                            <Button
                                disabled={loading}
                                startIcon={loading ? <CustomLoader/> : <LockOpenIcon/>}
                                variant={"contained"}
                                type={"submit"}
                            >
                                Sign In
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Login;
