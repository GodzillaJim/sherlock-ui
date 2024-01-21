import React from "react";
import { useMyResponsesQuery } from "../../Apollo/schema/GetMyResponses.generated";
import { Alert, Grid } from "@mui/material";
import ResponseCard from "../ResponseCard";
import { OrderResponse } from "../../../graphql/common";
import CustomLoader from "../CustomLoader";

const ResponsesComponent = () => {
  const { data, loading, error } = useMyResponsesQuery();

  return (
    <Grid container flexWrap={"wrap"} gap={2}>
      {!loading ? <CustomLoader /> : ""}
      {error ? (
        <Grid item>
          <Alert color="error" variant="filled">
            Could not load responses.{" "}
          </Alert>
        </Grid>
      ) : (
        ""
      )}
      {data ? (
        <>
          {data?.getMyResponses
            ?.filter(Boolean)
            .filter((r) => r?.question)
            .map((response) => (
              <Grid item key={response?.id}>
                <ResponseCard response={response as OrderResponse} />
              </Grid>
            ))}
        </>
      ) : (
        ""
      )}
    </Grid>
  );
};

export default ResponsesComponent;
