import React from "react";
import {
  Button,
  darken,
  Grid,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { startCase } from "lodash";
import { OrderStatus } from "../../../graphql/common";
import { getStatusColor } from "../../helpers/utils";

type OrderStatusComponentProps = {
  status: OrderStatus;
};


const StyledButton = styled(Button)<{ status: OrderStatus }>`
  background-color: ${({ status, theme }) => getStatusColor(status, theme).background};
  color: ${({ theme, status }) =>
    theme.palette.getContrastText(getStatusColor(status, theme).background)};

  &:hover {
    background-color: ${({ status, theme }) =>
      darken(getStatusColor(status, theme).background, 0.5)};
    color: ${({ theme, status }) =>
      theme.palette.getContrastText(
        darken(getStatusColor(status, theme).background, 0.5)
      )};
  }
`;
const OrderStatusComponent = ({ status }: OrderStatusComponentProps) => {
  const theme = useTheme();
  return (
    <Grid container gap={2} alignItems={"center"}>
      <Grid item alignItems={"center"}>
        <Typography>Current Status: </Typography>
      </Grid>
      <Grid item alignItems={"center"}>
        <Tooltip title={getStatusColor(status, theme).tooltipMessage}>
          <StyledButton status={status}>
            {startCase(status.replace("_", " ").toLowerCase())}
          </StyledButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default OrderStatusComponent;
