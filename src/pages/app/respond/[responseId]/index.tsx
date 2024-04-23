import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { EditorState } from "draft-js";
import useUploadAttachments from "../../../../helpers/orders/useUploadAttachments";
import { ResponseType, User } from "../../../../generated";
import { fromEditorState, toEditorState } from "../../../../helpers/editor";
import CustomEditor from "../../../../components/CustomEditor";
import FileUploader from "../../../../components/FileUploader";
import MainLayout from "../../../../layout/MainLayout";
import {
  GetOrderResponseDocument,
  useGetOrderResponseLazyQuery,
} from "../../../../Apollo/schema/GetOrderResponse.generated";
import { Attachment, OrderResponseInput } from "../../../../../graphql/common";
import { useUpdateOrderResponseMutation } from "../../../../Apollo/schema/UpdateOrderResponse.generated";
import SideModalOrderDetails from "../../../../components/SideModalOrderDetails";
import { useAuth } from "../../../../Context/AuthManager";
import { useCurrentUserQuery } from "../../../../Apollo/schema/CurrentUserQuery.generated";
import { isAdmin } from "../../../../helpers/User";
import CustomLoader from "../../../../components/CustomLoader";
import {
  DeleteOutlined,
  DescriptionOutlined,
  Folder,
  Publish,
  Unpublished,
} from "@mui/icons-material";
import { usePublishResponseMutation } from "../../../../Apollo/schema/PublishResponse.generated";
import { useUnPublishResponseMutation } from "../../../../Apollo/schema/UnPublishResponse.generated";
import AttachmentList from "../../../../components/edit/AttachmentList";
import { useDeleteOrderResponseMutation } from "../../../../Apollo/schema/DeleteOrderResponse.generated";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { GetOrderDocument } from "../../../../Apollo/schema/GetOrder.generated";

const ResponseDetails = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [files, setFiles] = useState<File[]>([]);
  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  const params = useSearchParams();
  const router = useRouter();
  const auth = useAuth();
  const { data: userData } = useCurrentUserQuery();

  const [
    getResponseOrder,
    {
      loading: gettingResponse,
      error: gettingResponseError,
      data: responseData,
    },
  ] = useGetOrderResponseLazyQuery();

  useEffect(() => {
    const responseId = router.query.responseId as string;
    console.log("ResponseId: ", responseId);
    if (responseId) {
      getResponseOrder({ variables: { responseId } }).then();
    }
  }, [params]);

  const [updateOrderResponse, { loading, error: updateError, data }] =
    useUpdateOrderResponseMutation({
      refetchQueries: [GetOrderResponseDocument],
    });

  const [
    publishResponse,
    { loading: publishingResponse, error: publishingResponseError },
  ] = usePublishResponseMutation({
    refetchQueries: [GetOrderResponseDocument, GetOrderDocument],
  });

  const [unPublishResponse, { loading: unPublishingResponse }] =
    useUnPublishResponseMutation({
      refetchQueries: [GetOrderResponseDocument, GetOrderDocument],
    });

  const [deleteOrderResponse, { error: deletingResponseError }] =
    useDeleteOrderResponseMutation({ refetchQueries: [GetOrderDocument] });

  const response = useMemo(() => {
    if (responseData?.getOrderResponse)
      return responseData.getOrderResponse.data;
    return null;
  }, [responseData]);

  const handleDelete = async () => {
    if (response?.id) {
      await deleteOrderResponse({ variables: { responsesId: response.id } });
      toast.success("Operation successfully");
      await router.back();
    }
  };

  useEffect(() => {
    if (data) {
      toast.success("Operation successful!");
    }
  }, [data]);

  const readOnly = useMemo(() => {
    if (userData?.me) {
      if (isAdmin(userData.me as User)) return false;
      if (userData.me.id === response?.createdBy?.id) return false;
    }
    return true;
  }, [auth, userData, response]);

  const prepareResponse = async (
    orderId: string,
    values: OrderResponseInput
  ): Promise<OrderResponseInput> => {
    const orderResponse = { ...values };
    if (files.length) {
      orderResponse.attachments = await uploadAttachments(files);
    }

    return orderResponse;
  };

  const {
    uploadAttachments,
    error: fileUploadError,
    loading: uploading,
  } = useUploadAttachments();
  const { values, setFieldValue, handleSubmit, setValues } =
    useFormik<OrderResponseInput>({
      initialValues: {
        answer: "",
        attachments: [],
        comments: "",
        responseType:
          ResponseType.Text as unknown as OrderResponseInput["responseType"],
      },
      onSubmit: async (values) => {
        const orderId = response?.question?.orderId;

        if (!orderId) return;
        const input = await prepareResponse(orderId, values);
        await updateOrderResponse({
          variables: {
            orderId,
            responseId: response.id,
            orderResponseInput: input,
          },
        });
        setFiles([]);
      },
      enableReinitialize: true,
    });

  useEffect(() => {
    if (response) {
      const responseType = response?.responseType as ResponseType;
      setValues({
        comments: response.comments,
        responseType: responseType,
      });

      if (response.answer) {
        setEditorState(
          response.answer
            ? toEditorState(response.answer)
            : EditorState.createEmpty()
        );
      }
    }
  }, [response]);

  useEffect(() => {
    setFieldValue("answer", fromEditorState(editorState));
  }, [editorState]);

  const disableForm = useMemo(
    () =>
      uploading ||
      loading ||
      publishingResponse ||
      unPublishingResponse ||
      gettingResponse,
    [
      uploading,
      loading,
      publishingResponse,
      unPublishingResponse,
      gettingResponse,
    ]
  );

  const errorMessage = useMemo(() => {
    if (gettingResponseError) return gettingResponseError.message;
    if (updateError) return updateError.message;
    if (fileUploadError) return fileUploadError;
    if (publishingResponseError) return publishingResponseError.message;
    if (deletingResponseError) return deletingResponseError.message;

    return null;
  }, [
    gettingResponseError,
    updateError,
    fileUploadError,
    publishingResponseError,
  ]);

  const handlePublishResponse = async () => {
    const responseId = response?.id;
    if (responseId) {
      await publishResponse({ variables: { responseId } });
    }
  };

  const handleUnPublishResponse = async () => {
    const responseId = response?.id;
    if (responseId) {
      await unPublishResponse({ variables: { responseId } });
    }
  };

  const canDelete = useMemo(() => {
    if (!auth.localUser) return false;
    if (isAdmin(auth?.localUser)) return true;
    return response?.createdBy?.id === auth.localUser.id;
  }, [auth]);

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container flexDirection={"column"} gap={2}>
        {errorMessage && (
          <Grid item>
            <Alert variant={"outlined"} color={"error"}>
              {errorMessage}
            </Alert>
          </Grid>
        )}
        {gettingResponse && <CustomLoader />}
        {response && (
          <>
            <Grid item>
              <Grid container justifyContent={"right"} gap={2}>
                {response && !readOnly && (
                  <Grid item>
                    {!response.published && (
                      <Button
                        variant={"outlined"}
                        startIcon={<Publish />}
                        onClick={handlePublishResponse}
                        disabled={disableForm}
                      >
                        Publish
                      </Button>
                    )}
                    {response.published && (
                      <Button
                        onClick={handleUnPublishResponse}
                        variant={"outlined"}
                        startIcon={<Unpublished />}
                        disabled={disableForm}
                      >
                        UnPublish
                      </Button>
                    )}
                  </Grid>
                )}
                {canDelete && (
                  <Grid item>
                    <Button
                      variant={"outlined"}
                      color={"error"}
                      startIcon={<DeleteOutlined />}
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justifyContent={"space-between"}>
                <Grid item>
                  {readOnly && (
                    <ListItem>
                      <ListItemIcon sx={{ marginRight: -1 }}>
                        <DescriptionOutlined />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          values.responseType === "text"
                            ? "Written text"
                            : "Attachment"
                        }
                        secondary={"Response Type"}
                      />
                    </ListItem>
                  )}
                  {!readOnly && (
                    <FormControl
                      component={"fieldset"}
                      disabled={disableForm || readOnly}
                    >
                      <FormLabel component={"legend"}>Response Type</FormLabel>
                      <RadioGroup
                        aria-label={"response-type"}
                        value={values.responseType}
                        onChange={(_e, value) => {
                          setFieldValue("responseType", value);
                        }}
                      >
                        <FormControlLabel
                          value={ResponseType.Text}
                          control={<Radio />}
                          label={"Write Answer"}
                        />
                        <FormControlLabel
                          value={ResponseType.Attachment}
                          control={<Radio />}
                          label={"Attach File"}
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                </Grid>
                <Grid item>
                  {response.question?.orderId && (
                    <Button
                      onClick={() => setOpenOrderDetails(true)}
                      type={"button"}
                      variant={"text"}
                    >
                      View Order
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
            {values.responseType === ResponseType.Text && (
              <Grid item>
                <CustomEditor
                  onChange={(content) => setEditorState(content)}
                  value={editorState}
                  readView={readOnly}
                  label={"Response"}
                />
                <Divider />
              </Grid>
            )}

            {values.responseType === ResponseType.Attachment && (
              <Grid item>
                <FileUploader
                  onChange={(files) => setFiles(files)}
                  files={files}
                  disabled={readOnly}
                />
                <Divider />
                {response.id && response.attachments?.length ? (
                  <AttachmentList
                    attachments={response.attachments as Attachment[]}
                    pageType={"ORDER_RESPONSE"}
                    parentEntityId={response?.id}
                    hideDeleteButton={readOnly}
                  />
                ) : (
                  ""
                )}
              </Grid>
            )}

            <Grid item>
              <TextField
                label={"Additional comments"}
                fullWidth
                multiline={true}
                minRows={4}
                value={values.comments}
                InputProps={{ readOnly }}
                disabled={disableForm}
                onChange={(e) => setFieldValue("comments", e.target.value)}
              />
              <Divider />
            </Grid>
            {!readOnly && (
              <Grid item>
                <Button
                  variant={"contained"}
                  type={"submit"}
                  startIcon={<Folder />}
                  disabled={disableForm}
                >
                  Save Response
                </Button>
              </Grid>
            )}
            {response.question?.orderId && (
              <SideModalOrderDetails
                open={openOrderDetails}
                handleClose={() => setOpenOrderDetails(false)}
                orderId={response.question?.orderId}
              />
            )}
          </>
        )}
      </Grid>
    </form>
  );
};

ResponseDetails.getLayout = (page: ReactNode) => (
  <MainLayout>{page}</MainLayout>
);
export default ResponseDetails;
