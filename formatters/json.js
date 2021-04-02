"use strict";

var fileSystem = require("fs");
var filePath = require("path");
var messages = require('./consts.js');

function formatJsonToTable(file) {
  var json = parseJsonFromFile(file);
  console.table(json);
}

function formatJsonFromFile(file) {
  var json = parseJsonFromFile(file);
  var formattedJson = formatJson(json);
  return formattedJson;
}

function formatJson(json) {
  return JSON.stringify(json, null, 2);
}

function parseJsonFromFile(file) {
  try {
    var jsonStringContent = readJsonFromFile(file);
    var parsedJson = JSON.parse(jsonStringContent);
    return parsedJson;
  } catch (error) {
    if (errorCameFromSyntax(error)) {
      console.error(messages.json.syntaxError, json);
    } else {
      console.error(messages.json.unexpectedError);   
      console.error(messages.lineSeparator)
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
    console.error(messages.fileSystem.readFileError);
    console.error(messages.lineSeparator);
    console.error(error.message);
  }
}

function normalizeFilePath(file) {
  var currentWorkingPath = filePath.resolve(process.cwd(), "file");
  return currentWorkingPath;
}

function parseJson(string) {
  return JSON.parse(string)
}

function errorCameFromSyntax(error) {
  return error instanceof SyntaxError;
}

module.exports = {
  formatJsonFromFile,
  formatJsonToTable,
  formatJson,
}

