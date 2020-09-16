/*
* @Author: Just be free
* @Date:   2020-09-15 16:35:36
* @Last Modified by:   Just be free
* @Last Modified time: 2020-09-16 10:58:29
* @E-mail: justbefree@126.com
*/
const path = require("path");
const fs = require("fs");
const chalk = require('chalk');
const log = console.log;
module.exports = {
  genComponentLibs: (pathName, exculde = []) => {
    const components = {};
    const files = fs.readdirSync(pathName);
    Array.apply(null, files).map((file, key) => {
      const stat = fs.statSync(path.join(pathName, file));
      // in windows operating system file starts with "/"
      const fileName = file.replace("/", "");
      if (stat.isDirectory() && exculde.indexOf(fileName) < 0) {
        components[fileName] = {
          input: path.resolve(__dirname, "..", path.join(pathName, file, "index.js")),
          output: fileName
        };
      }
    });
    return components;
  },
  chalk: (str) => {
    log(chalk.green(str));
  }
};