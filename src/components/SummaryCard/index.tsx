import {Order} from "../../generated";
import {Box, Button, Card, CardContent, Grid, List, ListItem, ListItemText} from "@mui/material";
import React from "react";
import {useRouter} from "next/router";
import dayjs from "dayjs";

type SummaryCardType = {
    order: Order;
};
const SummaryCard = ({order}: SummaryCardType) => {
    const router = useRouter();
    const handleClick = (type: 'view' | 'edit') => {
        router.push(`/app/order/${order.orderId}/${type}`).then();
    };
    return (
        <Card>
            <CardContent sx={{p: 2}}>
                <Grid container spacing={2} direction={'column'}>
                    <Grid item>
                        <List>
                            <ListItem>
                                <ListItemText primary={order.title}
                                              secondary={`Created on ${dayjs(order.createdAt).format('D MMM YYYY')}`}/>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item>
                        <Box sx={{display: 'flex', direction: 'row', justifyContent: 'space-between'}}>
                            <Button onClick={() => handleClick('view')}>Details</Button>
                            <Button onClick={() => handleClick('edit')}>Edit</Button>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SummaryCard;
