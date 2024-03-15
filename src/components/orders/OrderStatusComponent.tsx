import React from "react";
import { Button, Grid, styled, Tooltip, Typography } from "@mui/material";
import { startCase } from "lodash";
import { OrderStatus } from "../../../graphql/common";

type OrderStatusComponentProps = {
  status: OrderStatus;
};

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "DRAFT":
      return {
        background: "#e0e0e0",
        color: "#757575",
        tooltipMessage: "This order has not been published yet.",
      }; // Light grey
    case "ACTIVE":
      return {
        background: "#4caf50",
        color: "#ffffff",
        tooltipMessage:
          "The order has been submitted and work will start promptly",
      }; // Bright green
    case "IN_PROGRESS":
      return {
        background: "#2196f3",
        color: "#ffffff",
        tooltipMessage: "Work on this order has begun.",
      }; // Sky blue
    case "COMPLETED":
      return {
        background: "#ffd700",
        color: "#ffffff",
        tooltipMessage: "A response for this order is ready for collection.",
      }; // Gold
    case "CANCELED":
      return {
        background: "#d32f2f",
        color: "#ffffff",
        tooltipMessage: "This order is not being worked on.",
      }; // Dark red
    default:
      return { background: "#e0e0e0", color: "#757575" };
  }
};

const StyledButton = styled(Button)<{ status: OrderStatus }>`
  background-color: ${({ status }) => getStatusColor(status).background};
  color: ${({ theme, status }) =>
    theme.palette.getContrastText(getStatusColor(status).background)};
`;
const OrderStatusComponent = ({ status }: OrderStatusComponentProps) => {
  return (
    <Grid container gap={2} alignItems={"center"}>
      <Grid item alignItems={"center"}>
        <Typography>Current Status: </Typography>
      </Grid>
      <Grid item alignItems={"center"}>
        <Tooltip title={getStatusColor(status).tooltipMessage}>
          <StyledButton status={status}>
            {startCase(status.replace("_", "").toLowerCase())}
          </StyledButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default OrderStatusComponent;
