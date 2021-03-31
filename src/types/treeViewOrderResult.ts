import { TreeNode } from "./treeNode";

export interface TreeViewOrderResult {
  draggedTreeNodeOrder: number;
  siblingsOfDraggedTreeNode: TreeNode[];
}
