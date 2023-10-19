const exclude  = require('rollup-plugin-exclude-dependencies-from-bundle');
const alias    = require('@rollup/plugin-alias').default;
const resolve  = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs').default;
const cleanup  = require('rollup-plugin-cleanup');
const dts      = require('rollup-plugin-dts').default;


const E       = process.env;
const entries = !/web/i.test(E.TYPE)? [] : [
  {find: './_http',      replacement: './_http.web'},
  {find: './_websocket', replacement: './_websocket.web'},
];
const skip = ["ws"];


module.exports = [{
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
  plugins: [exclude(), alias({entries}), resolve(), commonjs(), cleanup({comments: "none"})]
}, {
  input: ".build/index.js",
  output: {
    file: "index.mjs",
    format: "es",
    exports: "auto"
  },
  plugins: [exclude(), alias({entries}), resolve(), commonjs(), cleanup({comments: "none"})]
}];
