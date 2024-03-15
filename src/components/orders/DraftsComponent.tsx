import { Divider, Grid } from "@mui/material";
import { v4 } from "uuid";
import SummaryCard from "../SummaryCard";
import React from "react";
import { Order } from "../../../graphql/common";

type DraftsComponentProps = {
  drafts: Order[];
};
const DraftsComponent = ({ drafts }: DraftsComponentProps) => {
  return (
    <>
      {drafts.length ? (
        <Grid item>
          <Grid container direction={"column"} spacing={2}>
            <Grid item>
              <Divider variant={"fullWidth"} />
            </Grid>
            <Grid item>
              <Grid container spacing={1}>
                {drafts.map((order) => {
                  return (
                    <Grid key={`key-${v4()}-${order.orderId}`} item>
                      <SummaryCard order={order} />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : ""}
    </>
  );
};

export default DraftsComponent;
