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
  console.log("selectedNode", selectedNode);
  return (
    <Box sx={{ height: "100%", overflowY: "scroll", fontSize: "0.8rem" }}>
      <CodeEditor fileContent={selectedNode?.content} />
    </Box>
  );
}
export default EditorContainer;
