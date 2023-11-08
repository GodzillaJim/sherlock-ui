import React, { useEffect, useMemo, useState } from "react";
import { EditorState } from "draft-js";
import useUploadAttachments from "../../../../helpers/orders/useUploadAttachments";
import {
  Attachment,
  AttachmentInput,
  Order,
  OrderInput,
  Type,
  useUpdateOrderMutation,
  WritingStyle,
} from "../../../../generated";
import { addDays } from "date-fns";
import { date, number, object, string } from "yup";
import { useFormik } from "formik";
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
} from "@mui/material";
import CustomEditor from "../../../../components/CustomEditor";
import FileUploader from "../../../../components/FileUploader";
import DateTimePicker from "../../../../components/DateTimePicker";
import MainLayout from "../../../../layout/MainLayout";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import AttachmentList from "../../../../components/edit/AttachmentList";
import { fromEditorState, toEditorState } from "../../../../helpers/editor";
import { getServerSideProps as getServerSidePropsCopy } from "./view";
import {
  GetOrderDocument,
  useGetOrderQuery,
} from "../../../../Apollo/schema/GetOrder.generated";

const EditOrder = ({ order }: { order: Order }) => {
  const isServerSide = typeof window === "undefined";
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();
  const { id } = router.query;
  const {
    uploadAttachments,
    error,
    loading: uploading,
  } = useUploadAttachments();
  const { data, loading: gettingOrder } = useGetOrderQuery({
    variables: { orderId: id as string },
  });
  const [
    updateOrder,
    { data: updated, error: updateError, loading: updating },
  ] = useUpdateOrderMutation({ refetchQueries: [GetOrderDocument] });

  const existingAttachments = useMemo(() => {
    if (order && order.attachments) return order.attachments as Attachment[];
    return [];
  }, [data]);

  useEffect(() => {
    if (updateError && !updating) {
      alert(updateError.message);
      console.log(updateError);
    }
    if (!updating && !updateError && updated) {
      alert("Success");
    }
  }, [updated, updateError, updating]);

  const loading = useMemo(() => {
    return updating || gettingOrder || uploading;
  }, [updating, gettingOrder, uploading]);

  useEffect(() => {
    if (isServerSide) {
      return;
    }
    setEditorState(() => EditorState.createEmpty());
  }, [isServerSide]);

  useEffect(() => {
    if (error) {
      console.log("UploadAttachmentsError: ", error);
      alert(error);
    }
  }, [error]);

  useEffect(() => {
    if (
      data &&
      data.getOrder &&
      data.getOrder.description &&
      data.getOrder.description !== ""
    ) {
      setEditorState(toEditorState(data.getOrder.description));
    }
  }, [data?.getOrder]);

  const initialValues: OrderInput = useMemo(() => {
    const temp = {
      deadline: addDays(new Date(), 1),
      numberOfPages: 1,
      title: "",
      type: Type.Article,
      writingStyle: WritingStyle.Apa7,
      description: "",
      attachments: [],
    };

    if (!data || !data.getOrder) {
      return temp;
    }
    const order = data.getOrder as Order;
    const savedAttachments = order.attachments as Attachment[];

    return {
      ...temp,
      ...order,
      attachments: savedAttachments.map(
        ({ key, name, location, mimeType }) => ({
          name: name as string,
          key: key as string,
          location: location as string,
          mimeType: mimeType || "",
        })
      ),
      deadline: dayjs(order.deadline).toDate(),
    };
  }, [data]);

  const requiredMessage = "This field is required!";

  const validationSchema = object().shape({
    title: string().required(requiredMessage),
    type: string().required(requiredMessage),
    numberOfPages: number().required(requiredMessage),
    writingStyle: string().required(requiredMessage),
    deadline: date().required(requiredMessage),
    description: string(),
  });

  const onSubmit = async ({
    writingStyle,
    wordsPerPage,
    type,
    title,
    numberOfPages,
    description,
    deadline,
    attachments,
  }: OrderInput) => {
    try {
      const orderInput = {
        writingStyle,
        wordsPerPage,
        type,
        title,
        numberOfPages,
        description,
        deadline,
        attachments,
      };
      if (files.length) {
        const newAttachments = await uploadAttachments(files);
        const verifyAttachments =
          newAttachments?.map(({ key, name, location, mimeType }) => ({
            key,
            name: name || key,
            location,
            mimeType,
          })) || [];
        const oldAttachments = attachments as AttachmentInput[];
        const verifyOldAttachments = oldAttachments.map(
          ({ key, name, mimeType, location }) => ({
            key,
            name: name || key,
            location,
            mimeType,
          })
        );
        orderInput.attachments = [
          ...verifyAttachments,
          ...verifyOldAttachments,
        ];
      }

      setFiles([]);

      orderInput.numberOfPages = parseInt(numberOfPages + "");

      await updateOrder({
        variables: {
          orderId: (id as string) || data?.getOrder?.orderId,
          orderInput,
        },
      });
      // eslint-disable-next-line
    } catch (e: any) {
      console.log("Upload attachments error: ", e);
      alert("Failed to upload: " + e.message);
    }
  };
  const { handleSubmit, values, setFieldValue, errors, touched } =
    useFormik<OrderInput>({
      initialValues,
      onSubmit,
      validationSchema,
      enableReinitialize: true,
    });

  useEffect(() => {
    setFieldValue("description", fromEditorState(editorState));
  }, [editorState]);

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
                  <Button
                    disabled={loading}
                    variant={"contained"}
                    color={"error"}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    disabled={loading}
                    onClick={() => handleSubmit()}
                    variant={"contained"}
                    color={"success"}
                  >
                    Save
                  </Button>
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
