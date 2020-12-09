import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";
import cleaner from "rollup-plugin-cleaner";

const input = "src/index.ts";
const plugins = [
  cleaner({
    targets: ["./dist/"],
  }),
  babel({
    exclude: "node_modules/**",
  }),
  typescript({
    typescript: require("typescript"),
    objectHashIgnoreUnknownHack: true,
  }),
];

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export default [
  {
    input,
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourceMap: true,
      },
      {
        file: pkg.module,
        format: "es",
        sourceMap: true,
      },
    ],
    plugins,
    external,
  },
];
