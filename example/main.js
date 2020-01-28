'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const preferences = require('./preferences');

preferences.on('save', (preferences) => {
    console.log(`Preferences were saved.`, JSON.stringify(preferences, null, 4));
});

let mainWindow;

function createWindow() {

    mainWindow = new BrowserWindow({
        'width': 1200,
        'height': 700,
        'accept-first-mouse': true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(url.format({
        'pathname': path.join(__dirname, 'index.html'),
        'protocol': 'file:',
        'slashes': true
    }));

    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function() {
        mainWindow = null;
    });

}

app.on('ready', () => {
    createWindow();

    electron.ipcMain.on('applyChangesClick', () => {
        app.relaunch();
        app.quit();
    });

    electron.ipcMain.on('changePreferencesValue', () => {
        preferences.value('space.random_number', Math.round(Math.random() * 100) )
    });
});

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
});
