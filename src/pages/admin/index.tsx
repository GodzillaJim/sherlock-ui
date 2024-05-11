import {
  Alert,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import MainLayout from "../../layout/MainLayout";
import React, { ReactNode, useMemo } from "react";
import { withRequireAuth } from "../../Context/AuthManager/withRequireAuth";
import usePaginateOrders from "../../helpers/orders/usePaginateOrders";
import OrderListTable from "../../components/Table/OrderListTable";
import { OrderPage } from "../../../graphql/common";
import { Search } from "@mui/icons-material";
import Dropdown from "../../components/Dropdown";
import {
  getOrderTypeOptions,
  getStatusOptions,
  getWritingStyleOptions,
} from "../../helpers/utils";
import CustomLoader from "../../components/CustomLoader";

const Admin = () => {
  const {
    page,
    setPage,
    loading,
    error,
    data,
    filters,
    handleChange,
    clearFilters,
  } = usePaginateOrders();

  const handleTitleSearch = (value?: string) => {
    handleChange("title", value);
  };

  const statusValue = useMemo(() => {
    const allOptions = getStatusOptions();
    if (filters?.status?.[0]) {
      return allOptions.find((s) => s.value === filters?.status?.[0]);
    }

    return null;
  }, [filters]);

  return (
    <Grid
      container
      flexDirection={"column"}
      className="admin-root"
      gap={3}
      py={3}
      maxWidth={"lg"}
    >
      <Grid item width="100%">
        <Grid container gap={3} width={"100%"}>
          <Grid item xs={12} md={4}>
            <TextField
              size={"small"}
              label={"Title"}
              placeholder={"Start typing"}
              fullWidth
              value={filters.title}
              onChange={(e) => handleTitleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position={"start"}>
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={"auto"} md={2}>
            <Dropdown
              label="Type of Work"
              options={getOrderTypeOptions()}
              onChange={(value) => handleChange("typeOfWork", value)}
              value={filters?.typeOfWork || ""}
            />
          </Grid>
          <Grid item xs={"auto"} md={2}>
            <Dropdown
              label="Writing Style"
              options={getWritingStyleOptions()}
              value={filters?.writingStyle || ""}
              onChange={(value) => handleChange("writingStyle", value)}
            />
          </Grid>
          <Grid item xs={"auto"} md={2}>
            <Dropdown
              label="Status"
              options={getStatusOptions()}
              value={statusValue?.value}
              onChange={(value) =>
                handleChange("status", value ? ([value] as string[]) : null)
              }
            />
          </Grid>
          <Grid item>
            <Button color={"error"} size={"small"} onClick={clearFilters}>
              Clear
            </Button>
          </Grid>
          <Grid item>{loading && <CustomLoader />}</Grid>
        </Grid>
      </Grid>
      {error && (
        <Grid item>
          <Alert color={"error"} variant={"filled"}>
            {error.message}
          </Alert>
        </Grid>
      )}
      <Grid item width={"100%"}>
        {data?.getPublicOrders?.docs.length ? (
          <OrderListTable
            orderPage={data?.getPublicOrders as OrderPage}
            setPage={setPage}
            page={page}
          />
        ) : (
          ""
        )}
        {!data?.getPublicOrders?.totalDocs && !loading ? (
          <Typography>No matches found</Typography>
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
};

Admin.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
export const getServerSideProps = withRequireAuth();

export default Admin;
