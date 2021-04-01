#! /usr/bin/node
"use strict";

var fileSystem = require("fs");
var filePath = require("path");
var parseArgs = require("minimist");

var argv = parseArgs(process.argv.slice(2));

function main() {
  try {
    if ("table" in argv) {
      var result = formatJsonToTable(argv.file);
    } else {
      var result = formatJsonFromFile(argv.file);
    }
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

function formatJsonToTable(file) {
  var json = parseJsonFromFile(file);
  console.table(json);
}

function formatJsonFromFile(file) {
  var json = parseJsonFromFile(file);
  var formattedJson = JSON.stringify(json, null, 2);
  return formattedJson;
}

function formatJson(json) {
  var parsedJson = parseJson(json);
  return JSON.stringify(parsedJson, null, 2);
}

function parseJsonFromFile(file) {
  try {
    var jsonStringContent = readJsonFromFile(file);
    var parsedJson = JSON.parse(jsonStringContent);
    return parsedJson;
  } catch (error) {
    if (errorCameFromSyntax(error)) {
      console.error(
        "Erro ao fazer um parse do json usado como argumento ",
        json
      );
    } else {
      console.error(
        "Error no arquivo json.js ao fazer o parse de um json na funcao formatJson"
      );
      console.error("*****************************");
      console.error(error);
    }
  }
}

function readJsonFromFile(file) {
  try {
    var normalizedPath = normalizeFilePath(file);
    var conteudoBuffer = fileSystem.readFileSync(file);
    var conteudoString = conteudoBuffer.toString();
    return conteudoString;
  } catch (error) {
    console.error(
      "Something went wrong while reading the file in function readJsonFromFile, problably file argument is missing"
    );
    console.error(
      "***********************************************************"
    );
    console.error(error.message);
  }
}

function normalizeFilePath(file) {
  var currentWorkingPath = filePath.resolve(process.cwd(), "file");
  return currentWorkingPath;
}

function errorCameFromSyntax(error) {
  return error instanceof SyntaxError;
}

console.log(main());
