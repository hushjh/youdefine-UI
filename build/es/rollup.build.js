/*
* @Author: Just be free
* @Date:   2020-09-15 16:11:04
* @Last Modified by:   Just be free
* @Last Modified time: 2020-09-15 18:44:24
* @E-mail: justbefree@126.com
*/
const path = require("path");
const utils = require("../utils");
const { build } = require("./build");
const exculde = ["mixins", "theme", "modules"];
const pkg = [];
const components = utils.genComponentLibs(path.join("src"), exculde);
Object.keys(components).forEach(moduleName => {
  const { input, output } = components[moduleName];
  pkg.push({ moduleName, input, output });
});
build(pkg);
