import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Error, HomeOutlined } from "@mui/icons-material";
import NextLink from "next/link";

const PageNotFound = () => {
  return (
    <Grid
      container
      width={"100%"}
      justifyContent={"center"}
      height={"100vh"}
      alignItems={"center"}
    >
      <Grid item>
        <Card sx={{ width: { xs: "100%", md: 400 } }}>
          <CardHeader
            title={
              <ListItem>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <Error color="error" />
                </ListItemIcon>
                <ListItemText primary="Oooops!" />
              </ListItem>
            }
          />
          <CardContent>
            <Typography variant="body1">
              We didn&apos;t find what you were looking for.
            </Typography>
          </CardContent>
          <CardActions sx={{ width: "100%", justifyContent: "end" }}>
            <NextLink href={"/"} legacyBehavior passHref>
              <Button
                startIcon={<HomeOutlined />}
                size="small"
                variant="contained"
              >
                Go Home
              </Button>
            </NextLink>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PageNotFound;
