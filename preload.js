"use strict";

const electron = require("electron");
const contextBridge = electron.contextBridge;
const ipcRenderer = electron.ipcRenderer;

contextBridge.exposeInMainWorld("api", {
    getPreferenceOptions: () => {
        return ipcRenderer.sendSync("getPreferenceOptions");
    },
    getPreferences: () => {
        return ipcRenderer.sendSync("getPreferences");
    },
    getDefaults: () => {
        return ipcRenderer.sendSync("getDefaults");
    },
    setPreferences: (preferences) => {
        return ipcRenderer.send("setPreferences", preferences);
    },
    showOpenDialog: (dialogOptions) => {
        return ipcRenderer.sendSync("showOpenDialog", dialogOptions);
    }
});