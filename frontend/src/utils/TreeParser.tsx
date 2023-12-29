import { FileSystem } from "../models/filesystem";
import { RenderTree } from "../components/TreeView/MultiSelectTreeView";
import sortBy from "lodash/sortBy";

const ROOT_FOLDER_NAME = "TABAPAY";

export const treeParser = (data: FileSystem[]): RenderTree => {
  const rootNode: RenderTree = {
    id: "root",
    name: ROOT_FOLDER_NAME,
    isFolder: true,
    children: [],
  };

  const folderMapper: Record<string, RenderTree> = {};
  folderMapper[rootNode.name] = rootNode;
  const sortedData = sortBy(data, (d: FileSystem) => {
    const count = d.name.split("/");
    return count.length;
  });

  sortedData.forEach((fileObject: FileSystem) => {
    const pathToFolder = fileObject.name.split("/").slice(0, -1);
    pathToFolder.splice(0, 0, ROOT_FOLDER_NAME);
    const pathToFolderJoin: string = pathToFolder.join("/");
    const parentNode = folderMapper[pathToFolderJoin];
    const newNode = { ...fileObject, children: [] };
    if (parentNode) {
      parentNode.children.push(newNode);
      folderMapper[ROOT_FOLDER_NAME + "/" + fileObject.name] = newNode;
    } else {
      folderMapper[fileObject.name] = newNode;
    }
  });
  return rootNode;
};
