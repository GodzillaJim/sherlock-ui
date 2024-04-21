import React, { ReactNode } from "react";
import MainLayout from "../../../layout/MainLayout";
import { Button, Collapse, Divider, Grid } from "@mui/material";
import { MailOutlineRounded } from "@mui/icons-material";
import { useSendTestMailLazyQuery } from "../../../Apollo/schema/sendTestMail.generated";

const Mails = () => {
  const [sendTestMail, { loading, error, data }] = useSendTestMailLazyQuery({
    fetchPolicy: "network-only",
  });

  const handleClick = async () => {
    await sendTestMail();
  };

  return (
    <Grid container flexDirection={"column"} maxWidth={"lg"} py={3}>
      <Grid item>
        <Button
          variant={"contained"}
          disabled={loading}
          startIcon={<MailOutlineRounded />}
          onClick={handleClick}
        >
          Send test mail
        </Button>
      </Grid>
      <Divider />
      <Grid item>
        <Collapse in={!!data?.sendTestEmail}>
          <Grid item>{JSON.stringify(data?.sendTestEmail)}</Grid>
        </Collapse>
      </Grid>
      <Grid item>
        <Collapse in={!!error}>
          <Grid item>{error?.message}</Grid>
        </Collapse>
      </Grid>
    </Grid>
  );
};

Mails.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;
export default Mails;
