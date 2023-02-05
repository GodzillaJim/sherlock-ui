import React, {useContext, useEffect, useState} from "react";
import {Avatar, Button, Card, CardContent, CardMedia, Grid, TextField,} from "@mui/material";
import AdditionalInformation from "./AdditionalInformation";
import {useLoggedInUserQuery} from "../../../generated";
import axios from "axios";
import {AuthContext} from "../../../Context/AuthManager";
import {imageHost} from "../../../config/Constants";
import Image from "next/image";

const BasicInformation = () => {
    const {data, refetch} = useLoggedInUserQuery();
    const [profileImage, setProfileImage] = useState<File | string | null>(null);
    const [loading, setLoading] = useState(false);

    const authContext = useContext(AuthContext);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setProfileImage(e.target.files[0]);
        }
    };

    const saveImage = async () => {
        setLoading(true);
        try {
            const token = authContext?.authDetails?.jwtToken?.jwtToken;
            if (profileImage && typeof profileImage !== "string" && token) {
                const formData = new FormData();
                formData.append("file", profileImage);
                await axios.post("http://localhost:4000/profile", formData, {
                    headers: {
                        Authorization: token,
                        "Content-Type": "multipart/form-data",
                    },
                });
            }
            await refetch();
            alert("Image saved");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            alert("Error: " + e.message);
            console.log(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (data) {
            const image = data.me?.profilePic;
            if (image) {
                setProfileImage(image);
            }
        }
    }, [data]);
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
                                        sx={{width: "200px", height: "200px", margin: "auto"}}
                                    />
                                )}
                                {profileImage && (
                                    <CardMedia sx={{borderRadius: 8}}>
                                        <Image width={200} height={200} src={typeof profileImage === "string"
                                            ? `${imageHost}${profileImage}`
                                            : URL.createObjectURL(profileImage)} alt={'profile pic'}/>
                                    </CardMedia>
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
                                <Button
                                    disabled={!profileImage || loading}
                                    fullWidth
                                    variant="contained"
                                    size="small"
                                    onClick={saveImage}
                                    color="secondary"
                                >
                                    Save image
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid xs={12} sm={12} md={8} item>
                <AdditionalInformation/>
            </Grid>
        </Grid>
    );
};

export default BasicInformation;
