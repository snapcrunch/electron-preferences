'use strict';

const electron = require('electron');

const { contextBridge } = electron;
const { ipcRenderer } = electron;

contextBridge.exposeInMainWorld('api', {
	getSections: () => ipcRenderer.sendSync('getSections'),
	getPreferences: () => ipcRenderer.sendSync('getPreferences'),
	getDefaults: () => ipcRenderer.sendSync('getDefaults'),
	setPreferences: preferences => ipcRenderer.send('setPreferences', preferences),
	showOpenDialog: dialogOptions => ipcRenderer.sendSync('showOpenDialog', dialogOptions),
	sendButtonClick: channel => ipcRenderer.sendSync('sendButtonClick', channel),
});
