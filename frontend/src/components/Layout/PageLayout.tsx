import React, { useCallback, useEffect, useMemo, useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

// Components
import MultiSelectTreeView, {
  RenderTree,
} from "../TreeView/MultiSelectTreeView";
import EditorContainer from "../CodeEditor/EditorContainer";
import { useFileSystems } from "../../hooks/use-file-systems";
import { treeParser } from "../../utils/TreeParser";
import { BottomNavigation, Paper } from "@mui/material";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  // backgroundColor: theme.palette.secondary.main,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "inherit",
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function PageLayout() {
  const { data: dataSource } = useFileSystems();
  const [currentNodeID, setCurrentNodeID] = useState<string | undefined>(
    undefined
  );
  const [selectedNode, setSelectedNode] = useState<RenderTree | undefined>(
    undefined
  );

  const tree = useMemo(() => treeParser(dataSource || []), [dataSource]);

  const allKeys = useMemo(() => {
    const allObject = Object.keys(tree.folderMapperId);
    allObject.splice(0, 0, "root");
    return allObject;
  }, [tree]);

  const handleNodeSelect = useCallback(
    (nodeId: string) => {
      const node = tree.folderMapperId[nodeId];
      if (!node?.isFolder) {
        setCurrentNodeID(nodeId);
        setSelectedNode(tree.folderMapperId[nodeId]);
      }
    },
    [setCurrentNodeID, setSelectedNode, tree]
  );

  useEffect(() => {}, []);
  const [open, setOpen] = React.useState(true);
  const [anchorElProfile, setAnchorElProfile] =
    React.useState<null | HTMLElement>(null);

  const toggleDrawer = () => {
    // setOpen(!open);
  };

  const handleProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorElProfile(null);
  };

  const getFileType = (fileName: string) => {
    if (fileName.endsWith(".tsx") || fileName.endsWith(".ts")) {
      return "Typescript";
    } else if (fileName.endsWith(".py")) {
      return "Python";
    } else if (fileName.endsWith(".yml") || fileName.endsWith(".yaml")) {
      return "YAML";
    } else if (fileName.endsWith(".md")) {
      return "Markdown";
    } else if (fileName.endsWith(".scss") || fileName.endsWith(".css")) {
      return "CSS";
    } else if (fileName.endsWith(".json")) {
      return "JSON";
    } else {
      return "Text";
    }
  };
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open} color="secondary">
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Welcome to this project
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleProfileOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElProfile}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElProfile)}
              onClose={handleProfileClose}
            >
              <MenuItem onClick={handleProfileClose}>Profile</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <Box
            component="img"
            sx={{
              height: 35,
              // width: 2,
            }}
            alt="The house from the offer."
            src="/assets/tabapay.png"
          />
        </Toolbar>
        <Divider />
        <List component="nav">
          {allKeys.length > 1 ? (
            <MultiSelectTreeView
              treeContent={tree.rootNode}
              defaultExpandedID={allKeys.slice(0, 4)}
              onSelectNode={handleNodeSelect}
            />
          ) : null}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          // height: "100vh",
          overflow: "auto",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            mb: 4,
            mt: "72px",
            mx: 0,
            height: "calc(100vh - 108px - 24px)",
            maxWidth: "unset !important",
          }}
        >
          <Typography variant="h6">{selectedNode?.name}</Typography>
          <EditorContainer selectedNode={selectedNode} />
        </Container>
      </Box>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "24px",
          opacity: 1,
          background: "#0077CC",
        }}
        elevation={3}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ ml: 2 }} variant="h6">
            Footer
          </Typography>
          <Typography variant="h6" sx={{ mr: 2 }}>
            {getFileType(selectedNode?.name || "")}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default PageLayout;
