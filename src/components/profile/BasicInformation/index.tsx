import React from "react";
import { Avatar, Box, Card, CardContent, Grid } from "@mui/material";
import AdditionalInformation from "./AdditionalInformation";
import { useAuth } from "../../../Context/AuthManager";
import Image from "next/image";

const BasicInformation = () => {
  const { user } = useAuth();
  const image = user?.photoURL;

  return (
    <Grid container direction={"row"} width={"100%"} gap={3}>
      <Grid xs={12} sm={12} md={3} item>
        <Card>
          <CardContent>
            <Grid
              container
              direction={"column"}
              justifyContent="center"
              textAlign={"center"}
              gap={3}
            >
              <Grid item>
                {!image && (
                  <Avatar
                    sx={{ width: "120px", height: "120px", margin: "auto" }}
                  />
                )}
                {image && (
                  <Box sx={{ width: 120, mx: "auto", borderRadius: 8 }}>
                    <Image
                      width={120}
                      height={120}
                      src={image}
                      alt={"profile pic"}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} sm={12} md={8} item>
        <AdditionalInformation />
      </Grid>
    </Grid>
  );
};

export default BasicInformation;
