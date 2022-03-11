import alias from "@rollup/plugin-alias";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import cleanup from "rollup-plugin-cleanup";
import dts from "rollup-plugin-dts";


const E       = process.env;
const entries = !/web/i.test(E.TYPE)? [] : [
  {find: './_http', replacement: './_http.web'}
];


export default [{
  input: ".build/index.d.ts",
  output: {
    file: "index.d.ts",
    format: "es",
    exports: "auto"
  },
  plugins: [dts()]
}, {
  input: ".build/index.js",
  output: {
    file: "index.js",
    format: "cjs",
    exports: "auto"
  },
  plugins: [alias({entries}), resolve(), commonjs(), cleanup({comments: "none"})]
}, {
  input: ".build/index.js",
  output: {
    file: "index.mjs",
    format: "es",
    exports: "auto"
  },
  plugins: [alias({entries}), resolve(), commonjs(), cleanup({comments: "none"})]
}];
