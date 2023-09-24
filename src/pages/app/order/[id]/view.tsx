import React, {useState} from "react";
import MainLayout from "../../../../layout/MainLayout";
import {useRouter} from "next/navigation";
import {GetServerSidePropsContext} from "next";
import {createApolloClient} from "../../../../Apollo";
import {Attachment, GetOrderDocument, Order} from "../../../../generated";
import {Box, Button, Card, CardContent, Grid, ListItem, ListItemText, Paper,} from "@mui/material";
import CustomEditor from "../../../../components/CustomEditor";
import {EditorState} from "draft-js";
import dayjs from "dayjs";
import AttachmentList from "../../../../components/edit/AttachmentList";
import {toEditorState} from "../../../../helpers/editor";

const OrderDetails = ({order}: { order: Order }) => {
    const router = useRouter();

    const [editor, setEditor] = useState<EditorState>(() => {
        if (order && order.description) {
            return toEditorState(order.description)
        }
        return EditorState.createEmpty()
    });

    const handleEdit = () => {
        router.push(`/app/order/${order.orderId}/edit`)
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
                        {order.attachments && order.attachments.length ? <Grid item>
                            <Paper sx={{p: 3}}>
                                <AttachmentList
                                    attachments={order.attachments.length ? order.attachments as Attachment[] : []}/>
                            </Paper>
                        </Grid> : ''}
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
        const authToken = context.req.cookies.authToken
        if (!authToken) {
            return {props: {error: {message: 'Login to continue'}}}
        }
        const client = createApolloClient(authToken)

        const orderId = context?.params?.id;
        if (!orderId) return;

        const {data, error} = await client.query({query: GetOrderDocument, variables: {orderId}})
        if (error) {
            return {props: {error}}
        }

        return {props: {order: data.getOrder}}
    } catch (error: any/*tslint:disable-line:no-explicit-any*/) {
        console.log('Error: ', error)
        return {props: {error: {message: error?.message || "Something went wrong"}}}
    }
}

export default OrderDetails;
