import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";


const E       = process.env;
const entries = !/web/i.test(E.TYPE)? [] : [
  {find: './_http', replacement: './_http.web'}
];


export default [{
  input: ".build/index.js",
  output: {
    file: "index.js",
    format: "cjs",
    exports: "auto"
  },
  plugins: [alias({entries}), resolve(), commonjs()]
}, {
  input: ".build/index.js",
  output: {
    file: "index.mjs",
    format: "es",
    exports: "auto"
  },
  plugins: [alias({entries}), resolve(), commonjs()]
}];
