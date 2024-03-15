import React, { ChangeEvent, useMemo } from "react";
import { IconButton, InputAdornment, styled, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setFilters } from "../../../store/filters";
import { useRouter } from "next/router";
import { SearchOutlined } from "@mui/icons-material";

const SearchTextField = styled(TextField)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "fullWidth",
  },
  [theme.breakpoints.up("sm")]: {
    width: 600,
  },
}));

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
}));
const TopSearchBar = () => {
  const router = useRouter();
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Reset current page when filters change
    dispatch(
      setFilters({
        ...filters,
        title: e.target.value,
        currentPage: 1,
      })
    );
  };

  const pathFilters = useMemo(() => {
    return Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => Boolean(value))
    );
  }, [filters]);

  const handleSearch = () => {
    router.push({ pathname: "/public/listing", query: pathFilters }).then();
  };

  return (
    <Wrapper>
      <div>
        <SearchTextField
          type={"search"}
          onChange={handleChange}
          value={filters?.title}
          placeholder={"Search"}
          InputProps={{
            endAdornment: (
              <InputAdornment position={"end"}>
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div>
        <IconButton
          aria-label={"search"}
          type={"button"}
          onClick={handleSearch}
        >
          <SearchOutlined />
        </IconButton>
      </div>
    </Wrapper>
  );
};
export default TopSearchBar;
