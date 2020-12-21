# MUI-Draggable-TreeView - Treeview for Material-UI
MUI-Draggable-TreeView is a React Treeview component built on Material-UI with "drag & drop" and ordering functionalities to an existing 
Material-UI TreeView component

# Table of contents
* [Install](#install)
* [Demo](#demo)
* [Usage](#usage)
* [License](#licence)


## Install

`npm install mui-draggable-treeview --save`

#### Prerequisites

You need to install `@material-ui/core`, `@material-ui/lab` and `@material-ui/icons`

## Demo
[![Edit react-to-print](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/mui-draggable-treeview-cjc5e)

Browse live demo

## Usage

```js
import { MuiDraggableTreeView, TreeNode } from "mui-draggable-treeview";

export default function TreeViewExample() {
  const data: TreeNode = {
    id: 1,
    name: "Cars",
    children: [
      {
        id: 2,
        name: "Sport Cars",
        children: [
          {
            id: 24,
            name: "Porsche"
          },
          {
            id: 25,
            name: "Ferrari"
          },
          {
            id: 26,
            name: "McLaren"
          }
        ]
      },
      {
        id: 3,
        name: "Classic Cars",
        children: [
          {
            id: 34,
            name: "1957 Corvette"
          },
          {
            id: 35,
            name: "Volkswagen Beetle"
          },
          {
            id: 36,
            name: "Bentley"
          }
        ]
      }
    ]
  };

  return <MuiDraggableTreeView tree={data} enableDragAndDrop={true} />;
}
```

## License
The files included in this repository are licensed under the MIT license.