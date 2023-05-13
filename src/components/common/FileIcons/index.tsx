import React, {ReactNode} from "react";
import {defaultStyles, FileIcon} from "react-file-icon";

export const getIconFromExtension = (extension: string): ReactNode | undefined => {
    const icons: { [extension: string]: ReactNode } = {
        'zip': <FileIcon extension={'zip'} {...defaultStyles['zip']} />,
        'rar': <FileIcon extension={'rar'} {...defaultStyles['zip']} />
    }
    return icons[extension]
}