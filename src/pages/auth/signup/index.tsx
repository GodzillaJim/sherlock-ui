import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useAuth } from "../../../Context/AuthManager";
import { EditOutlined, GoogleOutlined } from "@ant-design/icons";
import NextLink from "next/link";


const Register = (): JSX.Element => {
  const { signInWithGoogle, loading, error } = useAuth();

  return (
    <Grid
      container
      direction={"row"}
      columns={12}
      maxWidth={"lg"}
      mx={"auto"}
      width={"100%"}
    >
      <Grid item xs={12} sm={12} sx={{ pt: 4 }} width={"100%"}>
        <Grid
          container
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"80%"}
          width={"100%"}
          px={2}
        >
          <Grid item xs={12} md={4} width={"100%"}>
            <Card>
              <CardHeader
                avatar={<EditOutlined />}
                title={
                  <Typography variant={"h6"}>Sign up to get started</Typography>
                }
              />
              <Divider sx={{ my: 1 }} />
              <CardContent>
                <Grid container flexDirection={"column"} gap={3}>
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <Button
                      variant={"contained"}
                      startIcon={<GoogleOutlined />}
                      fullWidth
                      size={"large"}
                      onClick={signInWithGoogle}
                      disabled={loading}
                      endIcon={
                        loading && (
                          <CircularProgress color={"error"} size={15} />
                        )
                      }
                    >
                      Sign up with Google
                    </Button>
                  </Grid>
                  {error ? (
                    <Grid item>
                      <Typography color="error" variant="caption">
                        {error}
                      </Typography>
                    </Grid>
                  ) : (
                    ""
                  )}
                  <Divider />
                  <Grid item>
                    <Typography variant={"caption"}>
                      Already have an account?
                    </Typography>
                    <Typography variant={"caption"} sx={{ mx: 0.4 }}>
                      <NextLink href={`/auth/login?next=/app`}>
                        Login here.
                      </NextLink>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;
