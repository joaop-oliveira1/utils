/* eslint-disable no-undef */
var prettier = require("prettier");
var fs = require("fs");
var path = require("path");

function promisifyReadFile(filePath) {
  console.log(filePath);
  return new Promise(function asyncReadFile(resolve, reject) {
    fs.readFile(filePath, function retrieveFileContent(error, data) {
      if (error) {
        reject(error);
      } else {
        var content = data.toString();
        resolve(content);
      }
    });
  });
}

async function resolvePrettierConfig() {
  var configPath = path.resolve(__dirname, "../.prettierrc");
  var prettierConfigFile = await promisifyReadFile(configPath);
  var prettierConfig = await prettier.resolveConfig(prettierConfigFile);
  return prettierConfig;
}

async function readYamlFromFile(filePath) {
  var normalizedPath = path.resolve(process.cwd(), filePath);
  var fileContent = await promisifyReadFile(normalizedPath);
  return fileContent.toString();
}

async function formatYaml(filePath) {
  var prettierConfig = await resolvePrettierConfig();
  var yamlContent = await readYamlFromFile(filePath);
  var formattedYaml = prettier.format(yamlContent, {
    ...prettierConfig,
    parser: "yaml"
  });
  return formattedYaml;
}

module.exports = { formatYaml };
