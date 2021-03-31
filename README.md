# MUI-Draggable-TreeView - Treeview for Material-UI
MUI-Draggable-TreeView is a React Treeview component built on Material-UI TreeView Component with "drag & drop" and ordering functionalities.

# Table of contents
* [Install](#install)
* [Demo](#demo)
* [Usage](#usage)
* [API](#api)
* [License](#license)

## Install

`npm install mui-draggable-treeview --save`

#### Prerequisites

You need to install `@material-ui/core`, `@material-ui/lab` and `@material-ui/icons`

## Demo
[![Edit react-to-print](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mui-draggable-treeview-uqm76)

Browse live demo

## Usage

```js
import { MuiDraggableTreeView, TreeNode } from "mui-draggable-treeview";

export default function TreeViewExample() {
  
  const data: TreeNode = {
    id: "1",
    name: "Cars",
    children: [
      {
        id: "2",
        name: "Sport Cars",
        children: [
          {
            id: "24",
            name: "Porsche"
          },
          {
            id: "25",
            name: "Ferrari"
          },
          {
            id: "26",
            name: "McLaren"
          }
        ]
      },
      {
        id: "3",
        name: "Classic Cars",
        children: [
          {
            id: "34",
            name: "1957 Corvette"
          },
          {
            id: "35",
            name: "Volkswagen Beetle"
          },
          {
            id: "36",
            name: "Bentley"
          }
        ]
      }
    ]
  };

  return <MuiDraggableTreeView tree={data} enableDragAndDrop={true} />;
}
```
## API

#### Props
|Name|Type|Default|Description
|:--:|:--|:---|:-----|
|**`tree`**|TreeNode||Treeview Data (You will find more details at below)
|**`enableDragAndDrop`**|boolean|false|Enable/Disable "drag & drop" and ordering functionalities

#### Event Handlers
|Name|Type|Parameters|ReturnType|Description
|:--:|:---|:----|:--|:-----|
|**`onNodeDragOver?`**|function|(sourceNode: TreeNode, destinationNode: TreeNode)|boolean|Gives control to allow drag over for a destination node. To allow drag over, return true
|**`onNodeDrop?`**|function|(tree: TreeNode)|void|Event handler after drop on a Node that passes updated tree data
|**`onNodeReOrderOver?`**|function|(sourceNode: TreeNode, destinationNode: TreeNode, isBeforeDestinationNode: boolean)|boolean|Gives control to allow reorder before or after destination node with isBeforeDestinationNode parameter. To allow reordering, return true
|**`onNodeReOrder?`**|function|(tree: TreeNode)|void|Event handler after reordering before or after destination Node that passes updated tree data

#### TreeNode
|Name|Type|Default|Description
|:--:|:--|:-----|:-----|
|**`id`**|number||Unique number
|**`name`**|string||Label of TreeNode item
|**`order?`**|number|undefined|Order of TreeNode item
|**`data?`**|any|undefined|TreeNode data when it is need
|**`icon?`**|React.ElementType<SvgIconProps>|undefined|Icon of TreeNode item
|**`children?`**|TreeNode[]|undefined|Children of TreeNode

## License
The files included in this repository are licensed under the MIT license.
