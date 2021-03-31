import { createStyles, makeStyles, SvgIconProps, Theme, Typography } from "@material-ui/core";
import { TreeItem, TreeItemProps } from "@material-ui/lab";
import React from "react";
import { TreeNode } from "./types/treeNode";

type StyledTreeItemProps = TreeItemProps & {
  labelIcon?: React.ElementType<SvgIconProps>;
  labelIconUrl?: string;
  labelInfo?: string;
  labelText: string;
  isExpanded: boolean;
  depth: number;
  node: TreeNode;
  validateDragOver: (isBeforeDestinationNode: boolean) => boolean;
  onNodeReOrder?: (ev: React.DragEvent<HTMLDivElement>, isBeforeDestinationNode: boolean) => void;
};

const StyledTreeItem: React.FC<StyledTreeItemProps> = (props: StyledTreeItemProps) => {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon: LabelIcon, labelInfo, labelIconUrl, ...other } = props;

  const handleDragOver = (
    ev: React.DragEvent<HTMLDivElement>,
    isBeforeDestinationNode: boolean
  ) => {
    ev.stopPropagation();

    if (!props.validateDragOver(isBeforeDestinationNode)) return;

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

  const iconContainerStyle =
    props.node.children && props.node.children.length > 0
      ? classes.iconContainer
      : classes.hiddenIconContainer;

  const labelStyle = !(labelIconUrl || LabelIcon) ? classes.label : classes.labelWithIcon;

  const renderLabel = () => {
    let labelRootStyle =
      props.node.children && props.node.children.length > 0
        ? classes.labelRootParent
        : classes.labelRootChild;
    labelRootStyle += ` ${props.node.disabled ? classes.disabled : ""}`;

    return (
      <>
        {props.depth !== 0 && (
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
        )}
        <div className={labelRootStyle} draggable={false}>
          {(labelIconUrl || LabelIcon) && (
            <div className={classes.labelIcon}>
              {LabelIcon ? <LabelIcon color="inherit" /> : <img src={labelIconUrl} alt="image" />}
            </div>
          )}
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          {labelInfo && (
            <Typography variant="caption" color="inherit">
              {labelInfo}
            </Typography>
          )}
        </div>
        {!props.isExpanded && (
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
        )}
      </>
    );
  };

  return (
    <TreeItem
      label={renderLabel()}
      key={`${props.nodeId}_treeItem`}
      classes={{
        root: classes.root,
        content: classes.content,
        label: labelStyle,
        iconContainer: iconContainerStyle,
        group: classes.group,
        expanded: classes.expanded,
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
        color: "var(--tree-view-color)",
      },
      "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
        backgroundColor: "transparent",
      },
      "&:last-child": {
        borderBottom: "0px solid rgb(0, 94, 184)",
      },
      borderBottom: "1px solid rgb(0, 94, 184)",
      marginBottom: "10px",
    },
    disabled: {
      opacity: "0.5",
    },
    group: {
      marginLeft: "23px",
    },
    // eslint-disable-next-line prettier/prettier
    expanded: {
    },
    content: {
      color: theme.palette.text.secondary,
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      "$expanded > &": {
        fontWeight: theme.typography.fontWeightRegular,
        borderBottom: "2px solid rgb(0, 94, 184)",
        paddingBottom: "10px",
      },
      alignItems: "baseline",
      marginBottom: "10px",
    },
    label: {
      fontWeight: "inherit",
      color: "inherit",
      paddingLeft: "0px !important",
      bottom: "3px",
    },
    labelWithIcon: {
      fontWeight: "inherit",
      color: "inherit",
      paddingLeft: "0px !important",
      top: "1px",
    },
    labelRootParent: {
      display: "flex",
      alignItems: "center",
      padding: "0 0 4px 0",
      marginLeft: "3px",
    },
    labelRootChild: {
      display: "flex",
      alignItems: "center",
      padding: "0 0 4px 0",
    },
    labelIcon: {
      marginRight: "5px",
    },
    labelText: {
      fontWeight: "inherit",
      flexGrow: 1,
    },
    iconContainer: {
      width: "15px",
      marginLeft: "1px",
    },
    hiddenIconContainer: {
      display: "none",
    },
  })
);
