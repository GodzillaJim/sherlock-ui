import React, { useEffect, useMemo } from "react";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import {
  LoggedInUserDocument,
  User,
  useUpdateUserMutation,
} from "../../../generated";
import CustomLoader from "../../CustomLoader";
import languages from "@cospired/i18n-iso-languages";
import en from "@cospired/i18n-iso-languages/langs/en.json";
import currencyCodes from "currency-codes";
import timezones from "timezones.json";
import ChangePasword from "./ChangePassword";
import { object, string } from "yup";
import { useAuth } from "../../../Context/AuthManager";

languages.registerLocale(en);

const AdditionalInformation = () => {
  const { user: data, loading } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [updateUser, { loading: updating }] = useUpdateUserMutation({
    refetchQueries: [LoggedInUserDocument],
    onCompleted: () => alert("Success"),
    onError: (e) => {
      console.log("Error: ", e);
      alert(e.message);
    },
  });

  const user = useMemo(() => {
    return { password: "", email: "", firstName: "", id: "", lastName: "" };
  }, [data]);

  const formik = useFormik<User>({
    initialValues: user,
    validationSchema: object().shape({
      email: string().required("This field is required"),
      firstName: string().required("This field is required"),
      lastName: string().required("This field is required"),
      username: string().required("This field is required"),
    }),
    onSubmit: async (values: User) => {},
  });

  useEffect(() => {
    if (data) {
      formik.setValues({ ...user });
    }
  }, [data]);

  const { values, errors, touched, setFieldValue } = formik;
  const languageOptions = () => {
    const codes = languages.getAlpha2Codes();
    const options = [];

    for (const field in codes) {
      options.push({
        value: field,
        label: languages.getName(codes[field], "en"),
      });
    }
    return options;
  };

  const getTimezones = () => {
    return timezones.map((timezone) => ({ ...timezone, label: timezone.text }));
  };

  const getCurrencyOptions = () => {
    return currencyCodes.data.map((cc) => ({
      ...cc,
      value: cc.code,
      label: cc.currency,
    }));
  };

  return (
    <>
      {loading && <CustomLoader />}
      {data && (
        <form onSubmit={formik.handleSubmit} noValidate>
          <Grid container direction={"column"} gap={2}>
            <Grid item>
              <Grid container direction={"row"} gap={1}>
                <Grid xs={12} sm={12} md={8} item>
                  <Grid container direction={"column"} gap={3}>
                    <Grid item>
                      <Card>
                        <CardContent>
                          <Grid container direction={"column"} gap={4}>
                            <Grid item>
                              <Grid
                                container
                                direction="row"
                                justifyContent={"space-between"}
                                gap={1}
                              >
                                <div>
                                  <TextField
                                    size="small"
                                    label="First Name"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={(e) =>
                                      setFieldValue("firstName", e.target.value)
                                    }
                                    error={Boolean(
                                      touched.firstName && errors.firstName
                                    )}
                                    helperText={
                                      touched.firstName
                                        ? errors.firstName
                                        : undefined
                                    }
                                  />
                                </div>
                                <div>
                                  <TextField
                                    size="small"
                                    label="Last Name"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={(e) =>
                                      setFieldValue("lastName", e.target.value)
                                    }
                                    error={Boolean(
                                      touched.lastName && errors.lastName
                                    )}
                                    helperText={
                                      touched.lastName
                                        ? errors.lastName
                                        : undefined
                                    }
                                  />
                                </div>
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Grid item>
                                <TextField
                                  fullWidth
                                  disabled
                                  size="small"
                                  label="Email"
                                  name="email"
                                  value={values.email}
                                />
                              </Grid>
                            </Grid>
                            <Grid item>
                              <div>
                                <TextField
                                  fullWidth
                                  size="small"
                                  label="Username"
                                  name="username"
                                  value={values.username}
                                  onChange={(e) =>
                                    setFieldValue("username", e.target.value)
                                  }
                                  error={Boolean(
                                    touched.username && errors.username
                                  )}
                                  helperText={
                                    touched.username
                                      ? errors.username
                                      : undefined
                                  }
                                />
                              </div>
                            </Grid>
                            {!isMobile && (
                              <Grid item textAlign={"end"}>
                                <Button
                                  disabled={updating || loading}
                                  type="submit"
                                  variant="contained"
                                  color="secondary"
                                >
                                  Save Changes
                                </Button>
                              </Grid>
                            )}
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item>
                      <ChangePasword />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={12} sm={12} md={3} item>
                  <Card>
                    <CardContent>
                      <Grid gap={2} container direction={"column"}>
                        <Grid item>
                          <div>
                            <Autocomplete
                              options={languageOptions()}
                              disablePortal
                              id="language-selector"
                              onChange={(_e, val) =>
                                setFieldValue("language", val?.value)
                              }
                              value={
                                languageOptions().find(
                                  ({ value }) => values.language === value
                                ) || languageOptions()[0]
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Primary Language"
                                  size="small"
                                  fullWidth
                                />
                              )}
                            />
                          </div>
                        </Grid>
                        <Divider />
                        <Grid item>
                          <div>
                            <Autocomplete
                              options={getTimezones()}
                              disablePortal
                              id="timezone-selector"
                              onChange={(_e, val) =>
                                setFieldValue("timezone", val)
                              }
                              value={
                                getTimezones().find(
                                  ({ value }) =>
                                    values.timezone?.value === value
                                ) || getTimezones()[0]
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Timezone"
                                  size="small"
                                  fullWidth
                                />
                              )}
                            />
                          </div>
                        </Grid>
                        <Divider />
                        <Grid item>
                          <div>
                            <Autocomplete
                              options={getCurrencyOptions()}
                              disablePortal
                              id="currency-selector"
                              onChange={(_e, val) =>
                                setFieldValue("currency", val?.code)
                              }
                              value={
                                getCurrencyOptions().find(
                                  ({ value }) => values.currency === value
                                ) || getCurrencyOptions()[0]
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Currency"
                                  size="small"
                                  fullWidth
                                />
                              )}
                            />
                          </div>
                        </Grid>
                        {isMobile && (
                          <Grid item textAlign={"end"}>
                            <Button
                              disabled={updating || loading}
                              type="submit"
                              variant="contained"
                              color="secondary"
                            >
                              Save Changes
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};

export default AdditionalInformation;
