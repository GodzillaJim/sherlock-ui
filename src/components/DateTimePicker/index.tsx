import * as React from "react";
import {
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Chip,
  FormHelperText,
  Grid,
  IconButton,
  styled,
  TextFieldProps,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Box } from "@mui/system";
import {
  addDays,
  addHours,
  addMonths,
  addWeeks,
  differenceInHours,
} from "date-fns";
import { formatDateDifference } from "../../helpers/Date";
import { v4 } from "uuid";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

type Props = DateTimePickerProps<Date> & {
  value: Date | null | undefined;
  error?: string | undefined;
  touched?: boolean | undefined;
  setValue: (value?: Date | null) => void;
  hideSuggestions?: boolean;
  textFieldProps?: TextFieldProps;
};

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(2),
}));

const DateTimePicker = (props: Props) => {
  const getHelperText = () => {
    if (props.touched && props.error) return props.error;

    if (!props.value) return "";

    const difference = differenceInHours(props.value, new Date());

    if (!(difference > 0)) return "";
    return (
      <>
        <sup>*</sup>
        {`${formatDateDifference(difference)} from now`}
      </>
    );
  };

  const suggestions = [
    { label: "48 Hours", date: addHours(new Date(), 48) },
    { label: "72 Hours", date: addHours(new Date(), 72) },
    { label: "1 Week", date: addWeeks(new Date(), 1) },
    { label: "10 Days", date: addDays(new Date(), 10) },
    { label: "1 Month", date: addMonths(new Date(), 1) },
  ];

  const clearValue = () => {
    props.setValue(undefined);
  };

  return (
    <Grid container direction={"column"} spacing={1}>
      <Grid item>
        <Box display={"flex"} flexDirection={"column"} gap={2}>
          <Grid container gap={2}>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MuiDateTimePicker
                  views={["day", "hours"]}
                  {...props}
                  ampm={false}
                  sx={{ width: "100%" }}
                  value={props.value || undefined}
                  onChange={(date) => props.setValue(date)}
                  slotProps={{
                    textField: props.textFieldProps,
                  }}
                />
              </LocalizationProvider>
            </Grid>
            {props.value && (
              <Grid item>
                <IconButton onClick={clearValue}>
                  <CloseIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
          {!props.hideSuggestions && (
            <div>
              <FormHelperText
                sx={{ textAlign: "start" }}
                error={Boolean(props.error && props.touched)}
                required
              >
                {getHelperText()}
              </FormHelperText>
            </div>
          )}
        </Box>
      </Grid>
      {!props.hideSuggestions && (
        <Grid item>
          <Grid container direction={"row"} spacing={1}>
            {suggestions.map(({ label, date }) => {
              return (
                <Grid item key={`chip-${v4()}`}>
                  <Chip
                    label={label}
                    variant="filled"
                    size="small"
                    color="secondary"
                    clickable
                    onClick={() => props.setValue(date)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default DateTimePicker;
