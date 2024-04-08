import React, { useMemo } from "react";
import { EditorState } from "draft-js";
import { Order } from "../../../../../graphql/common";
import Dropdown from "../../../../components/Dropdown";
import {
  Autocomplete,
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import CustomEditor from "../../../../components/CustomEditor";
import FileUploader from "../../../../components/FileUploader";
import DateTimePicker from "../../../../components/DateTimePicker";
import { useRouter } from "next/router";
import AttachmentList from "../../../../components/edit/AttachmentList";
import {
  AutoStories,
  Cancel,
  CheckOutlined,
  FolderCopy,
  Numbers,
} from "@mui/icons-material";
import { useEditOrder } from "../../../../helpers/orders/useEditOrder";
import {
  essayCategories,
  getAcademicLevelOptions,
  getOrderStatusIndex,
  getOrderTypeOptions,
  getWritingStyleOptions,
} from "../../../../helpers/utils";
import dayjs from "dayjs";
import SelectionTabs from "../../../../components/common/SelectionTabs";
import ProgressSteppers from "../../../../components/common/ProgressSteppers";
import MainLayout from "../../../../layout/MainLayout";
import ErrorMessage from "../../../../components/ErrorMessage";
import { GetServerSidePropsContext } from "next";
import { createApolloClient } from "../../../../Apollo";
import { GetOrderDocument, GetOrderQuery } from "../../../../Apollo/schema/GetOrder.generated";

const EditOrder = ({ order }: { order: Order }) => {
  const isServerSide = typeof window === "undefined";

  const router = useRouter();
  const { id } = router.query;
  const {
    formik,
    existingAttachments,
    totalPrice,
    loading,
    editorState,
    setEditorState,
    files,
    setFiles,
    handleCheckout,
  } = useEditOrder({
    orderId: (id || "") as string,
  });

  const { handleSubmit, values, setFieldValue, errors, touched } = formik;

  const handleEditorChange = (content: EditorState) => {
    setEditorState(content);
  };

  const handleCancel = () => {
    router.push(`/app/order/${order.orderId}/view`);
  };

  const academicLevel = useMemo(() => {
    return getAcademicLevelOptions().find(
      (option) => option.value === values.academicLevel
    );
  }, [values]);

  const isPaid = order.price?.paymentStatus === "PAID";
  const statusIndex = getOrderStatusIndex(order.status);

  if (isServerSide) return <div />;
  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2} columns={12} pb={2} flexDirection={"column"} mt={1}>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <ProgressSteppers activeStep={isPaid ? 3 : 1} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={8} id={"main-content"}>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <Card>
                <CardContent>
                  <Grid container flexDirection={"column"} gap={6}>
                    <Grid item>
                      <TextField
                        size="small"
                        label={"Title"}
                        fullWidth
                        value={values.title}
                        onChange={(e) =>
                          setFieldValue("title", e.target.value || "")
                        }
                        error={Boolean(touched.title && errors.title)}
                        helperText={touched.title ? errors.title : undefined}
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={"Discipline"}
                            size={"small"}
                          />
                        )}
                        options={essayCategories}
                        disabled={loading}
                        disablePortal
                        value={values.discipline}
                        onChange={(e, value) =>
                          setFieldValue("discipline", value)
                        }
                      />
                    </Grid>
                    <Grid item>
                      <SelectionTabs
                        value={academicLevel}
                        options={getAcademicLevelOptions()}
                        onChange={(option) =>
                          setFieldValue("academicLevel", option.value)
                        }
                        label={"Academic Level"}
                      />
                    </Grid>
                    <Grid item>
                      <Grid container gap={2}>
                        <Grid item>
                          <TextField
                            label="Number of Pages"
                            type="number"
                            value={values.numberOfPages}
                            onChange={(e) =>
                              setFieldValue("numberOfPages", e.target.value)
                            }
                            error={Boolean(
                              touched.numberOfPages && errors.numberOfPages
                            )}
                            helperText={
                              touched.numberOfPages && errors.numberOfPages
                            }
                            size="small"
                            disabled={loading}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position={"start"}>
                                  <AutoStories />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            label={"Words per page"}
                            value={values.wordsPerPage}
                            type={"number"}
                            onChange={(e) =>
                              setFieldValue("wordsPerPage", e.target.value)
                            }
                            error={Boolean(
                              touched.wordsPerPage && errors.wordsPerPage
                            )}
                            helperText={
                              touched.wordsPerPage && errors.wordsPerPage
                            }
                            size="small"
                            disabled={loading}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position={"start"}>
                                  <Numbers />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <DateTimePicker
                        label="Deadline"
                        value={dayjs(values.deadline).toDate()}
                        onChange={(date) => setFieldValue("deadline", date)}
                        disablePast
                        setValue={(date) => setFieldValue("deadline", date)}
                        disabled={loading}
                      />
                    </Grid>
                    <Grid item>
                      <Grid container gap={2}>
                        <Grid item xs={5}>
                          <Dropdown
                            label="Type of Work"
                            options={getOrderTypeOptions()}
                            value={values.type}
                            onChange={(val) => setFieldValue("type", val)}
                            touched={touched.type}
                            error={Boolean(touched.type && errors.type)}
                            helperText={
                              touched.type && errors.type
                                ? errors.type
                                : undefined
                            }
                            disabled={loading}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <Dropdown
                            label="Writing Style"
                            options={getWritingStyleOptions()}
                            value={values.writingStyle}
                            onChange={(val) =>
                              setFieldValue("writingStyle", val)
                            }
                            touched={touched.writingStyle}
                            error={Boolean(
                              touched.writingStyle && errors.writingStyle
                            )}
                            helperText={
                              touched.writingStyle && errors.writingStyle
                                ? errors.writingStyle
                                : undefined
                            }
                            disabled={loading}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Paper sx={{ p: 3 }}>
                <CustomEditor
                  value={editorState}
                  onChange={handleEditorChange}
                  readView={false}
                  required
                  error={Boolean(touched.description && errors.description)}
                  helperText={
                    touched.description && errors.description
                      ? errors.description
                      : undefined
                  }
                />
              </Paper>
            </Grid>
            <Grid item>
              <Card sx={{ p: 3 }}>
                <FileUploader
                  files={files}
                  onChange={(files: File[]) => setFiles(files)}
                />
                <Grid
                  container
                  spacing={1}
                  direction={"column"}
                  sx={{ overflow: "auto" }}
                >
                  {existingAttachments.length ? (
                    <AttachmentList
                      attachments={existingAttachments}
                      parentEntityId={order.orderId}
                      pageType={"ORDER"}
                    />
                  ) : (
                    ""
                  )}
                </Grid>
              </Card>
            </Grid>
            <Grid item>
              <Grid container spacing={3} justifyContent={"end"}>
                <Grid item>
                  <Tooltip title="Changes will not be saved">
                    <Button
                      disabled={loading}
                      variant={"contained"}
                      color={"error"}
                      onClick={handleCancel}
                      startIcon={<Cancel />}
                    >
                      Cancel
                    </Button>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip
                    title={
                      !(statusIndex >= 2)
                        ? "Save changes as draft. Writers will not see this order yet. You can return later to submit."
                        : "You can't make changes because the work has started. "
                    }
                  >
                    <Button
                      disabled={loading || statusIndex >= 2}
                      onClick={() => handleSubmit()}
                      variant={"contained"}
                      color={"success"}
                      startIcon={<FolderCopy />}
                    >
                      Save
                    </Button>
                  </Tooltip>
                </Grid>
                {!isPaid ? (
                  <Grid item>
                    <Tooltip
                      title={
                        "Submit the order for writers to work on it. You will have a limited window to make changes after checkout."
                      }
                    >
                      <Button
                        variant="contained"
                        disabled={loading}
                        type="button"
                        startIcon={<CheckOutlined />}
                        onClick={handleCheckout}
                      >
                        Checkout {totalPrice ? `$ ${totalPrice}` : ""}
                      </Button>
                    </Tooltip>
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

type WrapperProps = {
  error?: { message: string };
  order?: Order;
};
const Wrapper = ({ error, order }: WrapperProps) => {
  return (
    <>
      {error && <ErrorMessage message={error.message} />}
      {order && <EditOrder order={order} />}
    </>
  );
};

Wrapper.getLayout = function (page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const authToken = context.req.cookies.authToken;
    if (!authToken) {
      return { props: { error: { message: "Login to continue" } } };
    }
    const client = createApolloClient(authToken);

    const orderId = context?.params?.id;
    if (!orderId) return;

    const { data, error } = await client.query<GetOrderQuery>({
      query: GetOrderDocument,
      variables: { orderId },
    });

    if (error) {
      return { props: { error: error.message } };
    }

    const canEditStatus: OrderStatus[] = ["ACTIVE", "DRAFT"];
    if (data.getOrder && !canEditStatus.includes(data.getOrder?.status)) {
      return {
        redirect: {
          destination: `/app/order/${orderId}/view`,
          permanent: false
        }
      }
    }

    return { props: { order: data.getOrder } };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any /*tslint:disable-line:no-explicit-any*/) {
    console.log("Error: ", error);
    return {
      props: { error: { message: error?.message || "Something went wrong" } },
    };
  }
}

export default Wrapper;
