import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box, Divider, Typography } from "@mui/material";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

type CustomEditorProps = {
  onChange: (content: EditorState) => void;
  value: EditorState | undefined;
};

const CustomEditor = ({ onChange, value }: CustomEditorProps) => {
  const handleEditorChange = (newEditorSate: EditorState) => {
    onChange(newEditorSate);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography
        component={"div"}
        variant="h5"
        color={"InfoText"}
        textTransform={"uppercase"}
      >
        Instructions
      </Typography>
      <Divider />
      <div>
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
      </div>
    </Box>
  );
};

export default CustomEditor;
