import React from "react";
import {Button, Grid} from "@mui/material";
import styled from "styled-components";
import {useRouter} from "next/router";

const Container = styled.div`
  padding: 0;
`;
const HomePage = (): JSX.Element => {
    const router = useRouter()
    return (
        <Container>
            <Grid height={"100vh"} container={true} direction={"row"} alignItems={"center"} gap={3}
                  justifyContent={"center"}>
                <Grid item>
                    <Button onClick={() => router.push("/auth/login")} variant={"contained"}
                            color={'success'}>Login </Button>
                </Grid>
                <Grid item>
                    <Button onClick={() => router.push("/auth/register")} variant={"contained"}
                            color={'secondary'}>Register</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomePage;
