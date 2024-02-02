import React, { useMemo } from "react";
import { Alert, Grid, Typography } from "@mui/material";
import ResponseCard from "../ResponseCard";
import { OrderResponse } from "../../../graphql/common";
import CustomLoader from "../CustomLoader";
import { useGetResponsesToQuestionsByUserQuery } from "../../Apollo/schema/GetResponsesToQuestionsByUser.generated";

const ResponsesComponent = () => {
  const { data, loading, error } = useGetResponsesToQuestionsByUserQuery();
  const responses = useMemo(() => {
    let temp: OrderResponse[] = [];

    if (data?.getResponsesToQuestionsByUser?.length) {
      temp = data?.getResponsesToQuestionsByUser as OrderResponse[];
    }

    return temp;
  }, [data]);

  return (
    <Grid container flexWrap={"wrap"} gap={2}>
      {!loading ? <CustomLoader /> : ""}
      {error ? (
        <Grid item>
          <Alert color="error" variant="filled">
            {error.message}
          </Alert>
        </Grid>
      ) : (
        ""
      )}
      {data ? (
        <>
          {responses.length === 0 ? (
            <Typography>No responses</Typography>
          ) : (
            responses.map((response) => (
              <Grid item key={response?.id}>
                <ResponseCard response={response as OrderResponse} />
              </Grid>
            ))
          )}
        </>
      ) : (
        ""
      )}
    </Grid>
  );
};

export default ResponsesComponent;
