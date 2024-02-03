import {
  GetOrderDocument,
  useGetOrderQuery,
} from "../../Apollo/schema/GetOrder.generated";
import {
  Attachment,
  AttachmentInput,
  Order,
  OrderInput,
  Type,
  useUpdateOrderMutation,
  WritingStyle,
} from "../../generated";
import useUploadAttachments from "./useUploadAttachments";
import { useEffect, useMemo, useState } from "react";
import { addDays } from "date-fns";
import { date, number, object, string } from "yup";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { EditorState } from "draft-js";
import { fromEditorState, toEditorState } from "../editor";
import { calculateOrderPrice } from "./pricing";
import { toast } from "react-toastify";

type UseEditOrderProps = {
  orderId: string;
};
export const useEditOrder = ({ orderId }: UseEditOrderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const {
    loading: gettingOrder,
    data,
    error,
  } = useGetOrderQuery({ variables: { orderId } });

  const [
    updateOrder,
    { error: updateError, loading: updatingOrder, data: updated },
  ] = useUpdateOrderMutation({
    refetchQueries: [GetOrderDocument],
  });

  useEffect(() => {
    if (updated) {
      toast.success(updated.updateOrder?.message || "Operation successful.");
    }
  }, [updated]);

  const {
    uploadAttachments,
    error: attachmentError,
    loading: uploadingAttachments,
  } = useUploadAttachments();

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to load order");
    }

    if (updateError) {
      toast.error(updateError.message || "Failed to update");
    }

    if (attachmentError) {
      toast.error(attachmentError || "Failed to upload attachments");
    }
  }, [error, updateError, attachmentError]);

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

  const existingAttachments = useMemo(() => {
    if (data && data?.getOrder?.attachments)
      return data.getOrder.attachments as Attachment[];
    return [];
  }, [data]);

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
          orderId,
          orderInput,
        },
      });
      // eslint-disable-next-line
    } catch (e: any) {
      console.log("Upload attachments error: ", e);
      toast.error("Failed to upload: " + e.message);
    }
  };

  const formik = useFormik<OrderInput>({
    initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    formik.setFieldValue("description", fromEditorState(editorState));
  }, [editorState]);

  const isServerSide = typeof window === undefined;
  useEffect(() => {
    if (isServerSide) return;

    setEditorState(() => EditorState.createEmpty());
  }, [isServerSide]);

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

  const totalPrice = calculateOrderPrice({
    orderId,
    ...data?.getOrder,
    ...formik.values,
  } as Order);

  const loading = useMemo(() => {
    return uploadingAttachments || gettingOrder || updatingOrder;
  }, [uploadingAttachments, gettingOrder, updatingOrder]);

  return {
    formik,
    totalPrice,
    editorState,
    setEditorState,
    files,
    setFiles,
    loading,
    existingAttachments,
  };
};
