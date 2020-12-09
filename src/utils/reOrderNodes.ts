import { DraggedTreeNode } from "../types/draggedTreeNode";
import { TreeNode } from "../types/treeNode";

export const reOrderNodes = (
  node: TreeNode,
  draggedTreeNode: DraggedTreeNode,
  destinationNodeId: number,
  parentNodeIdOfDestinationNode: number,
  addBeforeDestinationNode: boolean
): boolean => {
  if (node.id === parentNodeIdOfDestinationNode && node.children && node.children.length > 0) {
    if (draggedTreeNode.parentNode?.id !== parentNodeIdOfDestinationNode) {
      if (!node.children.some((x) => x.id === draggedTreeNode.node.id)) {
        node.children.push(draggedTreeNode.node);
      }
    }

    node.children.sort((a, b) => (a.order || 0) - (b.order || 0));
    const draggedNode = node.children.find((x) => x.id === draggedTreeNode.node.id);
    if (!draggedNode) return true;

    for (let index = 0; index < node.children.length; index++) {
      if (node.children[index].id === destinationNodeId) {
        draggedNode.order = node.children[index].order || 0;

        if (!addBeforeDestinationNode) draggedNode.order++;

        for (
          let subIndex = addBeforeDestinationNode ? index : index + 1;
          subIndex < node.children.length;
          subIndex++
        ) {
          if (node.children[subIndex].id !== draggedNode.id)
            node.children[subIndex].order = (node.children[subIndex].order || 0) + 1;
        }

        return true;
      }
    }
  }

  if (node.children) {
    for (let index = 0; index < node.children.length; index++) {
      const isOrdered = reOrderNodes(
        node.children[index],
        draggedTreeNode,
        destinationNodeId,
        parentNodeIdOfDestinationNode,
        addBeforeDestinationNode
      );
      if (isOrdered) return true;
    }
  }

  return false;
};
