import React, {ChangeEvent} from "react";
import { InputAdornment, styled, TextField } from "@mui/material";
import { SearchOutlined } from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {setFilters} from "../../../store/filters";

const SearchTextField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "fullWidth",
  },
  [theme.breakpoints.up("sm")]: {
    width: 600,
  },
}));
const TopSearchBar = () => {
    const filters = useSelector((state: RootState) => state.filters);
    const dispatch = useDispatch();
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setFilters({
            ...filters,
            title: e.target.value
        }))
    }
  return (
    <>
      <SearchTextField
        type={"search"}
        onChange={handleChange}
        value={filters.searchTerm}
        placeholder={"Search"}
        InputProps={{
          endAdornment: (
            <InputAdornment position={"end"}>
              <SearchOutlined />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
export default TopSearchBar;
