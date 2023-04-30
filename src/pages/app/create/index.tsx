import React, {useEffect} from "react";
import MainLayout from "../../../layout/MainLayout";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    FormGroup,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import {useFormik} from "formik";
import {MutationCreateOrderFromTitleArgs, useCreateOrderFromTitleMutation} from "../../../generated";
import {object, string} from "yup";
import {useRouter} from "next/router";

const CreateOrder = () => {
    const [createOrderFromTitle, {loading, data, error}] = useCreateOrderFromTitleMutation()
    const router = useRouter()

    useEffect(() => {
        if (data && data.createOrderFromTitle) {
            router.push(`/app/order/${data.createOrderFromTitle?.data}`).then()
        }
    }, [data])

    useEffect(() => {
        if (error) {
            alert(error.message)
        }
    }, [error])

    const {handleSubmit, handleChange, errors, values, touched, isValid} = useFormik<MutationCreateOrderFromTitleArgs>({
        initialValues: {
            title: ''
        },
        validationSchema: object().shape({
            title: string().required('A title is required')
        }),
        onSubmit: async (parameters) => {
            await createOrderFromTitle({variables: {title: parameters.title}})
        }
    })
    return (
        <Grid
            container
            sx={{width: "100%", height: "calc(100vh - 100px)"}}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Grid item xs={12} sm={12} md={7}>
                <Card>
                    <CardContent>
                        <Grid container direction={"column"} spacing={3}>
                            <Grid item>
                                <Typography variant={"h4"}>Create order</Typography>
                            </Grid>
                            <Divider/>
                            <Grid item>
                                <form noValidate onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={9}>
                                                <TextField name={'title'} value={values.title} onChange={handleChange}
                                                           error={Boolean(touched.title && errors.title)}
                                                           helperText={touched.title && errors.title} size={'medium'}
                                                           fullWidth
                                                           label={"Enter a title for your paper"}/>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <Button disabled={values.title === '' || !isValid || loading}
                                                        sx={{mt: 0.5}}
                                                        size={'large'}
                                                        type={'submit'}
                                                        variant={'contained'}
                                                        fullWidth>{loading ? <CircularProgress
                                                    variant={'determinate'}/> : 'Create Order'}</Button>
                                            </Grid>
                                        </Grid>
                                    </FormGroup>
                                </form>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

CreateOrder.getLayout = function (page: React.ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

export default CreateOrder;
