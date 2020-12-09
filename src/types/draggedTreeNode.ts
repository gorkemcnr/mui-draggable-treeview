import { TreeNode } from "./treeNode";

export interface DraggedTreeNode {
  parentNode: TreeNode | null;
  node: TreeNode;
  depth: number;
}
