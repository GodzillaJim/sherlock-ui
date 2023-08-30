import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import * as React from "react";
import Dropdown, { DropdownOption } from "../../Dropdown";
import { getEnumAsArray } from "../../../helpers/HelperFunctions";
import { Type, WritingStyle } from "../../../generated";
import DateTimePicker from "../../DateTimePicker";

/*
 * 1. BeforeDate
 * 2. AfterDate
 * 3. Has response
 * 4. Type -> Essay, article, Copyright, etc
 * 5. Reference style
 * */
const Filters = () => {
  const getOrderTypeOptions = (): DropdownOption[] => {
    return getEnumAsArray(Type);
  };

  const getWritingStyleOptions = (): DropdownOption[] => {
    return getEnumAsArray(WritingStyle);
  };

  return (
    <Grid container p={3} spacing={3} flexDirection={"column"}>
      <Grid item>
        <DateTimePicker
          label={"Created Before"}
          setValue={() => {
            //TODO: Fill function
          }}
          textFieldProps={{ size: "small" }}
          hideSuggestions
        />
      </Grid>
      <Grid item>
        <DateTimePicker
          label={"Created After"}
          setValue={() => {
            // TODO: Fill this in
          }}
          textFieldProps={{ size: "small" }}
          hideSuggestions
        />
      </Grid>
      <Grid item>
        <FormControlLabel control={<Checkbox />} label={"Has response"} />
      </Grid>
      <Grid item>
        <Dropdown
          label="Type of Work"
          options={getOrderTypeOptions()}
          onChange={() => {
            //TODO: Fill this up
          }}
          value={getOrderTypeOptions()[0].value}
        />
      </Grid>
      <Grid item>
        <Dropdown
          label="Writing Style"
          options={getWritingStyleOptions()}
          value={getWritingStyleOptions()[0].value}
          onChange={() => {
            // TODO: Fill this up
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Filters;
