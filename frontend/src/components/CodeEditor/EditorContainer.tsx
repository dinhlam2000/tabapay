// import React from "react";
import Box from "@mui/material/Box";
import CodeEditor from "./CodeEditor";
// import { javascript } from "@codemirror/lang-javascript";
import { useFileSystems } from "../../hooks/use-file-systems";

function EditorContainer() {
  const { data: dataSource } = useFileSystems();
  return (
    <Box sx={{ maxHeight: "100vh", overflowY: "scroll" }}>
      <CodeEditor />
    </Box>
  );
}
export default EditorContainer;
