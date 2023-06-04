'use strict';

const electron = require('electron');
const { Menu } = electron;
const path = require('path');
const os = require('os');
const ElectronPreferences = require('../');

const preferences = new ElectronPreferences({

	// Debug: true, // True will open the dev tools
	css: 'custom-style.css',
	dataStore: path.resolve(__dirname, 'preferences.json'),
	defaults: {
		notes: {
			folder: path.resolve(os.homedir(), 'Notes'),
		},
		about: {
			firstName: 'Pieter-Jan',
			lastName: 'Van Robays',
		},
		sectionsEnabler: {
			lists: true,
			theme: true,
		},
		// ...
	},
	webPreferences: {
		webSecurity: true,
	},
	menuBar: Menu.buildFromTemplate(
		[ {
			label: 'Window',
			role: 'window',
			submenu: [ {
				label: 'Close',
				accelerator: 'CmdOrCtrl+W',
				role: 'close',
			} ],
		} ],
	),
	browserWindowOverrides: {
		title: 'My Electron Preferences',
	},
	sections: [ {
		id: 'about',
		label: 'About You',
		icon: 'activity',
		form: {
			groups: [ {
				label: 'About You',
				fields: [ {
					label: 'First Name',
					key: 'firstName',
					type: 'text',
					help: 'What is your first name?',
				},
				{
					label: 'Last Name',
					key: 'lastName',
					type: 'text',
					help: 'What is your last name?',
				},
				{
					label: 'Enable Gender',
					key: 'enableGender',
					type: 'radio',
					options: [
						{ label: 'No', value: false },
						{ label: 'Yes', value: true },
					],
					help: 'So woke!',
				},
				{
					label: 'Gender',
					key: 'gender',
					type: 'dropdown',
					options: [
						{ label: 'Male', value: 'male' },
						{ label: 'Female', value: 'female' },
						{ label: 'Unspecified', value: 'unspecified' },
					],
					help: 'What is your gender?',
					hideFunction(preferences) {

						return !preferences.about?.enableGender;

					},
				},
				{
					label: 'Age',
					key: 'age',
					type: 'text',
					inputType: 'number',
				},
				{
					label: 'Age2',
					key: 'age2',
					type: 'number',
				},
				{
					label: 'Which of the following foods do you like?',
					key: 'foods',
					type: 'checkbox',
					options: [
						{ label: 'Ice Cream', value: 'iceCream' },
						{ label: 'Carrots', value: 'carrots' },
						{ label: 'Cake', value: 'cake' },
						{ label: 'Spinach', value: 'spinach' },
					],
					help: 'Select one or more foods that you like.',
				},
				{
					label: 'Are you tired?',
					key: 'tired',
					type: 'checkbox',
					options: [
						{ label: 'Yes', value: 'yes' },
					],
				},
				{
					label: 'Coolness',
					key: 'coolness',
					type: 'slider',
					min: 0,
					max: 9001,
				},
				{
					label: 'Eye Color',
					key: 'eyeColor',
					type: 'color',
					format: 'hex',
					help: 'Your eye color',
				},
				{
					label: 'Hair Color',
					key: 'hairColor',
					type: 'color',
					format: 'rgb',
					help: 'Your hair color',
				} ],
			} ],
		},
	},
	{
		id: 'notes',
		label: 'Notes',
		icon: 'folder-15',
		form: {
			groups: [ {
				label: 'Stuff',
				fields: [ {
					label: 'Read notes from folder',
					key: 'folder',
					type: 'directory',
					help: 'The location where your notes will be stored.',
					multiSelections: false,
					noResolveAliases: false,
					treatPackageAsDirectory: false,
					dontAddToRecent: true,
				},
				{
					label: 'Select some images',
					key: 'images',
					type: 'file',
					help: 'List of selected images',
					filters: [
						{ name: 'Joint Photographic Experts Group (JPG)', extensions: [ 'jpg', 'jpeg', 'jpe', 'jfif', 'jfi', 'jif' ] },
						{ name: 'Portable Network Graphics (PNG)', extensions: [ 'png' ] },
						{ name: 'Graphics Interchange Format (GIF)', extensions: [ 'gif' ] },
						{ name: 'All Images', extensions: [ 'jpg', 'jpeg', 'jpe', 'jfif', 'jfi', 'jif', 'png', 'gif' ] },
						// { name: 'All Files', extensions: ['*'] }
					],
					multiSelections: true,
					showHiddenFiles: true,
					noResolveAliases: false,
					treatPackageAsDirectory: false,
					dontAddToRecent: true,
				},
				{
					heading: 'Important Message',
					content: '<p>The quick brown fox jumps over the long white fence. The quick brown fox jumps over the long white fence. The quick brown fox jumps over the long white fence. The quick brown fox jumps over the long white fence.</p>',
					type: 'message',
				},
				{
					label: 'Do some action on the main process',
					key: 'do-action-on-main',
					type: 'button',
					buttonLabel: 'Just do it!',
					help: 'Can be used to trigger an action on the main process. For example, reset some preferences',
				} ],
			} ],
		},
	},
	{
		id: 'space',
		label: 'Other Settings',
		icon: 'spaceship',
		form: {
			groups: [ {
				fields: [ {
					label: 'Phone Number',
					key: 'phoneNumber',
					type: 'text',
					help: 'What is your phone number?',
				},
				{
					label: 'Foo or Bar?',
					key: 'foobar',
					type: 'radio',
					options: [
						{ label: 'Foo', value: 'foo' },
						{ label: 'Bar', value: 'bar' },
						{ label: 'FooBar', value: 'foobar' },
					],
					help: 'Foo? Bar?',
				},
				{
					label: 'Bar or Foo?',
					key: 'barfoo',
					type: 'radio',
					options: [
						{ label: 'Bar', value: 'bar' },
						{ label: 'Foo', value: 'foo' },
						{ label: 'BarFoo', value: 'barfoo' },
					],
					help: 'Bar? Foo?',
				},
				{
					label: 'Shortcut',
					key: 'shortcut',
					type: 'accelerator',
					help: 'A keyboard shortcut',
					modifierRequired: true,
				} ],
			} ],
		},
	},
	{
		id: 'account',
		label: 'Account',
		icon: 'lock',
		form: {
			groups: [ {
				label: 'Account',
				fields: [ {
					label: 'Username',
					key: 'username',
					type: 'text',
				},
				{
					label: 'Password',
					key: 'password',
					type: 'secret',
				} ],
			} ],
		},
	},
	{
		id: 'sectionsEnabler',
		label: 'Enable Sections',
		icon: 'preferences',
		form: {
			groups: [ {
				label: 'Enable Sections',
				fields: [ {
					label: 'Lists',
					key: 'lists',
					type: 'radio',
					options: [
						{ label: 'No', value: false },
						{ label: 'Yes', value: true },
					],
					help: 'Show Lists sections?',
				},
				{
					label: 'Theme',
					key: 'theme',
					type: 'radio',
					options: [
						{ label: 'No', value: false },
						{ label: 'Yes', value: true },
					],
					help: 'Show Themes sections?',
				} ],
			},
			{
				label: 'Enable Groups',
				fields: [ {
					label: 'Enable Group 1',
					key: 'group1',
					type: 'dropdown',
					options: [
						{ label: 'No', value: false },
						{ label: 'Yes', value: true },
					],
					help: 'Show group 1?',
				},
				{
					label: 'Enable Group 2',
					key: 'group2',
					type: 'radio',
					options: [
						{ label: 'No', value: false },
						{ label: 'Yes', value: true },
					],
					help: 'Show Group2?',
				} ],
			},
			{
				label: 'Group 1',
				hideFunction(preferences) {

					return preferences.sectionsEnabler?.group1 === 'false';

				},
				fields: [ {
					heading: 'Group 1',
					content: '<p>Placeholder for group 1</p>',
					type: 'message',
				} ],
			},
			{
				label: 'Group 2',
				hideFunction(preferences) {

					return !preferences.sectionsEnabler?.group2;

				},
				fields: [ {
					heading: 'Group 1',
					content: '<p>Placeholder for group 1</p>',
					type: 'message',
				} ],
			} ],
		},
	},
	{
		id: 'lists',
		label: 'Lists',
		icon: 'notes',
		hideFunction(preferences) {

			return !preferences.sectionsEnabler?.lists;

		},
		form: {
			groups: [ {
				label: 'Lists',
				fields: [ {
					label: 'Favorite foods',
					key: 'foods',
					type: 'list',
					size: 15,
					help: 'A list of your favorite foods',
					addItemValidator: /^[A-Za-z ]+$/.toString(),
					addItemLabel: 'Add favorite food',
					min: 1,
					max: 4,
				},
				{
					label: 'Best places to visit',
					key: 'places',
					type: 'list',
					size: 10,
					style: {
						width: '75%',
					},
					help: 'An ordered list of nice places to visit',
					orderable: true,
				} ],
			} ],
		},
	},
	{
		id: 'theme',
		label: 'Theme',
		icon: 'brightness-6',
		hideFunction(preferences) {

			return !preferences.sectionsEnabler?.theme;

		},
		form: {
			groups: [ {
				fields: [ {
					label: 'Theme',
					key: 'theme',
					type: 'radio',
					options: [
						{ label: 'System (default)', value: 'system' },
						{ label: 'Light', value: 'light' },
						{ label: 'Dark', value: 'dark' },
					],
					help: 'Light or dark theme?',
				} ],
			} ],
		},
	} ],
});

module.exports = preferences;
