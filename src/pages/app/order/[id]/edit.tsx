import React from "react";
import { EditorState } from "draft-js";
import { Order, Type, WritingStyle } from "../../../../generated";
import Dropdown, { DropdownOption } from "../../../../components/Dropdown";
import { getEnumAsArray } from "../../../../helpers/HelperFunctions";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import CustomEditor from "../../../../components/CustomEditor";
import FileUploader from "../../../../components/FileUploader";
import DateTimePicker from "../../../../components/DateTimePicker";
import MainLayout from "../../../../layout/MainLayout";
import { useRouter } from "next/router";
import AttachmentList from "../../../../components/edit/AttachmentList";
import { getServerSideProps as getServerSidePropsCopy } from "./view";
import { Cancel, CheckOutlined, FolderCopy } from "@mui/icons-material";
import { useEditOrder } from "../../../../helpers/orders/useEditOrder";

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
  } = useEditOrder({
    orderId: (id || "") as string,
  });

  const { handleSubmit, values, setFieldValue, errors, touched } = formik;
  const getOrderTypeOptions = (): DropdownOption[] => {
    return getEnumAsArray(Type);
  };

  const getWritingStyleOptions = (): DropdownOption[] => {
    return getEnumAsArray(WritingStyle);
  };

  const handleEditorChange = (content: EditorState) => {
    setEditorState(content);
  };

  const handleCancel = () => {
    router.push(`/app/order/${order.orderId}/view`);
  };

  if (isServerSide) return <div />;
  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2} columns={12} pb={2}>
        <Grid item xs={12} sm={12} md={12} lg={8} id={"main-content"}>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <Card>
                <CardContent>
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
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Paper sx={{ p: 3 }}>
                <CustomEditor
                  value={editorState}
                  onChange={handleEditorChange}
                  readView={false}
                />
              </Paper>
            </Grid>
            <Grid item>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: (theme) => theme.spacing(5),
                    }}
                  >
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
                      helperText={touched.numberOfPages && errors.numberOfPages}
                      size="small"
                      disabled={loading}
                    />
                    <DateTimePicker
                      label="Deadline"
                      value={values.deadline}
                      onChange={(date) => setFieldValue("deadline", date)}
                      disablePast
                      setValue={(date) => setFieldValue("deadline", date)}
                      disabled={loading}
                    />
                    <Dropdown
                      label="Type of Work"
                      options={getOrderTypeOptions()}
                      value={values.type}
                      onChange={(val) => setFieldValue("type", val)}
                      touched={touched.type}
                      error={Boolean(touched.type && errors.type)}
                      helperText={
                        touched.type && errors.type ? errors.type : undefined
                      }
                      disabled={loading}
                    />
                    <Dropdown
                      label="Writing Style"
                      options={getWritingStyleOptions()}
                      value={values.writingStyle}
                      onChange={(val) => setFieldValue("writingStyle", val)}
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
                  </Box>
                </CardContent>
              </Card>
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
                  <Tooltip title="Save changes as draft. Writers will not see this order yet. You can return later to submit.">
                    <Button
                      disabled={loading}
                      onClick={() => handleSubmit()}
                      variant={"contained"}
                      color={"success"}
                      startIcon={<FolderCopy />}
                    >
                      Save
                    </Button>
                  </Tooltip>
                </Grid>
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
                    >
                      Checkout {totalPrice ? `$ ${totalPrice}` : ""}
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

EditOrder.getLayout = function (page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};

export const getServerSideProps = getServerSidePropsCopy;
export default EditOrder;
