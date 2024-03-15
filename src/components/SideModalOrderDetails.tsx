import React from "react";
import { Alert, Box, Modal, styled } from "@mui/material";
import { useGetOrderQuery } from "../Apollo/schema/GetOrder.generated";
import OrderDetailsComponent from "./orders/OrderDetailsComponent";
import CustomLoader from "./CustomLoader";
import { Order } from "../../graphql/common";

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "0%",
  right: "0%",
  width: "60%",
  height: "100%",
  overflow: "auto",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  p: theme.spacing(1.5),
  wordWrap: "break-word",
  whiteSpace: "normal",
}));

type SideModalOrderDetailsProps = {
  open: boolean;
  handleClose: () => void;
  orderId: string;
};
const SideModalOrderDetails = ({
  open,
  orderId,
  handleClose,
}: SideModalOrderDetailsProps) => {
  const { data, error, loading } = useGetOrderQuery({ variables: { orderId } });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="right-side-modal-title"
      aria-describedby="right-side-modal-description"
    >
      <StyledBox>
        {loading && <CustomLoader />}
        {data?.getOrder && (
          <OrderDetailsComponent
            hideEditButton
            order={data?.getOrder as Order}
          />
        )}
        {error && (
          <Alert variant={"filled"} color={"error"}>
            {error.message}
          </Alert>
        )}
      </StyledBox>
    </Modal>
  );
};

export default SideModalOrderDetails;
