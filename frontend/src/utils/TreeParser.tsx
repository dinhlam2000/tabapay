import { FileSystem } from "../models/filesystem";
import { RenderTree } from "../components/TreeView/MultiSelectTreeView";
import sortBy from "lodash/sortBy";

const ROOT_FOLDER_NAME = "TABAPAY";

export const treeParser = (
  data: FileSystem[]
): { rootNode: RenderTree; folderMapperId: Record<string, RenderTree> } => {
  const rootNode: RenderTree = {
    id: "root",
    name: ROOT_FOLDER_NAME,
    isFolder: true,
    children: [],
  };

  const folderMapperName: Record<string, RenderTree> = {}; // this one is for tree creation, using name as a hash key
  const folderMapperId: Record<string, RenderTree> = {}; // this one is using the id as a hash key for global usage of node selection
  folderMapperName[rootNode.name] = rootNode;
  const sortedData = sortBy(data, (d: FileSystem) => {
    const count = d.name.split("/");
    return count.length;
  });

  sortedData.forEach((fileObject: FileSystem) => {
    const pathToFolder = fileObject.name.split("/").slice(0, -1);
    pathToFolder.splice(0, 0, ROOT_FOLDER_NAME);
    const pathToFolderJoin: string = pathToFolder.join("/");
    const parentNode = folderMapperName[pathToFolderJoin];
    const newNode = { ...fileObject, children: [] };
    folderMapperId[fileObject.id] = newNode;
    if (parentNode) {
      parentNode.children.push(newNode);
      folderMapperName[ROOT_FOLDER_NAME + "/" + fileObject.name] = newNode;
    } else {
      folderMapperName[fileObject.name] = newNode;
    }
  });
  return { rootNode, folderMapperId };
};
