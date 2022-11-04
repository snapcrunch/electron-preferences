'use strict';

const electron = require('electron');

const { app, BrowserWindow, ipcMain, webContents, dialog } = electron;
const path = require('path');
const url = require('url');
const fs = require('fs');
const _ = require('lodash');
const { EventEmitter2 } = require('eventemitter2');
const loadJsonFile = require('load-json-file');
const writeJsonFile = require('write-json-file');
const jsonSerializer = require('serialize-javascript'); //also serializes functions etc.

class ElectronPreferences extends EventEmitter2 {

	constructor(options = {}) {

		super();

		_.defaultsDeep(options, {
			sections: [],
			webPreferences: {
				devTools: false,
			},
		});

		for (const [ sectionIdx, section ] of options.sections.entries()) {

			_.defaultsDeep(section, {
				form: {
					groups: [],
				},
			});
			section.form.groups = section.form.groups.map((group, groupIdx) => {

				group.id = 'group' + sectionIdx + groupIdx;

				return group;

			});

		}

		this.options = options;

		if (!this.dataStore) {

			throw new Error('The \'dataStore\' option is required.');

		}

		// Load preferences file if exists
		try {

			if (fs.existsSync(this.dataStore)) {

				this.preferences = loadJsonFile.sync(this.dataStore);

			}

		} catch (error) {

			console.error(`Datastore error - ${error}`);
			this.preferences = null;

		}

		if (this.preferences) {

			// Set default preference values
			for (const prefDefault of _.keys(this.defaults)) {

				// PrefDefault is a group key

				if ((prefDefault in this.preferences)) {

					// Merge preferences with defaults (in case new preference was added, set it's default)
					this.preferences[prefDefault] = { ...this.defaults[prefDefault], ...this.preferences[prefDefault] };

				} else {

					// If group doesn't exist, copy all group defaults
					this.preferences[prefDefault] = this.defaults[prefDefault];

				}

			}

		} else {

			this.preferences = this.defaults;

		}

		if (_.isFunction(options.onLoad)) {

			this.preferences = options.onLoad(this.preferences);

		}

		this.save();

		ipcMain.on('showPreferences', (_, section) => {

			this.show(section);

		});

		ipcMain.on('closePreferences', _ => {

			this.close();

		});

		ipcMain.on('getSections', event => {
			
			event.returnValue = jsonSerializer(this.options.sections);

		});

		ipcMain.on('restoreDefaults', _ => {

			this.preferences = this.defaults;
			this.save();
			this.broadcast();

		});

		ipcMain.on('getDefaults', event => {

			event.returnValue = this.defaults;

		});

		ipcMain.on('getPreferences', event => {

			event.returnValue = this.preferences;

		});

		ipcMain.on('setPreferences', (event, value) => {

			this.preferences = value;
			this.save();
			this.broadcast();
			this.emit('save', Object.freeze(_.cloneDeep(this.preferences)));
			event.returnValue = null;

		});

		ipcMain.on('showOpenDialog', (event, dialogOptions) => {

			event.returnValue = dialog.showOpenDialogSync(dialogOptions);

		});

		ipcMain.on('sendButtonClick', (_, message) => {

			// Main process
			this.emit('click', message);

		});

		ipcMain.on('resetToDefaults', _ => {

			this.resetToDefaults();

		});

		if (_.isFunction(options.afterLoad)) {

			options.afterLoad(this);

		}

	}

	get dataStore() {

		return this.options.dataStore;

	}

	get browserWindowOverrides() {

		return this.options.browserWindowOverrides;

	}

	get defaults() {

		return _.cloneDeep(this.options.defaults || {});

	}

	get preferences() {

		return this._preferences;

	}

	set preferences(value) {

		this._preferences = value;

	}

	save() {

		writeJsonFile(this.dataStore, this.preferences, {
			indent: 4,
		});

	}

	value(key, value) {

		// Place the key/value pair(s) into this.preferences var
		if (_.isArray(key)) {

			key.forEach(({ key, value }) => {

				_.set(this.preferences, key, value);

			});
			this.save();
			this.broadcast();

		} else if (!_.isUndefined(key) && !_.isUndefined(value)) {

			_.set(this.preferences, key, value);
			this.save();
			this.broadcast();

		} else if (_.isUndefined(value)) {

			// Value is undefined
			return _.cloneDeep(_.get(this.preferences, key));

		} else {

			// Key is undefined
			return _.cloneDeep(this.preferences);

		}

	}

	broadcast() {

		for (const wc of webContents.getAllWebContents()) {

			wc.send('preferencesUpdated', this.preferences);

		}

	}

	getBrowserWindowOptions() {

		let browserWindowOptions = {
			title: 'Preferences',
			width: 800,
			maxWidth: 800,
			height: 600,
			maxHeight: 600,
			resizable: false,
			acceptFirstMouse: true,
			maximizable: false,
			backgroundColor: '#E7E7E7',
			show: false,
			webPreferences: this.options.webPreferences,
		};

		const defaultWebPreferences = {
			nodeIntegration: false,
			enableRemoteModule: false,
			preload: path.join(__dirname, './preload.js'),
			devTools: this.options.debug,
		};

		const unOverridableWebPreferences = {
			contextIsolation: true,
			devTools: this.options.debug ? true : undefined,
		};

		// User provided `browserWindow`, we load those
		if (this.options.browserWindowOverrides) {

			browserWindowOptions = Object.assign(browserWindowOptions, this.options.browserWindowOverrides);

		}

		// Object.assign is shallow, let's process browserWindow.webPreferences
		browserWindowOptions.webPreferences = Object.assign(defaultWebPreferences, browserWindowOptions.webPreferences, unOverridableWebPreferences);

		return browserWindowOptions;

	}

	show(section) {
    
    const sectionIds = this.options.sections.map(section => section.id);
    if (!sectionIds.includes(section)) {
      
      console.warn(`Could not find a section with id '${section}'. Ignoring the parameter`);
      section = undefined;
      
    }

		if (this.prefsWindow) {

			this.prefsWindow.focus();

			if (this.options.debug) {

				this.prefsWindow.webContents.openDevTools();

			}

      if (section) {
          this.prefsWindow.webContents.executeJavaScript(` \
              document.getElementById("tab-${section}").click() \
              ;0
            `); // ";0" is needed so nothing is returned (especially not an non-cloneable IPC object) by JS.
      }

			return this.prefsWindow;

		}

		this.prefsWindow = new BrowserWindow(this.getBrowserWindowOptions());

		if (this.options.menuBar) {

			this.prefsWindow.setMenu(this.options.menuBar);

		} else {

			this.prefsWindow.removeMenu();

		}

		this.prefsWindow.loadURL(url.format({
			pathname: path.join(__dirname, 'build/index.html'),
			protocol: 'file:',
			slashes: true,
		}));

		this.prefsWindow.once('ready-to-show', () => {

			// Show: false by default, then show when ready to prevent page "flicker"
			this.prefsWindow.show();

		});

		this.prefsWindow.webContents.on('dom-ready', async () => {

			// Load custom css file
			if (this.options.css) {

				const file = path.join(app.getAppPath(), this.options.css)
					.replace(/\\/g, '/'); // Make sure it also works in Windows

				try {

					if (await fs.promises.stat(file)) {

						await this.prefsWindow.webContents.executeJavaScript(` \
					  		var f = document.createElement("link"); \
					  		f.rel = "stylesheet"; \
					  		f.type = "text/css"; \
					  		f.href = "${file}"; \
					  		document.getElementsByTagName("head")[0].appendChild(f) \
					  		;0
					  	`); // ";0" is needed so nothing is returned (especially not an non-cloneable IPC object) by JS.

					}

				} catch (error) {

					console.error(`Could not load css file ${file}: ${error}`);

				}

			}
      
      if (section) {
        
        try {

          await this.prefsWindow.webContents.executeJavaScript(` \
					  		document.getElementById("tab-${section}").click() \
					  		;0
					  	`); // ";0" is needed so nothing is returned (especially not an non-cloneable IPC object) by JS.
          
        } catch (error) {
          
          console.error(`Could not open the requested section ${section}: ${error}`);
          
        }
        
      }

		});

		this.prefsWindow.on('closed', () => {

			this.prefsWindow = null;

		});

		if (this.options.debug) {

			this.prefsWindow.webContents.openDevTools();

		}

		return this.prefsWindow;

	}

	close() {

		if (!this.prefsWindow) {

			return;

		}

		this.prefsWindow.close();

	}

	resetToDefaults() {

					this._preferences = this.defaults;
					
					this.save();
					this.broadcast();
	}

}

module.exports = ElectronPreferences;
