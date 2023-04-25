import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import {OrderInput, Type, WritingStyle} from "../../../generated";
import MainLayout from "../../../layout/MainLayout";
import {addDays} from "date-fns";
import {date, number, object, string} from "yup";
import {Box, Button, Card, CardContent, Grid, Paper, TextField,} from "@mui/material";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DateTimePicker from "../../../components/DateTimePicker";
import Dropdown, {DropdownOption} from "../../../components/Dropdown";
import {getEnumAsArray} from "../../../helpers/HelperFunctions";
import CustomEditor from "../../../components/CustomEditor";
import {EditorState} from "draft-js";
import FileUploader from "../../../components/FileUploader";
import useUploadAttachments from "../../../helpers/orders/useUploadAttachments";

const CreateOrder = () => {
    const isServerSide = typeof window === "undefined";
    const [editorState, setEditorState] = useState<EditorState>();
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        if (isServerSide) {
            return;
        }
        setEditorState(() => EditorState.createEmpty());
    }, [isServerSide]);

    const {uploadAttachments, error} = useUploadAttachments();

    useEffect(() => {
        if (error) {
            console.log('UploadAttachmentsError: ', error)
        }
    }, [error])

    const initialValues: OrderInput = {
        deadline: addDays(new Date(), 1),
        numberOfPages: 1,
        title: "",
        type: Type.Article,
        writingStyle: WritingStyle.Apa7,
        description: "",
        attachments: [],
    };

    const requiredMessage = "This field is required!";

    const validationSchema = object().shape({
        title: string().required(requiredMessage),
        type: string().required(requiredMessage),
        numberOfPages: number().required(requiredMessage),
        writingStyle: string().required(requiredMessage),
        deadline: date().required(requiredMessage),
        description: string(),
    });

    const onSubmit = async (vals: OrderInput) => {
        try {
            const attachments = await uploadAttachments(files)
            console.log({...vals, attachments});
        } catch (e: any) {
            console.log('Upload attachments error: ', e)
            alert('Failed to upload: ' + e.message)
        }
    };
    const {handleSubmit, values, setFieldValue, errors, touched} =
        useFormik<OrderInput>({
            initialValues,
            onSubmit,
            validationSchema,
        });

    const getOrderTypeOptions = (): DropdownOption[] => {
        return getEnumAsArray(Type);
    };

    const getWritingStyleOptions = (): DropdownOption[] => {
        return getEnumAsArray(WritingStyle);
    };

    if (isServerSide) return <div/>;
    return (
        <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={8}>
                    <Grid container direction={"column"} spacing={2}>
                        <Grid item>
                            <Card>
                                <CardContent>
                                    <TextField
                                        size="small"
                                        label={"Title"}
                                        fullWidth
                                        value={values.title}
                                        onChange={(e) =>
                                            setFieldValue("title", e.target.value || "")
                                        }
                                        error={Boolean(touched.title && errors.title)}
                                        helperText={touched.title ? errors.title : undefined}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item>
                            <Paper sx={{p: 3}}>
                                <CustomEditor
                                    value={editorState}
                                    onChange={(content: EditorState) => setEditorState(content)}

                                />
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper sx={{p: 3}}>
                                <FileUploader onChange={(files: File[]) => setFiles(files)}/>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={3} justifyContent={"end"}>
                                <Grid item>
                                    <Button variant={"contained"} color={"error"}>
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => handleSubmit()} variant={"contained"} color={"success"}>
                                        Create Order
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
                                <TextField
                                    label="Number of Pages"
                                    type="number"
                                    value={values.numberOfPages}
                                    onChange={(e) =>
                                        setFieldValue("numberOfPages", e.target.value)
                                    }
                                    error={Boolean(touched.numberOfPages && errors.numberOfPages)}
                                    helperText={touched.numberOfPages && errors.numberOfPages}
                                    size="small"
                                />
                                <DateTimePicker
                                    label="Deadline"
                                    value={values.deadline}
                                    onChange={(date) => setFieldValue("deadline", date)}
                                    disablePast
                                    setValue={(date) => setFieldValue("deadline", date)}
                                />
                                <Dropdown
                                    label="Type of Work"
                                    options={getOrderTypeOptions()}
                                    value={values.type}
                                    onChange={(val) => setFieldValue("type", val)}
                                    touched={touched.type}
                                    error={Boolean(touched.type && errors.type)}
                                    helperText={
                                        touched.type && errors.type ? errors.type : undefined
                                    }
                                />
                                <Dropdown
                                    label="Writing Style"
                                    options={getWritingStyleOptions()}
                                    value={values.writingStyle}
                                    onChange={(val) => setFieldValue("writingStyle", val)}
                                    touched={touched.writingStyle}
                                    error={Boolean(touched.writingStyle && errors.writingStyle)}
                                    helperText={
                                        touched.writingStyle && errors.writingStyle
                                            ? errors.writingStyle
                                            : undefined
                                    }
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </form>
    );
};

CreateOrder.getLayout = function (page: React.ReactNode) {
    return <MainLayout>{page}</MainLayout>;
};

export default CreateOrder;
