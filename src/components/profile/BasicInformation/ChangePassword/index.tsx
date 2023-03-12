import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { object, string } from "yup";
import { useUpdatePasswordMutation } from "../../../../generated";

const ChangePassword = () => {
  const [updatePassword, { loading }] = useUpdatePasswordMutation({
    onCompleted: (data) => {
      alert(data.updatePassword?.message);
    },
    onError: (e) => {
      alert(e.message);
    },
  });
  const { values, setFieldValue, errors, touched, handleSubmit } = useFormik<{
    currentPassword: string;
    password: string;
    confirmPassword: string;
  }>({
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: object().shape({
      currentPassword: string().required("This field is required!"),
      password: string()
        .required("This field is required")
        .min(6, "Password must be at least 6 characters long!"),
      confirmPassword: string()
        .required("This field is required!")
        .test("passwords-match", "Passwords must match", function (value) {
          return this.parent.password === value;
        }),
    }),
    onSubmit: async (values: {
      currentPassword: string;
      password: string;
      confirmPassword: string;
    }) => {
      await updatePassword({
        variables: {
          payload: {
            currentPassword: values.currentPassword,
            newPassword: values.password,
          },
        },
      });
      console.log(values);
    },
  });

  const savePassword = () => {
    handleSubmit();
  };

  return (
    <div>
      <Card sx={{ p: 3 }}>
        <Typography variant="h6" color="InfoText">
          Change Password
        </Typography>
        <CardContent>
          <Grid container direction={"column"} gap={3}>
            <Grid item>
              <TextField
                size="small"
                fullWidth
                label="Current password"
                value={values.currentPassword}
                onChange={(e) =>
                  setFieldValue("currentPassword", e.target.value)
                }
                error={Boolean(
                  touched.currentPassword && errors.currentPassword
                )}
                helperText={
                  touched.currentPassword ? errors.currentPassword : undefined
                }
              />
            </Grid>
            <Grid item>
              <TextField
                size="small"
                fullWidth
                label="New password"
                value={values.password}
                onChange={(e) => setFieldValue("password", e.target.value)}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password ? errors.password : undefined}
              />
            </Grid>
            <Grid item>
              <TextField
                size="small"
                fullWidth
                label="Confirm new password"
                value={values.confirmPassword}
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
            <Grid item textAlign={"end"}>
              <Button
                type="button"
                onClick={savePassword}
                variant="contained"
                color="secondary"
                disabled={loading}
              >
                Save Password
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
