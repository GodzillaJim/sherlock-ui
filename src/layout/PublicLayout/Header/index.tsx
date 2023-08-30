import React from "react";
import { InputAdornment, styled, TextField } from "@mui/material";
import { SearchOutlined } from "@ant-design/icons";

const SearchTextField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "fullWidth",
  },
  [theme.breakpoints.up("sm")]: {
    width: 600,
  },
}));
const TopSearchBar = () => {
  return (
    <>
      <SearchTextField
        type={"search"}
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
