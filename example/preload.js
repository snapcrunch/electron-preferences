'use strict'

const electron = require( 'electron' )
const { contextBridge } = electron
const { ipcRenderer } = electron

let onPreferencesChangedHandler = () => {}

contextBridge.exposeInMainWorld( 'api', {
	showPreferences: () => {

		ipcRenderer.send( 'showPreferences' )

	},
	getPreferences: () => ipcRenderer.sendSync( 'getPreferences' ),
	onPreferencesChanged: handler => {

		onPreferencesChangedHandler = handler

	},
} )

ipcRenderer.on( 'preferencesUpdated', ( e, preferences ) => {

	onPreferencesChangedHandler( preferences )

} )

console.log( 'Preloaded' )
