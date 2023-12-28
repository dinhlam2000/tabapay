import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

interface RenderTree {
  id: string;
  name: string;
  content?: string;
  children?: readonly RenderTree[];
}

const data: RenderTree = {
  id: "root",
  name: "TABAPAY",
  children: [
    {
      id: "1",
      name: "static",
    },
    {
      id: "3",
      name: "src",
      children: [
        {
          id: "4",
          name: "App.tsx",
        },
      ],
    },
  ],
};

export default function MultiSelectTreeView() {
  const renderTree = (nodes: RenderTree) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <Box sx={{ minHeight: 110, flexGrow: 1, maxWidth: 300 }}>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {renderTree(data)}
      </TreeView>
    </Box>
  );
}
