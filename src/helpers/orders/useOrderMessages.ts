import { GetOrderDocument } from "../../Apollo/schema/GetOrder.generated";
import { useSendOrderMessageMutation } from "../../Apollo/schema/SendOrderMessage.generated";
import { useFormik } from "formik";
import { object, string } from "yup";
import {
  AttachmentInput,
  SendOrderMessageInput,
} from "../../../graphql/common";
import { toast } from "react-toastify";
import { useMemo, useState } from "react";
import useUploadAttachments from "./useUploadAttachments";
import {
  GetMessagesByOrderIdDocument,
  useGetMessagesByOrderIdQuery,
} from "../../Apollo/schema/GetMessagesByOrderId.generated";

const useOrderMessages = (orderId: string) => {
  const [files, setFiles] = useState<File[]>([]);

  const {
    data,
    error: messageErrors,
    loading,
  } = useGetMessagesByOrderIdQuery({ variables: { orderId } });

  const {
    loading: attaching,
    uploadAttachments,
    error,
  } = useUploadAttachments();

  const [sendMessage, { loading: sending, error: sendingError }] =
    useSendOrderMessageMutation({
      refetchQueries: [GetOrderDocument, GetMessagesByOrderIdDocument],
    });

  const onSubmit = async (values: { message: string }) => {
    // Check if there are any attachments
    let attachments: AttachmentInput[] = [];
    if (files.length) {
      const newAttachments = await uploadAttachments(files);
      if (newAttachments?.length) {
        attachments = newAttachments?.map(
          ({ key, name, location, mimeType }) => ({
            key,
            name: name || key,
            location,
            mimeType,
          })
        );
      }
    }

    const input: SendOrderMessageInput = {
      message: values.message,
      orderId: orderId,
      attachments,
    };

    try {
      await sendMessage({ variables: { input } });
      formik.resetForm();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.log("Error: ", e);
      toast.error(e?.message || "Something went wrong.");
    }
  };

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: object().shape({
      message: string().required("A message is required."),
    }),
    onSubmit,
  });

  const isLoading = useMemo(
    () => loading || sending || attaching,
    [loading, sending, attaching]
  );

  return {
    messages: data?.getMessagesByOrderId || [],
    loading: isLoading,
    formik,
    error: sendingError || messageErrors || error,
    files,
    setFiles,
  };
};

export default useOrderMessages;
