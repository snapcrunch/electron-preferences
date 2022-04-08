'use strict';

const electron = require('electron');

const { contextBridge } = electron;
const { ipcRenderer } = electron;

contextBridge.exposeInMainWorld('api', {
	getDefaults: () => ipcRenderer.sendSync('getDefaults'),
	getConfig: () => ipcRenderer.sendSync('getConfig'),
	getPreferences: () => ipcRenderer.sendSync('getPreferences'),
	getSections: () => ipcRenderer.sendSync('getSections'),
	setPreferences: preferences => ipcRenderer.send('setPreferences', preferences),
	showOpenDialog: dialogOptions => ipcRenderer.sendSync('showOpenDialog', dialogOptions),
	sendButtonClick: channel => ipcRenderer.sendSync('sendButtonClick', channel),
});
