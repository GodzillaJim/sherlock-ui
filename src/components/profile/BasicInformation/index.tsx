import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
} from "@mui/material";
import AdditionalInformation from "./AdditionalInformation";

const BasicInformation = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setProfileImage(e.target.files[0]);
    }
  };
  return (
    <Grid container direction={"row"} width={"100%"} gap={3}>
      <Grid xs={12} sm={12} md={3} item>
        <Card>
          <CardContent>
            <Grid
              container
              direction={"column"}
              justifyContent="center"
              textAlign={"center"}
              gap={3}
            >
              <Grid item>
                {!profileImage && (
                  <Avatar
                    sx={{ width: "200px", height: "200px", margin: "auto" }}
                  />
                )}
                {profileImage && (
                  <CardMedia
                    sx={{
                      width: "200px",
                      height: "200px",
                      mx: "auto",
                      borderRadius: 1,
                    }}
                    image={URL.createObjectURL(profileImage)}
                  />
                )}
              </Grid>
              <Grid item>
                <TextField
                  onChange={handleFileUpload}
                  type={"file"}
                  name="profile-image"
                  size="small"
                />
              </Grid>
              <Grid item>
                <Button fullWidth variant="contained" size="small">
                  Save image
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} sm={12} md={8} item>
        <AdditionalInformation />
      </Grid>
    </Grid>
  );
};

export default BasicInformation;
