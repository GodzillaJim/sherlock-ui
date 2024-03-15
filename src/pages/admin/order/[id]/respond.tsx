import React, { ReactNode, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { EditorState } from "draft-js";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import useUploadAttachments from "../../../../helpers/orders/useUploadAttachments";
import { useAddOrderResponseMutation } from "../../../../Apollo/schema/AddOrderResponse.generated";
import { ResponseType } from "../../../../generated";
import { OrderResponseInput } from "../../../../../graphql/common";
import { fromEditorState } from "../../../../helpers/editor";
import CustomEditor from "../../../../components/CustomEditor";
import FileUploader from "../../../../components/FileUploader";
import MainLayout from "../../../../layout/MainLayout";
import SideModalOrderDetails from "../../../../components/SideModalOrderDetails";
import { PostAddOutlined } from "@mui/icons-material";

const Respond = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  const params = useSearchParams();

  const orderId = params.get("id");

  const [addOrderResponse, { loading: creating, error: creationError }] =
    useAddOrderResponseMutation();

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
  const { values, setFieldValue, handleSubmit, isSubmitting } =
    useFormik<OrderResponseInput>({
      initialValues: {
        answer: "",
        attachments: [],
        comments: "",
        responseType: ResponseType.Text,
      },
      onSubmit: async (values) => {
        const orderId = router.query.id;
        console.log("Submitting: ", {
          orderId,
          values,
          params: router.query,
        });

        if (!orderId) return;
        const input = await prepareResponse(orderId, values);
        console.log("Responses: ", { values, input });

        const { data } = await addOrderResponse({
          variables: { orderId, orderResponse: input },
        });

        if (data) {
          router.push(`/app/respond/${data.addOrderResponse?.data}`);
        }
      },
    });

  useEffect(() => {
    setFieldValue("answer", fromEditorState(editorState));
  }, [editorState]);

  const disableForm = useMemo(
    () => uploading || creating || isSubmitting,
    [uploading, creating]
  );

  const error = useMemo(() => {
    return fileUploadError || creationError?.message;
  }, [fileUploadError, creationError]);

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container flexDirection={"column"} gap={2}>
        {error && (
          <Grid item>
            <Alert variant={"outlined"} color={"error"}>
              {error}
            </Alert>
          </Grid>
        )}
        <Grid item>
          {orderId && (
            <Button
              sx={{ float: "end" }}
              onClick={() => setOpenOrderDetails(true)}
              type={"button"}
              variant={"text"}
            >
              View Order
            </Button>
          )}
        </Grid>
        <Grid item>
          <FormControl component={"fieldset"} disabled={disableForm}>
            <FormLabel component={"legend"}>Response Type</FormLabel>
            <RadioGroup
              aria-label={"response-type"}
              value={values.responseType}
              onChange={(_e, value) => {
                console.log("Response Type: ", value);
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
          <Divider />
        </Grid>
        <Grid item>
          {values.responseType === ResponseType.Text && (
            <CustomEditor
              onChange={(content) => setEditorState(content)}
              value={editorState}
              readView={false}
              label={"Write your answer below"}
            />
          )}
          {values.responseType === ResponseType.Attachment && (
            <FileUploader onChange={(files) => setFiles(files)} files={files} />
          )}
          <Divider />
        </Grid>
        <Grid item>
          <TextField
            label={"Additional comments"}
            fullWidth
            multiline={true}
            minRows={4}
            value={values.comments}
            disabled={disableForm}
            onChange={(e) => setFieldValue("comments", e.target.value)}
          />
          <Divider />
        </Grid>
        <Grid item>
          <Button
            variant={"contained"}
            type={"submit"}
            startIcon={<PostAddOutlined />}
            disabled={disableForm}
          >
            Save Response
          </Button>
        </Grid>
      </Grid>
      {orderId && (
        <SideModalOrderDetails
          open={openOrderDetails}
          handleClose={() => setOpenOrderDetails(false)}
          orderId={orderId}
        />
      )}
    </form>
  );
};

Respond.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

export default Respond;
