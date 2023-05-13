import {Button, Card, ListItem, ListItemText, styled, Typography} from "@mui/material";
import {defaultStyles, FileIcon} from "react-file-icon";
import React, {useEffect, useState} from "react";
import {Attachment, useDeleteAttachmentMutation} from "../../../generated";
import Image from "next/image";
import {getExtensionFromMimeType} from "../../../helpers/HelperFunctions";
import {useRouter} from "next/router";
import {DeleteForever, FileDownload} from "@mui/icons-material";
import {getIconFromExtension} from "../../common/FileIcons";

type AttachmentItemProps = {
    attachment: Attachment;
    index: number;
};

const IconWrapper = styled("div")({
    width: 50,
    height: 60,
    objectFit: 'contain'
});

const Box = styled("div")(({theme}) => ({
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing(1),
}));

const StyledCard = styled(Card)(({theme}) => ({
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: theme.spacing(1),
    },
    [theme.breakpoints.up('sm')]: {
        minWidth: 300
    }
}))

const CustomTypography = styled(Typography)<{ disabled: boolean }>(({theme, disabled}) => ({
    color: disabled ? theme.palette.divider : 'inherit'
}))

CustomTypography.defaultProps = {
    disabled: false
}

const AttachmentItem = ({attachment, index}: AttachmentItemProps) => {
    const router = useRouter()
    const {id} = router.query
    const [deleted, setDeleted] = useState(false)

    const [deleteAttachment, {loading, error, data}] = useDeleteAttachmentMutation()
    const getName = (name?: string) => {
        if (!name) return "Attachment " + (index + 1)
        if (name.length <= 30) return name
        return "..." + name.split("").splice(name.length - 30).join("")
    }
    useEffect(() => {
        if (error) {
            alert(error.message)
        }
        if (data) {
            alert(data.deleteAttachment?.message)
        }
        console.log('Attachment: ', attachment)
    })

    const extension = getExtensionFromMimeType(attachment.mimeType as string)
    const handleDeleteAttachment = async () => {
        if (!id) return
        await deleteAttachment({variables: {orderId: id as string, attachmentKey: attachment.key}})
        setDeleted(true)
    }

    const handleDownload = async () => {
        try {
            const file = attachment.name + ''
            const url = `${attachment.location + ''}?response-content-disposition=attachment;filename=${file}`
            const link = document.createElement('a')
            link.href = url
            link.click()
            // eslint-disable-next-line
        } catch (e: any) {
            console.log(e.message, e)
        }
    }

    const getIcon = () => {
        if (attachment.mimeType && attachment.mimeType.startsWith('image')) {
            return <Image width={50} height={60} style={{objectFit: 'contain', borderRadius: 2}}
                          src={attachment.location as string}
                          alt={attachment.name + ''}/>
        }
        const fileExtension = (attachment.name + '').substring((attachment.name + '').lastIndexOf(".") + 1)
        console.log('FileExtension: ', {fileExtension})
        if (fileExtension && getIconFromExtension(fileExtension)) return getIconFromExtension(fileExtension)
        if (getIconFromExtension(extension)) {
            return getIconFromExtension(extension)
        }
        return <FileIcon extension={extension} {...defaultStyles[extension]} />
    }
    return (
        <ListItem>
            <StyledCard>
                <ListItemText
                    primary={
                        <Box>
                            <IconWrapper>
                                {getIcon()}

                            </IconWrapper>
                            <div>

                                <CustomTypography disabled={loading || deleted}>{`${
                                    getName(attachment.name as string)
                                }`}</CustomTypography>
                            </div>
                        </Box>
                    }
                    secondary={
                        <Box>
                            {attachment.location && (
                                <Button startIcon={<FileDownload/>} onClick={handleDownload}
                                        disabled={loading || deleted}>Download</Button>
                            )}
                            <Button startIcon={<DeleteForever/>} disabled={loading || deleted} variant={'text'}
                                    color={'error'}
                                    onClick={handleDeleteAttachment}>Delete</Button>
                        </Box>
                    }
                />
            </StyledCard>
        </ListItem>
    );
};

export default AttachmentItem;
