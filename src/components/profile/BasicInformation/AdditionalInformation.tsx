import React from "react";
import { Box, Card, CardContent, Grid, TextField } from "@mui/material";

const AdditionalInformation = () => {
  return (
    <Grid container direction={"row"} gap={1}>
      <Grid item>
        <Card>
          <CardContent>
            <Grid container direction={"column"} gap={2}>
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justifyContent={"space-between"}
                  gap={1}
                >
                  <div>
                    <TextField
                      size="small"
                      label="First Name"
                      name="firstName"
                    />
                  </div>
                  <div>
                    <TextField size="small" label="Last Name" name="lastName" />
                  </div>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item>
                  <TextField
                    fullWidth
                    disabled
                    size="small"
                    label="Email"
                    name="email"
                  />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card>
          <CardContent></CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdditionalInformation;
