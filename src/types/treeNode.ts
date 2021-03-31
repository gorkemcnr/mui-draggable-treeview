import { SvgIconProps } from "@material-ui/core";

export interface TreeNode {
  id: string;
  name: string;
  order?: number;
  data?: any;
  iconUrl?: string;
  icon?: React.ElementType<SvgIconProps>;
  children?: TreeNode[];
  isRoot?: boolean;
  disabled?: boolean;
}
