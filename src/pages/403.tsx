import React from "react"
import { Error, HomeOutlined } from "@mui/icons-material";
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
import NextLink from "next/link";

const UnAuthorizedError = () => {
    return <Grid
      container
      width={"100%"}
      justifyContent={"center"}
      height={"100vh"}
      alignItems={"center"}
      p={2}
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
              You don&apos;t have access to this page. 
            </Typography>
          </CardContent>
          <CardActions sx={{ width: "100%", justifyContent: "end" }}>
            <NextLink href={"/"} legacyBehavior passHref>
              <Button
                startIcon={<HomeOutlined />}
                
                variant="contained"
              >
                Take me home
              </Button>
            </NextLink>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
}

export default UnAuthorizedError;