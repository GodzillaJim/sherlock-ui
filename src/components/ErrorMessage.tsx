import React from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";
import { Error } from "@mui/icons-material";
import NextLink from "next/link";

type ErrorMessageProps = {
  message: string;
};
const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Grid
      container
      flexDirection={"column"}
      alignItems={"center"}
      height={"100%"}
      mt={4}
    >
      <Grid item xs={12} md={4}>
        <Card sx={{ width: "100%", minWidth: 300 }}>
          <CardContent>
            <Box display={"flex"} flexDirection={"column"} gap={1}>
              <div>
                <Box display={"flex"} gap={2}>
                  <div>
                    <Error color={"error"} sx={{ fontSize: "48px" }} />
                  </div>
                  <div>
                    <Alert sx={{ minWidth: "100%" }} color={"error"}>
                      {message}
                    </Alert>
                  </div>
                </Box>
              </div>
              <div>
                <Divider />
              </div>
              <div>
                <Box display={"flex"} justifyContent={"end"} gap={2} mt={1}>
                  <NextLink href={`/app`}>
                    <Button>Go Home</Button>
                  </NextLink>
                  <NextLink href={`/app/create`}>
                    <Button color={"success"}>Create Order</Button>
                  </NextLink>
                </Box>
              </div>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ErrorMessage;
