import React from "react";
import { useMyResponsesQuery } from "../../Apollo/schema/GetMyResponses.generated";
import { Grid } from "@mui/material";
import ResponseCard from "../ResponseCard";
import { OrderResponse } from "../../../graphql/common";

const ResponsesComponent = () => {
  const { data } = useMyResponsesQuery();

  return (
    <Grid container flexWrap={"wrap"} gap={2}>
      {data?.getMyResponses
        ?.filter(Boolean)
        .filter((r) => r?.question)
        .slice(0, 4)
        .map((response) => (
          <Grid item key={response?.id}>
            <ResponseCard response={response as OrderResponse} />
          </Grid>
        ))}
    </Grid>
  );
};

export default ResponsesComponent;
