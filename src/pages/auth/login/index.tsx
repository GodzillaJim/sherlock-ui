import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { Google, Lock } from "@mui/icons-material";
import { useAuth } from "../../../Context/AuthManager";
import NextLink from "next/link";

const StyledGrid = styled(Grid)`
  width: 100%;
  height: 80vh;
`;

const Login = () => {
  const { signInWithGoogle, loading, error } = useAuth();
  return (
    <Container maxWidth="lg" className="login-root">
      <StyledGrid container justifyContent={"center"} alignContent={"center"}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={<Lock />}
              title={
                <Typography color={"inherit"} variant={"h6"}>
                  Welcome back
                </Typography>
              }
            />
            <Divider sx={{ mb: 2 }} />
            <CardContent>
              <Grid container spacing={3} direction={"column"}>
                <Grid item>
                  <Button
                    variant={"contained"}
                    size="large"
                    fullWidth
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
                {error ? (
                  <Grid item>
                    <Typography color="error" variant="caption">
                      {error}
                    </Typography>
                  </Grid>
                ) : (
                  ""
                )}
                <Divider sx={{ mt: 3.5 }} />
                <Grid item>
                  <Typography
                    variant={"caption"}
                  >{`Don't have an account?`}</Typography>
                  <Typography variant={"caption"} sx={{ mx: 0.8 }}>
                    <NextLink
                      href={`/auth/signup?next=/app`}
                      passHref
                      legacyBehavior
                    >
                      Register here.
                    </NextLink>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </StyledGrid>
    </Container>
  );
};

export default Login;
