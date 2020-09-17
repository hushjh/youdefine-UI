/*
* @Author: Just be free
* @Date:   2020-09-15 17:43:13
* @Last Modified by:   Just be free
* @Last Modified time: 2020-09-17 14:29:39
* @E-mail: justbefree@126.com
*/
const rollup = require("rollup");
const path = require("path");
const fs = require("fs");
const commonjs = require("@rollup/plugin-commonjs");
const vue = require("rollup-plugin-vue");
const replace = require("@rollup/plugin-replace");
const json = require("@rollup/plugin-json");
const { babel, getBabelOutputPlugin } = require("@rollup/plugin-babel");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const pkg = require("../../package.json");
const dotenv = require('dotenv');
const envConfit = dotenv.config({ path: "./.env.production" });
const componentPrefix = envConfit.parsed.VUE_APP_PREFIX;
const env = process.env.NODE_ENV;
const components = [];
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
    replace({ "process.env.NODE_ENV": JSON.stringify(env) }),
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
    index < total ? next() : done();
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
    // dir: "lib/es",
    sourcemap: false,
    name: moduleName,
    format: "esm",
    plugins: [
      getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
        plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]]
      })
    ],
    globals: {
      vue: "Vue"
    }
  };
  const bundle = await rollup.rollup(inputOptions);
  const { output: outputData } = await bundle.generate(outputOptions);
  // console.log("what bundle", outputData);
  // await bundle.write(outputOptions);
  await write({ output: outputData, fileName: output, format: "esm", fullName: output });
};
const write = async ({ output, file, fileName, format, fullName }) => {
  for (const chunkOrAsset of output) {
    // console.log(chunkOrAsset.type);
    if (chunkOrAsset.type === 'asset') {
    } else {
      // console.log(chunkOrAsset.code);
      // console.log(fileName, path.posix.join("lib", `/es/${fileName}/index.js`));
      // const indexPath = path.posix.join("lib")
      const esPath = path.posix.join("es");
      const indexPath = path.posix.join("es", "/index.js");
      const pathName = path.posix.join("es", `/${componentPrefix}-${fileName}/index.js`);
      const componentPath = path.posix.join("es", `/${componentPrefix}-${fileName}`);
      if (!fs.existsSync(esPath)) {
        fs.mkdirSync(esPath);
      }
      if (!fs.existsSync(indexPath)) {
        fs.writeFileSync(indexPath, "");
      }
      if (!fs.existsSync(componentPath)) {
        fs.mkdirSync(componentPath);
      }
      fs.writeFileSync(pathName, chunkOrAsset.code);
      // fs.writeFileSync(indexPath, `export { ${fileName} }`);
      const folderName = `${componentPrefix}-${fileName}`;
      const componentName = utils.camelize(folderName, true);
      const exportCode = `import ${componentName} from "./${folderName}";\n`;
      components.push(componentName);
      fs.appendFileSync(indexPath, exportCode);
    }
  }
};
const done = () => {
  utils.chalk("success");
  const indexPath = path.posix.join("es", "/index.js");
  const exportCode = `export { install, ${components.join(", ")} };\n`;
  renderInstall(indexPath);
  fs.appendFileSync(indexPath, exportCode);
};

const renderInstall = (indexPath) => {
  const str = `\n
function install(Vue) {
  const components = [${components}];
  components.forEach(function (item) {
    if (item.install) {
      Vue.use(item);
    } else if (item.name) {
      Vue.component(item.name, item);
    }
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}\n
export default { install };\n`;
  fs.appendFileSync(indexPath, str);
};

module.exports = {
  build
};
