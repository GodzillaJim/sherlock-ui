import React from "react";
import { Box, FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <FormControl sx={{ width: { xs: "100%", md: 224 } }}>
        <OutlinedInput
          size="small"
          id="header-search"
          startAdornment={
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          }
          aria-describedby="header-search-text"
          inputProps={{
            "aria-label": "weight",
          }}
          placeholder="Ctrl + K"
        />
      </FormControl>
    </Box>
  );
};

export default Search;
