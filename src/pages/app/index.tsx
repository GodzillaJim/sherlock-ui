import React, {useMemo} from "react";
import MainLayout from "../../layout/MainLayout";
import {GetMyOrdersDocument, Order, OrderPage} from "../../generated";
import {Divider, Grid, Typography} from "@mui/material";
import {v4} from "uuid";
import SummaryCard from "../../components/SummaryCard";
import {GetServerSidePropsContext} from "next";
import {createApolloClient} from "../../Apollo";
import {ApolloError} from "@apollo/client";

type DashboardProps = {
    error?: ApolloError | { message: string }
    myOrders: OrderPage
}

const Dashboard = ({myOrders}: DashboardProps): JSX.Element => {
    const drafts = useMemo(() => {
        if (myOrders && myOrders.docs?.length) {
            const orders = myOrders.docs as Order[];
            return orders.filter((order) => !order?.published);
        }
        return [];
    }, [myOrders]);

    const published = useMemo(() => {
        if (myOrders && myOrders.docs?.length) {
            const orders = myOrders.docs as Order[];
            return orders.filter((order) => Boolean(order?.published));
        }
        return [];
    }, [myOrders]);

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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    try {
        const authToken = context.req.cookies.authToken
        if (!authToken) {
            return {props: {error: {message: 'Login to continue'}}}
        }
        const client = createApolloClient(authToken)

        const {data, error} = await client.query({query: GetMyOrdersDocument})
        if (error) {
            return {props: {error}}
        }

        return {props: {myOrders: data.getMyOrders}}
    } catch (error: any/*tslint:disable-line:no-explicit-any*/) {
        console.log('Error: ', error)
        return {props: {error: {message: error?.message || "Something went wrong"}}}
    }
}

export default Dashboard;
