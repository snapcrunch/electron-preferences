'use strict'

const electron = require('electron');
const { app } = electron;
const { nativeTheme } = electron;
const { BrowserWindow } = electron;
const path = require('path');
const url = require('url');
const preferences = require('./preferences');

nativeTheme.themeSource = preferences.preferences?.theme?.theme ?? 'system';

preferences.on('save', preferences => {

	console.log('Preferences were saved.', JSON.stringify(preferences, null, 4));

	nativeTheme.themeSource = preferences?.theme?.theme ?? 'system';

});

	nativeTheme.themeSource = preferences?.theme?.theme ?? 'system'

} )

let mainWindow

function createWindow() {

	mainWindow = new BrowserWindow({
		width: 1200,
		height: 700,
		'accept-first-mouse': true,
		webPreferences: {
			preload: path.join(__dirname, './Preload.js'),
			contextIsolation: true,
		},
	});

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true,
	}));

	// MainWindow.webContents.openDevTools();

	mainWindow.on('closed', () => {

		mainWindow = null;

	});

}

app.on( 'ready', createWindow )

app.on( 'window-all-closed', () => {

	if ( process.platform !== 'darwin' ) {

		app.quit()

	}

} )

app.on( 'activate', () => {

	if ( mainWindow === null ) {

		createWindow()

app.on('window-all-closed', () => {

	if (process.platform !== 'darwin') {

		app.quit();

	}

});

app.on('activate', () => {

	if (mainWindow === null) {

		createWindow();

	}

});
