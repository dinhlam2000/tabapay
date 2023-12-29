import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";

export interface RenderTree {
  id: string;
  name: string;
  content?: string;
  isFolder?: boolean;
  children: RenderTree[];
}

type OnNodeSelectCallback = (nodeId: string) => void;

export default function MultiSelectTreeView({
  treeContent,
  onSelectNode,
  defaultExpandedID,
}: {
  treeContent: RenderTree;
  onSelectNode: OnNodeSelectCallback;
  defaultExpandedID: Array<string>;
}) {
  const handleNodeSelect = (_: any, node: string) => {
    onSelectNode(node);
  };
  const renderTree = (nodes: RenderTree) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name.split("/").slice(-1)}
      sx={{
        ".MuiTreeItem-content .MuiTreeItem-label": { fontSize: "inherit" },
      }}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 300 }}>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        onNodeSelect={handleNodeSelect}
        defaultExpanded={defaultExpandedID}
        sx={{
          height: "calc(100vh - 80px - 24px)",
          flexGrow: 1,
          maxWidth: 400,
          overflowY: "auto",
          fontSize: "0.8rem",
        }}
      >
        {renderTree(treeContent)}
      </TreeView>
    </Box>
  );
}
