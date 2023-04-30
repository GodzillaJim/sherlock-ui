import React, {useMemo} from "react";
import MainLayout from "../../layout/MainLayout";
import {Order, useGetMyOrdersQuery} from "../../generated";
import {Divider, Grid, Typography} from "@mui/material";
import {v4} from "uuid";
import SummaryCard from "../../components/SummaryCard";

const Dashboard = (): JSX.Element => {
    const {data} = useGetMyOrdersQuery();

    const drafts = useMemo(() => {
        if (data && data.getMyOrders && data.getMyOrders.docs) {
            const orders = data.getMyOrders.docs as Order[];
            return orders.filter((order) => !order?.published);
        }
        return [];
    }, [data]);

    const published = useMemo(() => {
        if (data && data.getMyOrders && data.getMyOrders.docs) {
            const orders = data.getMyOrders.docs as Order[];
            return orders.filter((order) => Boolean(order?.published));
        }
        return [];
    }, [data]);

    return (
        <Grid container padding={2} spacing={5} direction={'column'}>
            {drafts.length && <Grid item>
                <Grid container direction={"column"} spacing={2}>
                    <Grid item>
                        <Typography variant={"h5"}>Drafts</Typography>
                    </Grid>
                    <Grid item>
                        <Divider variant={"fullWidth"}/>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={1}>
                            {drafts.map((order) => {
                                return (
                                    <Grid key={`key-${v4()}-${order.orderId}`} item>
                                        <SummaryCard order={order}/>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>}
            {published.length ? <Grid item>
                <Grid container direction={"column"} spacing={2}>
                    <Grid item>
                        <Typography variant={"h5"}>Published</Typography>
                    </Grid>
                    <Grid item>
                        <Divider variant={"fullWidth"}/>
                    </Grid>
                    <Grid item>
                        <Grid container spacing={1}>
                            {published.map((order) => {
                                return (
                                    <Grid key={`key-${v4()}-${order.orderId}`} item>
                                        <SummaryCard order={order}/>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid> : ''}
        </Grid>
    );
};

Dashboard.getLayout = function (page: React.ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

export default Dashboard;
