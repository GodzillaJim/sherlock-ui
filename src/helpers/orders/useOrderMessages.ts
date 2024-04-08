import {
  GetOrderDocument,
  useGetOrderLazyQuery,
} from "../../Apollo/schema/GetOrder.generated";
import { useSendOrderMessageMutation } from "../../Apollo/schema/SendOrderMessage.generated";
import { useFormik } from "formik";
import { object, string } from "yup";
import { SendOrderMessageInput } from "../../../graphql/common";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";

const useOrderMessages = (orderId: string) => {
  const [getOrder, { loading, data }] = useGetOrderLazyQuery();

  useEffect(() => {
    if (orderId) {
      getOrder({ variables: { orderId } });
    }
  }, [orderId]);

  const [sendMessage, { loading: sending, error: sendingError }] =
    useSendOrderMessageMutation({ refetchQueries: [GetOrderDocument] });

  const onSubmit = async (values: { message: string }) => {
    const input: SendOrderMessageInput = {
      message: values.message,
      orderId: orderId,
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

  const isLoading = useMemo(() => loading || sending, [loading, sending]);

  return {
    messages: data?.getOrder?.messages || [],
    loading: isLoading,
    formik,
    error: sendingError,
  };
};

export default useOrderMessages;
