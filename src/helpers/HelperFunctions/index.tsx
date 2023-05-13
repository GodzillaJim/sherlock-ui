import {DefaultExtensionType} from "react-file-icon";

export function getEnumAsArray(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    enumObj: any
): { label: string; value: string | number }[] {
    const enumArray = [];

    for (const key in enumObj) {
        if (isNaN(Number(key))) {
            const value = enumObj[key];

            enumArray.push({
                label: key,
                value: typeof value === "string" ? value : value.toString(),
            });
        }
    }

    return enumArray;
}

export const getExtensionFromMimeType = (mimeType: string): DefaultExtensionType => {
    const mimeTypesToExtensions: { [key: string]: DefaultExtensionType } = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'application/pdf': 'pdf',
        'application/msword': 'doc',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'application/xml': 'xls',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        'application/vnd.ms-excel': 'xls',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
        'application/vnd.ms-powerpoint': 'ppt',
        'application/zip': 'zip',
        'application/x-tar': 'zip',
        'application/x-bzip2': 'zip',
        'application/x-7z-compressed': 'zip',
        'application/x-rar-compressed': 'zip',
        'text/plain': 'txt',
        // Add more MIME types and extensions as needed
    };

    return mimeTypesToExtensions[mimeType] || 'txt';
}
