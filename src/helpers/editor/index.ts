import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";

export const toEditorState = (contentString: string) => {
  try {
    const rawContentState = JSON.parse(contentString);
    if (!rawContentState) return EditorState.createEmpty();
    const contentState = convertFromRaw(rawContentState);
    return EditorState.createWithContent(contentState);
  } catch (e) {
    return EditorState.createEmpty();
  }
};

export const fromEditorState = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  return JSON.stringify(rawContentState);
};

export const editorStateToHtml = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  if (!contentState) return "";
  const rawContent = convertToRaw(contentState);
  return draftToHtml(rawContent);
};
