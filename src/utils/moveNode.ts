import { TreeNode } from "../types/treeNode";

export const moveNode = (
  node: TreeNode,
  sourceNode: TreeNode,
  destinationNodeId: number
): boolean => {
  if (node.id === destinationNodeId) {
    if (!node.children) node.children = [];
    const order =
      node.children && node.children.length > 0
        ? node.children[node.children.length - 1].order || 0
        : 0;
    sourceNode.order = order + 1;
    node.children.push(sourceNode);
    return true;
  }

  if (node.children) {
    for (let index = 0; index < node.children.length; index++) {
      const isMoved = moveNode(node.children[index], sourceNode, destinationNodeId);
      if (isMoved) return true;
    }
  }

  return false;
};
