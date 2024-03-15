import React, { useEffect, useMemo } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box, Divider, Typography } from "@mui/material";
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
};

const CustomEditor = ({
  onChange,
  value,
  orderId,
  readView,
  label,
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
          <Typography
            component={"div"}
            variant="h5"
            color={"InfoText"}
            textTransform={"uppercase"}
          >
            {label || "Instructions"}
          </Typography>
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
