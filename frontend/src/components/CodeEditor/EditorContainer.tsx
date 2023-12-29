// import React from "react";
import Box from "@mui/material/Box";
import CodeEditor from "./CodeEditor";
// import { javascript } from "@codemirror/lang-javascript";
import { RenderTree } from "../TreeView/MultiSelectTreeView";

function EditorContainer({
  selectedNode,
}: {
  selectedNode: RenderTree | undefined;
}) {
  return (
    <Box sx={{ height: "100%", overflowY: "scroll", fontSize: "0.8rem" }}>
      <CodeEditor selectedNode={selectedNode} />
    </Box>
  );
}
export default EditorContainer;
