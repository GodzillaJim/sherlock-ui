import React, { useEffect, useMemo } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  Box,
  Divider,
  FormHelperText,
  InputLabel,
  Tooltip,
  Typography,
} from "@mui/material";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";
import { clearInterval } from "timers";
import { editorStateToHtml, fromEditorState } from "../../helpers/editor";
import { useSaveOrderDescriptionMutation } from "../../Apollo/schema/SaveOrderDescription.generated";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

type CustomEditorProps = {
  onChange: (content: EditorState) => void;
  value: EditorState | undefined;
  orderId?: string;
  readView: boolean;
  setValue?: (description: string) => void;
  label?: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
};

const CustomEditor = ({
  onChange,
  value,
  orderId,
  readView,
  label,
  required,
  error,
  helperText,
}: CustomEditorProps) => {
  const handleEditorChange = (newEditorSate: EditorState) => {
    onChange(newEditorSate);
  };

  const [saveDescription] = useSaveOrderDescriptionMutation();

  const view = useMemo(() => {
    return value ? editorStateToHtml(value) : "";
  }, [value]);

  useEffect(() => {
    if (orderId) {
      const intervalId = setInterval(() => {
        let description = fromEditorState(EditorState.createEmpty());

        if (value) {
          description = fromEditorState(value);
        }

        saveDescription({ variables: { orderId, description } }).then();
      }, 60000);

      return clearInterval(intervalId);
    }
  }, [orderId]);
  return (
    <div>
      {
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <InputLabel required={required} variant="filled">
            <Tooltip title="This field is required">
              <Typography
                component={"span"}
                variant="h6"
                color={"InfoText"}
                textTransform={"capitalize"}
              >
                {label || "Instructions"}
              </Typography>
            </Tooltip>
            {helperText ? (
              <FormHelperText
                sx={{
                  color: (theme) =>
                    error ? theme.palette.error.main : "inherit",
                }}
              >
                {helperText}
              </FormHelperText>
            ) : (
              ""
            )}
          </InputLabel>
          <Divider />
          <div>
            {readView && (
              <div dangerouslySetInnerHTML={{ __html: view as string }} />
            )}
            {!readView && (
              <Editor
                editorState={value}
                onEditorStateChange={handleEditorChange}
                editorClassName="editorClassName"
                placeholder="Start typing..."
                ariaLabel="task description"
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "fontFamily",
                    "list",
                    "textAlign",
                    "colorPicker",
                    "link",
                    "embedded",
                    "emoji",
                    "remove",
                    "history",
                  ],
                }}
              />
            )}
          </div>
        </Box>
      }
    </div>
  );
};

export default CustomEditor;
