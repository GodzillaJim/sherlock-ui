import React from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { useAuth } from "../../../Context/AuthManager";

const Login = () => {
  const { signInWithGoogle, loading } = useAuth();
  return (
    <Grid
      alignItems={"center"}
      justifyContent={"center"}
      container
      height={"100vh"}
      sx={{ p: 3 }}
    >
      <Grid item>
        <Card sx={{ width: 300, p: 2 }}>
          <CardContent>
            <Grid container spacing={3} direction={"column"}>
              <Grid item>
                <Typography
                  color={"inherit"}
                  textAlign={"center"}
                  variant={"h4"}
                >
                  Welcome back
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant={"contained"}
                  fullWidth
                  color={"error"}
                  onClick={signInWithGoogle}
                  disabled={loading}
                  endIcon={
                    loading && <CircularProgress color={"error"} size={15} />
                  }
                  startIcon={<Google />}
                >
                  Sign in with Google
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
