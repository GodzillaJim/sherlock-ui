import React from "react";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { useAuth } from "../../../Context/AuthManager";

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
            <CardContent>
              <Grid container spacing={3} direction={"column"}>
                <Grid item>
                  <Typography
                    color={"inherit"}
                    textAlign={"center"}
                    variant={"h6"}
                  >
                    Welcome back
                  </Typography>
                </Grid>
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
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </StyledGrid>
    </Container>
  );
};

export default Login;
