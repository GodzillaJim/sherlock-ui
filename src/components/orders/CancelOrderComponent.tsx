import React, { ChangeEvent, useState } from "react";
import { useCancelOrderMutation } from "../../Apollo/schema/CancelOrder.generated";
import { GetOrderDocument } from "../../Apollo/schema/GetOrder.generated";
import { GetMyOrdersDocument } from "../../Apollo/schema/GetMyOrders.generated";
import {
  Alert,
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const templateReasons = [
  "I don't want a high quality piece of work anymore.",
  "I found the same item at a better price from another writer.",
  "I made a mistake in my instructions. I want to start over.",
  "I need to cancel for financial reasons. I am poor.",
  "Other reasons",
];

type CancelComponentProps = {
  orderId: string;
};

const CancelOrderComponent = ({ orderId }: CancelComponentProps) => {
  const router = useRouter();
  const [otherReason, setOtherReason] = useState("");
  const [reason, setReason] = useState("");

  const showAdditionalInformationField = reason === "Other reasons";

  const [cancelOrder, { loading, error }] = useCancelOrderMutation({
    refetchQueries: [GetOrderDocument, GetMyOrdersDocument],
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReason(event.target.value);
  };

  const handleOtherReasonChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOtherReason(event.target.value);
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const input = {
      orderId,
      reason: reason === "Other reasons" ? `${reason}-${otherReason}` : reason,
    };

    await cancelOrder({ variables: { cancelOrderInput: input } });

    toast.info(
      `We are processing this request. We will send you an email when it's done.`,
      { onClose: () => router.push(`/app/order/${orderId}/view`) }
    );
  };

  return (
    <Grid
      container
      flexDirection={"column"}
      p={{ xs: 1, md: 4 }}
      m={{ md: 3 }}
      gap={3}
    >
      <Collapse in={!!error}>
        <Alert color={"error"} variant={"outlined"}>
          We have encountered an error processing this refund. Please try again
          later. If the error persists, drop us an email at support@thejimna.com
        </Alert>
      </Collapse>
      <Grid item>
        <Typography variant={"h5"}>
          {"We're sorry to see you quit."}{" "}
        </Typography>
      </Grid>
      <Grid item>
        <form onSubmit={handleSubmit}>
          <Grid container gap={2} flexDirection={"column"}>
            <Grid item>
              <FormControl component={"fieldset"} disabled={loading}>
                <FormLabel component={"legend"}>
                  Why are you canceling our order?
                </FormLabel>
                <RadioGroup
                  aria-label={"cancellation-reason"}
                  name={"cancellation-reason"}
                  value={reason}
                  onChange={handleChange}
                >
                  {templateReasons.map((item, index) => (
                    <FormControlLabel
                      key={`${item}-${index}`}
                      value={item}
                      control={<Radio />}
                      label={item}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item>
              <Collapse in={showAdditionalInformationField}>
                <TextField
                  multiline
                  minRows={5}
                  sx={{ minWidth: { xs: "100%", md: "500px" } }}
                  label={"Tell us more."}
                  placeholder={"Eg. My other reason is ..."}
                  value={otherReason}
                  onChange={handleOtherReasonChange}
                  disabled={loading}
                />
              </Collapse>
            </Grid>
          </Grid>
          <Grid item my={3}>
            <Button
              startIcon={<Send />}
              disabled={loading}
              type={"submit"}
              variant={"contained"}
            >
              Submit request
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default CancelOrderComponent;
