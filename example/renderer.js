'use strict';

// const { ipcRenderer } = require('electron');
const ipcRenderer = window.ipcRenderer;
const bt = document.getElementsByClassName('bt')[0];
const prefsEl = document.getElementsByClassName('preferences')[0];
prefsEl.innerHTML = JSON.stringify(ipcRenderer.sendSync('getPreferences'), null, 4);

bt.addEventListener('click', () => {
    ipcRenderer.send('showPreferences');
});

ipcRenderer.on('preferencesUpdated', (e, preferences) => {
    console.log('Preferences were updated', preferences);
    prefsEl.innerHTML = JSON.stringify(preferences, null, 4);
});
