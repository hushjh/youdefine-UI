/*
* @Author: Just be free
* @Date:   2020-09-15 17:43:13
* @Last Modified by:   Just be free
* @Last Modified time: 2020-09-16 15:02:26
* @E-mail: justbefree@126.com
*/
const rollup = require("rollup");
const path = require("path");
const fs = require("fs");
const commonjs = require("@rollup/plugin-commonjs");
const vue = require("rollup-plugin-vue");
const replace = require("@rollup/plugin-replace");
const json = require("@rollup/plugin-json");
const { babel } = require("@rollup/plugin-babel");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const pkg = require("../../package.json");
// console.log("babel = ", babel);
const utils = require("../utils");
const createPlugins = () => {
  const exclude = "node_modules/**";
  return [
    commonjs(),
    json(),
    nodeResolve(),
    vue({
      css: false
    }),
    replace({}),
    babel({ babelHelpers: "runtime", exclude })
  ];
};
const build = (pkgs) => {
  let index = 0;
  const total = pkgs.length;
  const next = async () => {
    // console.log("index = ", index);
    utils.chalk(`Processing ${index} of ${total}`);
    await buildEntry(pkgs[index]);
    index++;
    index < total ? next() : utils.chalk("success");
  };
  next();
};
const buildEntry = async (config) => {
  const { output, input, moduleName } = config;
  // console.log("__dirname", path.resolve(__dirname, "../../src"));
  // Type of output (amd, cjs, es, iife, umd, system)
  const inputOptions = {
    external: [...Object.keys(pkg.dependencies)],
    input,
    plugins: createPlugins()
  };
  const outputOptions = {
    file: "index.js",
    // output,
    // dir: "lib/es",
    sourcemap: true,
    name: moduleName,
    format: "es",
    globals: {
      vue: "Vue"
    }
  };
  const bundle = await rollup.rollup(inputOptions);
  const { output: outputData } = await bundle.generate(outputOptions);
  // console.log("what bundle", outputData);
  // await bundle.write(outputOptions);
  await write({ output: outputData, fileName: output, format: "es", fullName: output });
};
const write = async ({ output, file, fileName, format, fullName }) => {
  for (const chunkOrAsset of output) {
    // console.log(chunkOrAsset.type);
    if (chunkOrAsset.type === 'asset') {
    } else {
      // console.log(chunkOrAsset.code);
      // console.log(fileName, path.posix.join("lib", `/es/${fileName}/index.js`));
      const pathName = path.posix.join("lib", `/es/${fileName}/index.js`);
      const esPath = path.posix.join("lib", "/es");
      const componentPath = path.posix.join("lib", `/es/${fileName}`);
      if (!fs.existsSync(esPath)) {
        fs.mkdirSync(esPath);
      }
      if (!fs.existsSync(componentPath)) {
        fs.mkdirSync(componentPath);
      }
      fs.writeFileSync(pathName, chunkOrAsset.code);
    }
  }
};

module.exports = {
  build
};
