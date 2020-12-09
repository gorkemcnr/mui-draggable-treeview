// for style loader
declare module "*.css" {
  const styles: any;
  export = styles;
}

declare module "*.svg" {
  const url: string;
  export default url;
}

declare module "*.png" {
  const value: any;
  export default value;
}

declare module "csstype" {
  interface Properties {
    "--tree-view-color"?: string;
    "--tree-view-bg-color"?: string;
  }
}
