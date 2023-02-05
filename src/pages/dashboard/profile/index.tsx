import {ProfileOutlined, UserOutlined} from "@ant-design/icons";
import {Box, Button, Grid, Tab, TabProps, Tabs, Typography,} from "@mui/material";
import React, {ReactNode} from "react";
import TabPanel from "../../../components/Tabs/TabPanel";
import {PaymentOutlined} from "@mui/icons-material";
import BasicInformation from "../../../components/profile/BasicInformation";
import Transitions from "../../../components/Transitions";
import MainLayout from "../../../layout/MainLayout";

const getProps = (index: number) => {
    return {
        id: `custom-tab-${index}`,
        "aria-controls": `custom-tabpanel-${index}`,
    };
};

type CustomTabProps = TabProps & {
    label: string;
    tabIndex: number;
    index: number;
};
const CustomTab = (props: CustomTabProps) => {
    return (
        <Tab
            {...props}
            label={
                <Typography
                    variant="caption"
                    color={(theme) =>
                        props.tabIndex === props.index
                            ? theme.palette.primary.main
                            : theme.palette.text.secondary
                    }
                >
                    {props.label}
                </Typography>
            }
        />
    );
};

const Profile = () => {
    const [tabIndex, setTabIndex] = React.useState<number>(0);
    const handleProfileChange = (event: React.SyntheticEvent, index: number) => {
        setTabIndex(index);
    };
    return (
        <Grid container direction={"column"}>
            <Grid item>
                <Button color="inherit" variant="text" startIcon={<ProfileOutlined/>}>
                    <Typography variant="h4">User Profile</Typography>
                </Button>
            </Grid>
            <Grid item>
                <Box sx={{width: "100%", py: 2}}>
                    <Box sx={{borderBottom: 1, borderColor: "divide"}}>
                        <Tabs
                            aria-label="profile-tabs"
                            value={tabIndex}
                            onChange={handleProfileChange}
                        >
                            <CustomTab
                                icon={<UserOutlined/>}
                                iconPosition="start"
                                label="Basic Information"
                                {...getProps(0)}
                                sx={{minHeight: "auto"}}
                                index={0}
                                tabIndex={tabIndex}
                            />
                            <CustomTab
                                icon={<PaymentOutlined/>}
                                iconPosition="start"
                                sx={{minHeight: "auto"}}
                                label="Payment Information"
                                {...getProps(2)}
                                index={2}
                                tabIndex={tabIndex}
                            />
                        </Tabs>
                    </Box>
                    <TabPanel value={tabIndex} index={0}>
                        <Transitions in={tabIndex === 0} position="top" type="collapse">
                            <BasicInformation/>
                        </Transitions>
                    </TabPanel>
                    <TabPanel value={tabIndex} index={2}>
                        Payment Information
                    </TabPanel>
                </Box>
            </Grid>
        </Grid>
    );
};

Profile.getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>

export default Profile;
