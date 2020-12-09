import { createStyles, makeStyles, SvgIconProps, Theme, Typography } from "@material-ui/core";
import { TreeItem, TreeItemProps } from "@material-ui/lab";
import React from "react";
import { DraggedNode } from "./constants";
import { DraggedTreeNode } from "./types/draggedTreeNode";
import { TreeNode } from "./types/treeNode";

type StyledTreeItemProps = TreeItemProps & {
  labelIcon?: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
  depth: number;
  node: TreeNode;
  onNodeReOrder?: (ev: React.DragEvent<HTMLDivElement>, isBeforeDestinationNode: boolean) => void;
  onNodeReOrderOver?: (
    sourceNode: TreeNode,
    destinationNode: TreeNode,
    isBeforeDestinationNode: boolean
  ) => boolean;
};

const StyledTreeItem: React.FC<StyledTreeItemProps> = (props: StyledTreeItemProps) => {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, ...other } = props;

  const handleDragOver = (
    ev: React.DragEvent<HTMLDivElement>,
    isBeforeDestinationNode: boolean
  ) => {
    ev.stopPropagation();

    if (!ev.dataTransfer.getData(DraggedNode)) return;

    const draggedTreeNode = JSON.parse(ev.dataTransfer.getData(DraggedNode)) as DraggedTreeNode;

    if (
      draggedTreeNode.node.id.toString() === props.nodeId ||
      (draggedTreeNode.parentNode && draggedTreeNode.parentNode.id.toString() === props.nodeId) ||
      (draggedTreeNode.node.children &&
        draggedTreeNode.node.children.length > 0 &&
        draggedTreeNode.depth < props.depth)
    )
      return;

    if (
      props.onNodeReOrderOver &&
      !props.onNodeReOrderOver(draggedTreeNode.node, props.node, isBeforeDestinationNode)
    )
      return;

    ev.preventDefault();
    ev.currentTarget.style.height = "30px";
    ev.currentTarget.style.borderWidth = "3px";
  };

  const handleDragLeave = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    ev.currentTarget.style.height = "3px";
    ev.currentTarget.style.borderWidth = "0px";
  };

  const handleOrderChange = (
    ev: React.DragEvent<HTMLDivElement>,
    isBeforeDestinationNode: boolean
  ) => {
    ev.stopPropagation();
    ev.preventDefault();

    if (props.onNodeReOrder) props.onNodeReOrder(ev, isBeforeDestinationNode);

    ev.currentTarget.style.height = "3px";
    ev.currentTarget.style.borderWidth = "0px";
  };

  return (
    <TreeItem
      label={
        <>
          <div
            onDrop={(ev) => handleOrderChange(ev, true)}
            onDragOver={(ev) => handleDragOver(ev, true)}
            onDragLeave={handleDragLeave}
            draggable={false}
            style={{
              height: "3px",
              border: "dashed 0px white",
              backgroundColor: "transparent !important",
            }}
          />
          <div className={classes.labelRoot} draggable={false}>
            {LabelIcon && <LabelIcon color="inherit" className={classes.labelIcon} />}
            <Typography variant="body2" className={classes.labelText}>
              {labelText}
            </Typography>
            {labelInfo && (
              <Typography variant="caption" color="inherit">
                {labelInfo}
              </Typography>
            )}
          </div>
          <div
            onDrop={(ev) => handleOrderChange(ev, false)}
            onDragOver={(ev) => handleDragOver(ev, false)}
            onDragLeave={handleDragLeave}
            draggable={false}
            style={{
              height: "3px",
              border: "dashed 0px white",
              backgroundColor: "transparent !important",
            }}
          />
        </>
      }
      classes={{
        root: classes.root,
        content: classes.content,
        label: classes.label,
      }}
      {...other}
    />
  );
};

export default StyledTreeItem;

const useTreeItemStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.text.secondary,
      "&:focus > $content": {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: "var(--tree-view-color)",
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
      },
      "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
        backgroundColor: "transparent",
      },
    },
    content: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      "$expanded > &": {
        fontWeight: theme.typography.fontWeightRegular,
      },
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
    label: {
      fontWeight: "inherit",
      color: "inherit",
      paddingLeft: "0px !important",
      backgroundColor: "transparent !important",
    },
    labelRoot: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0.5, 0),
    },
    labelIcon: {
      marginRight: theme.spacing(1),
    },
    labelText: {
      fontWeight: "inherit",
      flexGrow: 1,
      marginLeft: "5px",
    },
  })
);
