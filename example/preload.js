"use strict";

const electron = require("electron");
window.ipcRenderer = electron.ipcRenderer;

console.log("Preloaded");
