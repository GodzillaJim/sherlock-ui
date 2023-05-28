import {convertFromRaw, convertToRaw, EditorState} from "draft-js";

export const toEditorState = (contentString: string) => {
    const rawContentState = JSON.parse(contentString);
    if (!rawContentState) return EditorState.createEmpty()
    const contentState = convertFromRaw(rawContentState);
    return EditorState.createWithContent(contentState);
}

export const fromEditorState = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    return JSON.stringify(rawContentState);
}