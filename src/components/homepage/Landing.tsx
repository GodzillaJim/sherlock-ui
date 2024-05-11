import {
  Button,
  CardMedia,
  Divider,
  Grid,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import Pencil from "../../assets/images/pencil.svg";
import { lighten } from "@mui/system";
import NextLink from "next/link";

const Wrapper = styled(Grid)`
  align-items: baseline;
  justify-content: center;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing(5)};
  min-height: 75vh;
`;

const StyledPencil = styled(Pencil)(
  ({ theme }) => `
    color: ${theme.palette.secondary.main};
    width: 300px;
    
    ${theme.breakpoints.down("md")} {
        width: 150px;
    }
`
);

const Title = styled(Typography)`
  font-family: Lexend, sans-serif;
  font-size: 53px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.dark};

  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: 35px;
  }
`;

const StyledTypeWriter = styled(Title)(
  ({ theme }) => `
    color: ${theme.palette.secondary.light};
    min-height: 75px;
`
);

const Subtitle = styled(Typography)`
  font-family: "Martian Mono", sans-serif;
  font-weight: bold;
  font-size: 20px;
  color: ${({ theme }) => lighten(theme.palette.text.primary, 0.5)};
  padding: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: 16px;
  }
`;

const ActionButton = styled(Button)`
  height: 60px;
  border-radius: 40px;
  font-size: 16px;
  margin-top: ${({ theme }) => theme.spacing(7)};
  padding-left: ${({ theme }) => theme.spacing(3)};
  padding-right: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: 12px;
  }
`;

const Landing = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Wrapper container flexDirection={"column"} className={"landing-root"}>
      <Grid item width={"100%"}>
        <Grid container flexDirection={"column"} mx="auto" maxWidth={"lg"}>
          <Grid item width={"100%"}>
            <Grid
              container
              width={"100%"}
              justifyContent={"space-between"}
              gap={{ xs: 8, md: 3 }}
            >
              {isMobile ? (
                <Grid
                  item
                  justifyContent={"end"}
                  textAlign={"end"}
                  width={{ xs: "100%", md: "auto" }}
                >
                  <CardMedia sx={{ textAlign: "center" }}>
                    <StyledPencil />
                  </CardMedia>
                </Grid>
              ) : (
                ""
              )}
              <Grid
                item
                display={"flex"}
                alignItems={"center"}
                maxWidth={{ md: "50%" }}
              >
                <Grid
                  container
                  display={"flex"}
                  flexDirection={"column"}
                  gap={{ xs: 5, md: 3 }}
                >
                  <Grid item>
                    <Title sx={{ textAlign: { xs: "center", md: "start" } }}>
                      Crafting compelling <br />
                      <StyledTypeWriter>
                        <Typewriter
                          words={[
                            "Article",
                            "Essay",
                            "Research paper",
                            "Business plan",
                            "White paper",
                            "Case study",
                            "Software documentation",
                            "Terms and conditions",
                            "Pieces...",
                          ]}
                        />
                      </StyledTypeWriter>
                    </Title>
                  </Grid>
                  <Grid item sx={{ textAlign: { xs: "center", md: "start" } }}>
                    <Subtitle variant={"h6"}>
                      Get high quality content that draws in audiences and tuned
                      to your needs: fostering a stronger brand, converting
                      visitors and more...
                    </Subtitle>
                    <NextLink href={"/auth/signup?next=/app"}>
                      <ActionButton variant={"contained"}>
                        Order yours now.
                      </ActionButton>
                    </NextLink>
                  </Grid>
                </Grid>
              </Grid>
              {!isMobile ? (
                <Grid
                  item
                  justifyContent={"end"}
                  textAlign={"end"}
                  width={{ xs: "100%", md: "auto" }}
                >
                  <CardMedia sx={{ textAlign: "center" }}>
                    <StyledPencil />
                  </CardMedia>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Divider sx={{ mt: 6 }} />
      </Grid>
    </Wrapper>
  );
};

export default Landing;
