// import React from "react";
import Box from "@mui/material/Box";
import CodeEditor from "./CodeEditor";
// import { javascript } from "@codemirror/lang-javascript";

function EditorContainer() {
  return (
    <Box sx={{ maxHeight: "100vh", overflowY: "scroll" }}>
      <CodeEditor />
    </Box>
  );
}
export default EditorContainer;
