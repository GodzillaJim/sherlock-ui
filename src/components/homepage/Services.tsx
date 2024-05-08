import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import { lighten } from "@mui/system";
import {
  AccountCircle,
  AddBox,
  CheckCircle,
  Payment,
  PlaylistAddCheck,
} from "@mui/icons-material";
import NextLink from "next/link";
import Image from "next/legacy/image";
import SaleBanner from "../../assets/images/banner-sale.png";

type StepData = {
  title: string;
  description: string;
  icon: typeof AccountCircle;
  action?: {
    href: string;
    label: string;
  };
};

const steps: StepData[] = [
  {
    title: "Create an account",
    description:
      "Sign up with us to begin your journey to exceptional content. Creating an account is fast and secure, allowing you to manage and track your projects with ease.",
    icon: AccountCircle,
    action: {
      href: "/auth/signup?next=/app",
      label: "Start",
    },
  },
  {
    title: "Add a project",
    description:
      "Tell us about your content needs by adding a new project. Whether it’s blog posts, white papers, or press releases, our simple form guides you through defining your project's scope and requirements.",
    icon: AddBox,
  },
  {
    title: "Make payment",
    description:
      "Securely complete your payment with our encrypted transaction system. We offer a variety of payment methods to suit your convenience, ensuring a smooth start to your project.",
    icon: Payment,
  },
  {
    title: "Collect your work",
    description:
      "Receive your professionally crafted content, ready for publication. Each piece is thoroughly reviewed to meet our high standards and your specifications, ensuring your complete satisfaction.",
    icon: PlaylistAddCheck,
  },
];

const salePoints = [
  {
    title: "Guaranteed Timely Delivery",
    subtitle: "Receive your content right when you need it.",
  },
  {
    title: "Simple Account Setup",
    subtitle: "Quick and easy account creation process.",
  },
  {
    title: "Customizable Project Submissions",
    subtitle: "Tailor every detail from academic level to writing style.",
  },
  {
    title: "Expert Writers",
    subtitle: "Experienced professionals understand and meet your exact needs.",
  },
  {
    title: "Secure Payment Options",
    subtitle: "Transactions are safe and reliable.",
  },
  {
    title: "Guaranteed Timely Delivery",
    subtitle: "Receive your content right when you need it.",
  },
  {
    title: "User-Friendly Interface",
    subtitle: "Effortlessly manage your writing projects.",
  },
  {
    title: "Premium Service Experience",
    subtitle: "Elevate your content strategy with superior writing quality.",
  },
];

const Title = styled(Typography)`
  font-family: "Lexend", sans-serif;
  font-size: 35px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.primary.dark};

  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: 25px;
  }
`;

const StyledCheck = styled(CheckCircle)`
  color: ${({ theme }) => theme.palette.success.dark};
  width: 30px;
  height: 30px;
`;

const Subtitle = styled(Typography)`
  color: ${({ theme }) => lighten(theme.palette.text.primary, 0.5)};
`;

const SaleBannerWrapper = styled(Grid)`
  background-color: ${({ theme }) => lighten(theme.palette.warning.light, 0.5)};
  border-radius: 15px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
`;
const Services = () => {
  return (
    <Grid
      container
      flexDirection={"column"}
      px={{ xs: 2, md: 3 }}
      gap={3}
      mb={3}
    >
      <Grid item>
        <ListItem>
          <ListItemText
            primary={
              <Title variant={"h1"}>
                Unleashing the power of Exceptional Writing
              </Title>
            }
            secondary={<Subtitle variant={"h6"}>in four simple steps</Subtitle>}
          />
        </ListItem>
      </Grid>
      <Grid item mb={5}>
        <Grid container flexDirection={"column"} gap={2}>
          <Grid item>
            <Grid container flexDirection={"row"} gap={2}>
              {steps.map((step) => {
                return (
                  <Grid item xs={12} md={2.9} key={step.title}>
                    <Card sx={{ py: 3, minHeight: { md: 450 } }}>
                      <CardHeader
                        title={
                          <ListItem
                            disablePadding
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <ListItemIcon>
                              {
                                <step.icon
                                  sx={{
                                    fontSize: 24,
                                    width: 60,
                                    height: 60,
                                    color: `secondary.main`,
                                  }}
                                />
                              }
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography
                                  color={"primary.main"}
                                  variant={"h6"}
                                  mt={3}
                                  fontFamily={"Lexend"}
                                >
                                  {step.title}
                                </Typography>
                              }
                            />
                          </ListItem>
                        }
                      />
                      <CardContent sx={{ p: 3 }}>
                        <Grid
                          container
                          flexDirection={"column"}
                          justifyContent={"space-between"}
                          height={"100%"}
                        >
                          <Grid item>
                            <Typography
                              variant={"body1"}
                              sx={{ fontSize: "18px", textAlign: "justify" }}
                              fontFamily={"Lato"}
                            >
                              {step.description}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                      {step.action ? (
                        <CardActions sx={{ ml: 2 }}>
                          <NextLink href={step.action.href}>
                            <Button variant={"contained"}>
                              {step.action.label}
                            </Button>
                          </NextLink>
                        </CardActions>
                      ) : (
                        ""
                      )}
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item>
            <SaleBannerWrapper container alignItems={"center"} my={4}>
              <Grid item xs={12} md={3}>
                <CardMedia>
                  <Image
                    src={SaleBanner}
                    alt={"write-spear"}
                    layout={"responsive"}
                    width={50}
                    height={50}
                  />
                </CardMedia>
              </Grid>
              <Grid item>
                <List>
                  {salePoints.slice(0, 3).map((point, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <StyledCheck />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant={"h6"}>{point.title}</Typography>
                        }
                        secondary={
                          <Typography variant={"body1"}>
                            {point.subtitle}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </SaleBannerWrapper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Services;
