import React, { useState } from "react";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import {
  default as MuiTreeView,
  MultiSelectTreeViewProps as MuiMultiSelectTreeViewProps,
  SingleSelectTreeViewProps as MuiSingleSelectTreeViewProps,
} from "@material-ui/lab/TreeView";
import { createStyles, makeStyles, withTheme } from "@material-ui/core/styles";
import StyledTreeItem from "./StyledTreeItem";
import { TreeNode } from "./types/treeNode";
import { DraggedTreeNode } from "./types/draggedTreeNode";
import { DraggedNode } from "./constants";
import { moveNode } from "./utils/moveNode";
import { reOrderNodes } from "./utils/reOrderNodes";
import { deleteNode } from "./utils/deleteNode";

export interface MuiDraggableTreeViewBaseProps {
  enableDragAndDrop?: boolean;
  tree: TreeNode;
  onNodeDragOver?: (sourceNode: TreeNode, destinationNode: TreeNode) => boolean;
  onNodeDrop?: (tree: TreeNode) => void;
  onNodeReOrder?: (tree: TreeNode) => void;
  onNodeReOrderOver?: (
    sourceNode: TreeNode,
    destinationNode: TreeNode,
    isBeforeDestinationNode: boolean
  ) => boolean;
}

export interface SingleSelectTreeViewProps
  extends MuiSingleSelectTreeViewProps,
    MuiDraggableTreeViewBaseProps {}

export interface MultiSelectTreeViewProps
  extends MuiMultiSelectTreeViewProps,
    MuiDraggableTreeViewBaseProps {}

const MuiDraggableTreeView: React.FC<SingleSelectTreeViewProps | MultiSelectTreeViewProps> = (
  props: SingleSelectTreeViewProps | MultiSelectTreeViewProps
) => {
  const [tree, setTree] = useState<TreeNode>(props.tree);
  const classes = useStyles();

  const handleDragOver = (
    ev: React.DragEvent<HTMLLIElement>,
    destinationNode: TreeNode,
    depth: number
  ) => {
    ev.stopPropagation();

    let allowToDrag = true;
    const draggedTreeNode = JSON.parse(ev.dataTransfer.getData(DraggedNode)) as DraggedTreeNode;

    if (
      draggedTreeNode.parentNode?.id === destinationNode.id ||
      draggedTreeNode.node.id === destinationNode.id ||
      (draggedTreeNode.node.children &&
        draggedTreeNode.node.children.length > 0 &&
        draggedTreeNode.depth < depth)
    )
      return;

    if (props.onNodeDragOver) {
      allowToDrag = props.onNodeDragOver(draggedTreeNode.node, destinationNode);
    }

    if (allowToDrag) {
      ev.preventDefault();
    }
  };

  const handleDrop = (ev: React.DragEvent<HTMLLIElement>, destinationNode: TreeNode) => {
    ev.preventDefault();
    ev.stopPropagation();

    const draggedTreeNode = JSON.parse(ev.dataTransfer.getData(DraggedNode)) as DraggedTreeNode;
    if (!draggedTreeNode.parentNode) return;

    moveNode(tree, draggedTreeNode.node, destinationNode.id);
    deleteNode(tree, draggedTreeNode.node.id, draggedTreeNode.parentNode.id);

    const newTree = { ...tree };
    setTree(newTree);

    if (props.onNodeDrop) props.onNodeDrop(newTree);
  };

  const handleDragStart = (
    ev: React.DragEvent<HTMLLIElement>,
    parentNode: TreeNode | null,
    node: TreeNode,
    depth: number
  ) => {
    ev.stopPropagation();
    ev.dataTransfer.setData(
      DraggedNode,
      JSON.stringify({ parentNode, node, depth } as DraggedTreeNode)
    );
  };

  const handleNodeReOrder = (
    ev: React.DragEvent<HTMLDivElement>,
    destinationNodeId: number,
    parentNodeIdOfDestinationNode: number,
    addBeforeDestinationNode: boolean
  ) => {
    ev.preventDefault();
    ev.stopPropagation();
    const draggedTreeNode = JSON.parse(ev.dataTransfer.getData(DraggedNode)) as DraggedTreeNode;

    reOrderNodes(
      tree,
      draggedTreeNode,
      destinationNodeId,
      parentNodeIdOfDestinationNode,
      addBeforeDestinationNode
    );

    if (
      draggedTreeNode.parentNode &&
      draggedTreeNode.parentNode.id !== parentNodeIdOfDestinationNode
    ) {
      deleteNode(tree, draggedTreeNode.node.id, draggedTreeNode.parentNode.id);
    }

    const newTree = { ...tree };
    setTree(newTree);

    if (props.onNodeReOrder) props.onNodeReOrder(newTree);
  };

  const renderTree = (parentNode: TreeNode | null, node: TreeNode, depth: number) => (
    <StyledTreeItem
      key={node.id}
      depth={depth}
      nodeId={node.id.toString()}
      labelIcon={node.icon}
      node={node}
      draggable={parentNode !== null && props.enableDragAndDrop}
      onNodeReOrderOver={props.onNodeReOrderOver}
      onNodeReOrder={(ev: React.DragEvent<HTMLDivElement>, isBeforeDestinationNode: boolean) =>
        parentNode && handleNodeReOrder(ev, node.id, parentNode.id, isBeforeDestinationNode)
      }
      onDrop={(ev: React.DragEvent<HTMLLIElement>) => handleDrop(ev, node)}
      onDragStart={(ev: React.DragEvent<HTMLLIElement>) =>
        parentNode && handleDragStart(ev, parentNode, node, depth)
      }
      onDragOver={(ev: React.DragEvent<HTMLLIElement>) => handleDragOver(ev, node, depth)}
      labelText={node.name}
    >
      {node.children
        ? node.children
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((childNode) => renderTree(node, childNode, depth + 1))
        : null}
    </StyledTreeItem>
  );

  return (
    <MuiTreeView
      {...props}
      defaultExpanded={[tree.id.toString()]}
      className={classes.root}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      {renderTree(null, tree, 0)}
    </MuiTreeView>
  );
};

export default withTheme(MuiDraggableTreeView);

const useStyles = makeStyles(
  createStyles({
    root: {
      height: 264,
      flexGrow: 1,
      maxWidth: 400,
    },
  })
);
