import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
} from "@mui/material";
import * as React from "react";
import Dropdown, { DropdownOption } from "../../Dropdown";
import { getEnumAsArray } from "../../../helpers/HelperFunctions";
import { ResponseStatus, Type, WritingStyle } from "../../../generated";
import DateTimePicker from "../../DateTimePicker";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setFilters } from "../../../store/filters";
import dayjs from "dayjs";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const handleChange = (
    field: string,
    value: Date | null | boolean | string | number
  ) => {
    // Reset page number on filter change
    dispatch(setFilters({ ...filters, [field]: value, currentPage: 1 }));
  };
  const getOrderTypeOptions = (): DropdownOption[] => {
    return [...getEnumAsArray(Type), { label: "All", value: "all" }];
  };

  const getWritingStyleOptions = (): DropdownOption[] => {
    return [...getEnumAsArray(WritingStyle), { label: "All", value: "all" }];
  };

  const clearFilters = () => {
    // Reset page number on filter change
    const newFilters = { responseStatus: null, currentPage: 1 };
    dispatch(setFilters(newFilters));
    router.push({
      pathname: "/public/listing",
      query: Object.fromEntries(
        Object.entries(newFilters).filter((keyValue) => Boolean(keyValue[1]))
      ),
    });
  };
  return (
    <Grid container p={3} spacing={3} flexDirection={"column"}>
      <Grid item>
        <DateTimePicker
          label={"Created Before"}
          setValue={(value) =>
            handleChange("createdBefore", value ? value.toISOString() : null)
          }
          value={
            filters.createdBefore
              ? dayjs(filters?.createdBefore).toDate()
              : null
          }
          onChange={(value) =>
            handleChange("createdBefore", value?.toISOString() || null)
          }
          textFieldProps={{ size: "small" }}
          hideSuggestions
          touched={false}
        />
      </Grid>
      <Grid item>
        <DateTimePicker
          label={"Created After"}
          value={
            filters.createdAfter ? dayjs(filters?.createdAfter).toDate() : null
          }
          setValue={(value) =>
            handleChange("createdAfter", value ? value.toISOString() : null)
          }
          onChange={(value) =>
            handleChange("createdAfter", value ? value.toISOString() : null)
          }
          textFieldProps={{ size: "small" }}
          hideSuggestions
        />
      </Grid>
      <Grid item>
        <FormControl component={"fieldset"} variant={"standard"}>
          <FormLabel component={"legend"}>Response status</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={filters?.responseStatus === null} />}
              onChange={() => handleChange("responseStatus", null)}
              label={"All"}
            />

            <FormControlLabel
              control={
                <Checkbox
                  onChange={() =>
                    handleChange("responseStatus", ResponseStatus.HasResponse)
                  }
                  checked={
                    filters?.responseStatus === ResponseStatus.HasResponse
                  }
                />
              }
              label={"Has at least 1 response"}
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() =>
                    handleChange("responseStatus", ResponseStatus.HasNoResponse)
                  }
                  checked={
                    filters?.responseStatus === ResponseStatus.HasNoResponse
                  }
                />
              }
              label={"Has no response"}
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <Dropdown
          label="Type of Work"
          options={getOrderTypeOptions()}
          onChange={(value) => handleChange("typeOfWork", value)}
          value={filters?.typeOfWork || ""}
        />
      </Grid>
      <Grid item>
        <Dropdown
          label="Writing Style"
          options={getWritingStyleOptions()}
          value={filters?.writingStyle || ""}
          onChange={(value) => handleChange("writingStyle", value)}
        />
      </Grid>
      <Grid item>
        <Button
          color={"error"}
          type={"button"}
          variant={"contained"}
          onClick={clearFilters}
        >
          Clear
        </Button>
      </Grid>
    </Grid>
  );
};

export default Filters;
