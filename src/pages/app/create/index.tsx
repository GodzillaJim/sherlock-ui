import React, { useEffect, useState } from "react";
import MainLayout from "../../../layout/MainLayout";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormGroup,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import {
  MutationCreateOrderFromTitleArgs,
  useCreateOrderFromTitleMutation,
} from "../../../generated";
import { object, string } from "yup";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  ColorlibConnector,
  ColorlibStepIcon,
} from "../../../components/common/CustomStepLabel";
import { withRequireAuth } from "../../../Context/AuthManager/withRequireAuth";
import { GetMyOrdersDocument } from "../../../Apollo/schema/GetMyOrders.generated";
import { ArrowForwardIosOutlined } from "@mui/icons-material";

const CreateButton = styled(Button)`
  height: 56px;
  width: 145px;
`;

const CreateOrder = () => {
  const [createOrderFromTitle, { loading, data, error }] =
    useCreateOrderFromTitleMutation({
      onError: (error1) => {
        console.log("Error: ", { error1 });
      },
      refetchQueries: [GetMyOrdersDocument],
    });
  const router = useRouter();

  useEffect(() => {
    if (data && data.createOrderFromTitle) {
      router.push(`/app/order/${data.createOrderFromTitle?.data}/edit`).then();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  const { handleSubmit, handleChange, errors, values, touched, isValid } =
    useFormik<MutationCreateOrderFromTitleArgs>({
      initialValues: {
        title: "",
      },
      validationSchema: object().shape({
        title: string().required("A title is required"),
      }),
      onSubmit: async (parameters) => {
        await createOrderFromTitle({ variables: { title: parameters.title } });
      },
    });

  const steps = [
    "Add a title",
    "Update instructions",
    "Reserve payment",
    "Track progress",
    "Collect your paper",
  ];

  const [activeStep] = useState(5);

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={3}
      pt={5}
    >
      <Grid item>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                <Typography variant={"caption"}>{label}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item xs={12} sm={12} md={7} mt={5}>
        <Card sx={{ width: 600 }}>
          <CardContent>
            <Grid container direction={"column"} spacing={3}>
              <Grid item>
                <Typography variant={"h6"}>Create order</Typography>
              </Grid>
              <Divider />
              <Grid item>
                <form noValidate onSubmit={handleSubmit}>
                  <FormGroup>
                    <Grid container gap={2} flexDirection={'column'}>
                      <Grid item xs={12}>
                        <TextField
                          multiline
                          minRows={4}
                          name={"title"}
                          value={values.title}
                          onChange={handleChange}
                          error={Boolean(touched.title && errors.title)}
                          helperText={touched.title && errors.title}
                          size={"medium"}
                          fullWidth
                          label={"Enter a title for your paper"}
                          placeholder="Example: The bold and the beautiful"
                        />
                      </Grid>
                      <Grid item xs={12} display={"flex"} justifyContent={"end"} width={'100%'}>
                        <Button
                          disabled={values.title === "" || !isValid || loading}
                          type={"submit"}
                          variant={"contained"}
                          endIcon={
                            loading ? (
                              <CircularProgress
                                size={15}
                                sx={{
                                  color: (theme) => theme.palette.primary.main,
                                    marginLeft: 0.5,
                                    marginBottom: 0.2
                                }}
                              />
                            ) : (
                              <ArrowForwardIosOutlined />
                            )
                          }
                        >
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </FormGroup>
                </form>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

CreateOrder.getLayout = function (page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps = withRequireAuth();

export default CreateOrder;
