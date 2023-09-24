import {Checkbox, FormControlLabel, Grid} from "@mui/material";
import * as React from "react";
import Dropdown, {DropdownOption} from "../../Dropdown";
import {getEnumAsArray} from "../../../helpers/HelperFunctions";
import {Type, WritingStyle} from "../../../generated";
import DateTimePicker from "../../DateTimePicker";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {setFilters} from "../../../store/filters";

/*
 * 1. BeforeDate
 * 2. AfterDate
 * 3. Has response
 * 4. Type -> Essay, article, Copyright, etc
 * 5. Reference style
 * */
const Filters = () => {
    const filters = useSelector((state: RootState) => state.filters);
    const dispatch = useDispatch();

    const handleChange = (field: string, value: Date | null | boolean | string | number) => {
        dispatch(setFilters({...filters, [field]: value}))
    }
  const getOrderTypeOptions = (): DropdownOption[] => {
    return [...getEnumAsArray(Type),  { label:"All", value: "all" }];
  };

  const getWritingStyleOptions = (): DropdownOption[] => {
    return [...getEnumAsArray(WritingStyle), { label:"All", value: "all" }];
  };

  return (
    <Grid container p={3} spacing={3} flexDirection={"column"}>
      <Grid item>
        <DateTimePicker
          label={"Created Before"}
          setValue={(value) => handleChange("createdBefore", value)}
          onChange={(value) => handleChange("createdBefore", value)}
          value={filters.createdBefore}
          textFieldProps={{ size: "small" }}
          hideSuggestions
        />
      </Grid>
      <Grid item>
        <DateTimePicker
          label={"Created After"}
          setValue={(value) => handleChange("createdAfter", value) }
          onChange={(value) => handleChange("createdAfter", value)}
          textFieldProps={{ size: "small" }}
          hideSuggestions
        />
      </Grid>
      <Grid item>
        <FormControlLabel control={<Checkbox />} label={"Has response"} checked={filters.hasResponse} onChange={() => handleChange("hasResponse", !filters.hasResponse)} />
      </Grid>
      <Grid item>
        <Dropdown
          label="Type of Work"
          options={getOrderTypeOptions()}
          onChange={value => handleChange("typeOfWork", value)}
          value={filters.typeOfWork}
        />
      </Grid>
      <Grid item>
        <Dropdown
          label="Writing Style"
          options={getWritingStyleOptions()}
          value={filters.writingStyle}
          onChange={value => handleChange("writingStyle", value)}
        />
      </Grid>
    </Grid>
  );
};

export default Filters;
