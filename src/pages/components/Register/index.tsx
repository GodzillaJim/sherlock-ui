import React, { useContext } from "react";
import {
  Grid,
  useTheme,
  TextField,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import styled from "styled-components";
import { useFormik } from "formik";
import {
  AuthResponse,
  RegisterPayload,
  useRegisterMutation,
} from "../../../generated";
import { object, string, ref } from "yup";
import { AuthContext } from "../../../Context/AuthManager";
import { AUTH_DETAILS } from "../../../config/Constants";
import { useNavigate } from "react-router-dom";

const Content = styled(Grid)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

interface IRegisterPayload extends RegisterPayload {
  confirmPassword: string;
}
const Register = (): JSX.Element => {
  const theme = useTheme();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [error, setError] = React.useState<string | null>(null);

  const handleStart = () => {
    setError(null);
  };

  const handleRegister = async (vals: IRegisterPayload) => {
    handleStart();
    const payload: RegisterPayload = {
      email: vals.email,
      firstName: vals.firstName,
      lastName: vals.lastName,
      password: vals.password,
      username: vals.username,
    };
    try {
      const { data, errors } = await register({ variables: { payload } });
      if (errors && errors[0]) {
        return setError(errors[0].message);
      }

      if (data && data?.register) {
        authContext?.setAuthDetails(data.register as AuthResponse);
        localStorage.setItem(AUTH_DETAILS, JSON.stringify(data?.register));
        const searchParams = Object.fromEntries(
          new URLSearchParams(location.search)
        );

        const { redirect } = searchParams;
        if (redirect && redirect !== "/") {
          return navigate(redirect);
        }

        return navigate("/app");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.message);
    }
  };
  const { values, errors, touched, handleSubmit, setFieldValue } =
    useFormik<IRegisterPayload>({
      initialValues: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        username: "",
        confirmPassword: "",
      },
      validationSchema: object().shape({
        email: string().email("Please provide a valid email"),
        firstName: string().required("A first name is required"),
        lastName: string().required("A last name is required"),
        password: string().required("A password is required"),
        confirmPassword: string()
          .required()
          .when("password", {
            is: (val: string) => (val && val.length > 0 ? true : false),
            then: string().oneOf(
              [ref("password")],
              "Both passwords need to be the same!"
            ),
          }),
        username: string(),
      }),
      onSubmit: handleRegister,
    });
  return (
    <Grid container direction={"row"} columns={12}>
      <Grid xs={0} sm={0} md={6} item>
        <Content bgcolor={theme.palette.primary.main}>
          <Typography variant="h2" color={"HighlightText"}>
            Welcome!
          </Typography>
        </Content>
      </Grid>
      <Grid xs={12} sm={12} md={6} item sx={{ pt: 4 }}>
        <Grid
          container
          component={"form"}
          direction={"column"}
          padding={4}
          spacing={4}
          noValidate
          onSubmit={handleSubmit}
          justifyContent={"center"}
        >
          <Grid item>
            <Typography variant={"h3"} color={theme.palette.primary.main}>
              SIGN UP
            </Typography>
          </Grid>
          {error && (
            <Grid item>
              <Alert sx={{ width: "100%" }} variant={"filled"} color={"error"}>
                {error}
              </Alert>
            </Grid>
          )}
          <Grid item>
            <Grid columnSpacing={2} container columns={12}>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  fullWidth={true}
                  name={"firstName"}
                  required
                  label={"First Name"}
                  value={values.firstName}
                  onChange={(e) => setFieldValue("firstName", e.target.value)}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName ? errors.firstName : undefined}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  fullWidth={true}
                  required
                  name={"lastName"}
                  label={"Last Name"}
                  value={values.lastName}
                  onChange={(e) => setFieldValue("lastName", e.target.value)}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName ? errors.lastName : undefined}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              type={"username"}
              fullWidth={true}
              name={"username"}
              label={"Username"}
              value={values.username}
              onChange={(e) => setFieldValue("username", e.target.value)}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username ? errors.username : undefined}
            />
          </Grid>
          <Grid item>
            <TextField
              type={"email"}
              fullWidth={true}
              name={"email"}
              required
              label={"Email"}
              value={values.email}
              onChange={(e) => setFieldValue("email", e.target.value)}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email ? errors.email : undefined}
            />
          </Grid>
          <Grid item>
            <Grid columnSpacing={2} container columns={12}>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  fullWidth={true}
                  name={"password"}
                  label={"Password"}
                  required
                  value={values.password}
                  onChange={(e) => setFieldValue("password", e.target.value)}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password ? errors.password : undefined}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  fullWidth={true}
                  name={"confirmPassword"}
                  label={"Confirm Password"}
                  value={values.confirmPassword}
                  required
                  onChange={(e) =>
                    setFieldValue("confirmPassword", e.target.value)
                  }
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  helperText={
                    touched.confirmPassword ? errors.confirmPassword : undefined
                  }
                />
              </Grid>
            </Grid>
            <Grid justifyContent={"right"} mt={4} item textAlign={"end"}>
              <Button type="submit" variant="contained" size="large">
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;
