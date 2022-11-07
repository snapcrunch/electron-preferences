'use strict';

const electron = require('electron');

const { contextBridge } = electron;
const { ipcRenderer } = electron;

let onPreferencesChangedHandler = () => {};

contextBridge.exposeInMainWorld('api', {
	showPreferences: (section) => ipcRenderer.send('showPreferences', section),
	closePreferences: () => ipcRenderer.send('closePreferences'),
	getPreferences: () => ipcRenderer.sendSync('getPreferences'),
	onPreferencesChanged(handler) {

		onPreferencesChangedHandler = handler;

	}, 
	getDefaults: () => ipcRenderer.sendSync('getDefaults'),
	resetToDefaults: () => ipcRenderer.send('resetToDefaults'),
  decrypt: encryptedSecret => ipcRenderer.sendSync('decrypt', encryptedSecret),
});

ipcRenderer.on('preferencesUpdated', (e, preferences) => {

	onPreferencesChangedHandler(preferences);

});

console.log('Preloaded');
