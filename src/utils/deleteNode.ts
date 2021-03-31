import { TreeNode } from "../types/treeNode";

export const deleteNode = (node: TreeNode, sourceNodeId: string, parentNodeId: string): boolean => {
  if (node.id === parentNodeId) {
    node.children = node.children?.filter((x) => x.id !== sourceNodeId);
    return true;
  }

  if (node.children) {
    for (let index = 0; index < node.children.length; index++) {
      const isDeleted = deleteNode(node.children[index], sourceNodeId, parentNodeId);
      if (isDeleted) return true;
    }
  }

  return false;
};
