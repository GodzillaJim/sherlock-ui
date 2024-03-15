import {
  GetOrderDocument,
  useGetOrderQuery,
} from "../../Apollo/schema/GetOrder.generated";

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
import { useGeneratePaymentIntentMutation } from "../../Apollo/schema/GeneratePaymentIntent.generated";
import { useRouter } from "next/router";
import { paperType, writingStyle } from "../utils";
import { useUpdateOrderMutation } from "../../Apollo/schema/UpdateOrder.generated";
import { Order } from "../../../graphql/common";

type UseEditOrderProps = {
  orderId: string;
};
export const useEditOrder = ({ orderId }: UseEditOrderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
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
      deadline: addDays(new Date(), 1).toISOString(),
      numberOfPages: 1,
      title: "",
      type: paperType.article as Type,
      writingStyle: writingStyle.apaV7 as WritingStyle,
      description: "",
      attachments: [],
      academicLevel: "NONE" as AcademicLevel,
      discipline: "",
    };

    if (!data || !data.getOrder) {
      return temp;
    }
    const order = data.getOrder as Order;
    const savedAttachments = order.attachments as Attachment[];

    return {
      ...temp,
      ...order,
      academicLevel: (order.academicLevel ||
        temp.academicLevel) as AcademicLevel,
      discipline: order.discipline || temp.discipline,
      attachments: savedAttachments.map(
        ({ key, name, location, mimeType }) => ({
          name: name as string,
          key: key as string,
          location: location as string,
          mimeType: mimeType || "",
        })
      ),
      deadline: dayjs(order.deadline).toDate().toISOString(),
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
    discipline: string(),
    academicLevel: string(),
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
    discipline,
    academicLevel,
  }: OrderInput & { discipline: string; academicLevel: AcademicLevel }) => {
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
        discipline,
        academicLevel,
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

  const formik = useFormik<
    OrderInput & { discipline: string; academicLevel: AcademicLevel }
  >({
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

  const [
    getClientSecret,
    { loading: gettingClientSecret, error: clientSecretError },
  ] = useGeneratePaymentIntentMutation();

  useEffect(() => {
    if (clientSecretError) {
      toast.error(
        clientSecretError.message || "Operation failed at this moment."
      );
    }
  }, [clientSecretError]);

  const handleCheckout = async () => {
    // Save any changes
    await formik.handleSubmit();

    // Generate client secret
    await getClientSecret({ variables: { orderId } });

    router.push(`/app/order/${orderId}/checkout`);
  };

  const loading = useMemo(() => {
    return (
      uploadingAttachments ||
      gettingOrder ||
      updatingOrder ||
      gettingClientSecret
    );
  }, [uploadingAttachments, gettingOrder, updatingOrder, clientSecretError]);
  return {
    formik,
    totalPrice,
    editorState,
    setEditorState,
    files,
    setFiles,
    loading,
    existingAttachments,
    handleCheckout,
  };
};
