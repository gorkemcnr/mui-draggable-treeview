import { SvgIconProps } from "@material-ui/core";

export interface TreeNode {
  id: number;
  name: string;
  order?: number;
  data?: any;
  icon?: React.ElementType<SvgIconProps>;
  children?: TreeNode[];
}
