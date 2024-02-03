import { useDeleteAttachmentMutation } from "../../generated";
import { useEffect } from "react";
import { useDeleteOrderResponseAttachmentMutation } from "../../Apollo/schema/DeleteOrderResponseAttachment.generated";
import { GetOrderDocument } from "../../Apollo/schema/GetOrder.generated";
import { GetOrderResponseDocument } from "../../Apollo/schema/GetOrderResponse.generated";
import { toast } from "react-toastify";

type DeleteAttachmentProps = {
  id: string;
  attachmentKey: string;
  callback?: CallableFunction;
};

type UseDeleteOrderAttachmentType = {
  loading: boolean;
  handleDeleteAttachment: (props: DeleteAttachmentProps) => Promise<void>;
};

export type AttachmentPageType = "ORDER" | "ORDER_RESPONSE";

export const useDeleteAttachment = (
  type: AttachmentPageType
): UseDeleteOrderAttachmentType => {
  const [deleteOrderAttachment, { loading, error, data }] =
    useDeleteAttachmentMutation({ refetchQueries: [GetOrderDocument] });

  const [
    deleteOrderResponseAttachment,
    { loading: deleting, error: deleteError, data: deleted },
  ] = useDeleteOrderResponseAttachmentMutation({
    refetchQueries: [GetOrderResponseDocument],
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (data) {
      toast.success(data.deleteAttachment?.message);
    }

    if (deleted) {
      toast.success(deleted.deleteOrderResponseAttachment?.message);
    }

    if (deleteError) {
      toast.error(deleteError.message);
    }
  }, [error, data, deleted, deleteError]);

  const handleDeleteAttachment = async ({
    id,
    attachmentKey,
    callback,
  }: DeleteAttachmentProps) => {
    if (type === "ORDER") {
      await deleteOrderAttachment({
        variables: { attachmentKey, orderId: id },
      });
    }

    if (type === "ORDER_RESPONSE") {
      await deleteOrderResponseAttachment({
        variables: { responseId: id, attachmentKey },
      });
    }

    if (callback) {
      callback();
    }
  };

  return { loading: loading || deleting, handleDeleteAttachment };
};
