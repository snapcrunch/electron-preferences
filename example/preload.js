"use strict";

const electron = require("electron");
const contextBridge = electron.contextBridge;
const ipcRenderer = electron.ipcRenderer;

let onPreferencesChangedHandler = (preferences) => {};

contextBridge.exposeInMainWorld("api", {
    showPreferences: () => {
        ipcRenderer.send('showPreferences');
    },
    getPreferences: () => {
        return ipcRenderer.sendSync('getPreferences');
    },
    onPreferencesChanged: (handler) => {
        onPreferencesChangedHandler = handler;
    }
});

ipcRenderer.on('preferencesUpdated', (e, preferences) => {
    onPreferencesChangedHandler(preferences);
});


console.log("Preloaded");
