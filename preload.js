'use strict';

const electron = require('electron');

const { contextBridge } = electron;
const { ipcRenderer } = electron;

const deserializeJson = (serializedJavascript) => eval('(' + serializedJavascript + ')'); //deserialize function for 'serialize-javascript' library

contextBridge.exposeInMainWorld('api', {
	getSections: () => deserializeJson(ipcRenderer.sendSync('getSections')),
	getPreferences: () => ipcRenderer.sendSync('getPreferences'),
	getDefaults: () => ipcRenderer.sendSync('getDefaults'),
	getConfig: () => ipcRenderer.sendSync('getConfig'),
	getPreferences: () => ipcRenderer.sendSync('getPreferences'),
	getSections: () => ipcRenderer.sendSync('getSections'),
	setPreferences: preferences => ipcRenderer.send('setPreferences', preferences),
	showOpenDialog: dialogOptions => ipcRenderer.sendSync('showOpenDialog', dialogOptions),
	sendButtonClick: channel => ipcRenderer.send('sendButtonClick', channel),
  encrypt: secret => ipcRenderer.sendSync('encrypt', secret),
});
