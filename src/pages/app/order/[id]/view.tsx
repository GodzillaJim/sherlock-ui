import React, {useEffect, useState} from "react";
import MainLayout from "../../../../layout/MainLayout";
import {useRouter} from "next/router";
import {GetServerSidePropsContext} from "next";
import nextCookies from "next-cookies";
import {createApolloClient} from "../../../../Apollo";
import {Attachment, GetOrderDocument, Order} from "../../../../generated";
import {Box, Button, Card, CardContent, Grid, ListItem, ListItemText, Paper,} from "@mui/material";
import CustomEditor from "../../../../components/CustomEditor";
import {EditorState} from "draft-js";
import {v4} from "uuid";
import dayjs from "dayjs";

const OrderDetails = (props: { order: Order }) => {
    const isServerSide = typeof window === "undefined";
    const router = useRouter();

    const order = props.order as Order;

    const [editor, setEditor] = useState<EditorState>();

    useEffect(() => {
        if (isServerSide) {
            return;
        }
        setEditor(() => EditorState.createEmpty());
    }, [isServerSide]);

    const handleEdit = () => {
        router.push(`/app/order/${order.orderId}/edit`).then()
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={8}>
                    <Grid container direction={"column"} spacing={2}>
                        <Grid item>
                            <Card>
                                <CardContent>
                                    <ListItem>
                                        <ListItemText primary={order.title} secondary={"Title"}/>
                                    </ListItem>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Paper sx={{p: 3}}>
                                <CustomEditor
                                    readView={true}
                                    value={editor}
                                    onChange={(content: EditorState) => setEditor(content)}
                                />
                            </Paper>
                        </Grid>
                        {order.attachments && order.attachments.length && <Grid item>
                            <Paper sx={{p: 3}}>
                                {order.attachments?.map((value, index) => {
                                    const attachment = value as Attachment;
                                    return (
                                        <Button
                                            href={attachment.location as string}
                                            key={`key-${v4()}`}
                                            variant={"text"}
                                        >{`Attachment ${index + 1}`}</Button>
                                    );
                                })}
                            </Paper>
                        </Grid>}
                        <Grid item>
                            <Grid container spacing={3} justifyContent={"end"}>
                                <Grid item>
                                    <Button
                                        onClick={handleEdit}
                                        variant={"contained"}
                                        color={"success"}
                                    >
                                        Edit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <Card>
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: (theme) => theme.spacing(5),
                                }}
                            >
                                <ListItem>
                                    <ListItemText primary={order.numberOfPages} secondary={'Number of Pages'}/>
                                </ListItem>

                                <ListItem>
                                    <ListItemText primary={dayjs(order.deadline).format('DD, MMM YYYY')}
                                                  secondary={'Deadline'}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={order.type} secondary={'Type of Work'}/>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={order.writingStyle} secondary={'Writing Style'}/>
                                </ListItem>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

OrderDetails.getLayout = function (page: React.ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const id = context?.params?.id;
        const authToken = nextCookies(context).authToken;
        if (!id || !authToken) return;
        const client = createApolloClient(authToken);
        const {data} = await client.query({
            context,
            query: GetOrderDocument,
            fetchPolicy: "no-cache",
            variables: {orderId: id},
        });

        return {props: {order: data.getOrder}};
    } catch (e: any) {
        return {props: {errorCode: 500, error: JSON.stringify(e)}};
    }
}

export default OrderDetails;
