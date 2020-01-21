'use strict';

const electron = require('electron');
const app = electron.app;
const path = require('path');
const os = require('os');
const ElectronPreferences = require('../');

const preferences = new ElectronPreferences({
    browserWindowOverrides: {
        icon: path.join(__dirname, 'example.png'),
        title: 'Custom Title'
    },
    childBrowserWindowOverrides: {
        offset: 20,
        resizable: true,
        maximizable: true
    },
    'dataStore': path.resolve(__dirname, 'preferences.json'),
    'defaults': {
        'notes': {
            'folder': path.resolve(os.homedir(), 'Notes')
        },
        'folderVariations': {
            'customButtonLabel': path.resolve(app.getPath('downloads')),
            'customPrefix': path.resolve(app.getPath('downloads')),
            'noPrefix': path.resolve(app.getPath('downloads'))
        },
        'fileVariations': {
            'customButtonLabel': path.resolve(app.getPath('downloads'), 'file.docx'),
            'customPrefix': path.resolve(app.getPath('downloads'), 'file.docx'),
            'noPrefix': path.resolve(app.getPath('downloads'), 'file.docx')
        },
        'markdown': {
            'auto_format_links': true,
            'show_gutter': false
        },
        'preview': {
            'show': true
        },
        'drawer': {
            'show': true
        }
    },
    'onLoad': (data) => {

        console.log('data', data);

        return data;

    },
    'afterLoad': ({ preferences }) => {
        console.log('afterLoad', preferences);
    },
    'webPreferences': {
        'devTools': true
    },
    'sections': [
        {
            'id': 'about',
            'label': 'About You',
            'icon': 'single-01',
            'form': {
                'groups': [
                    {
                        'label': 'About You',
                        'fields': [
                            {
                                'label': 'First Name',
                                'key': 'first_name',
                                'type': 'text',
                                'help': 'What is your first name?'
                            },
                            {
                                'label': 'Last Name',
                                'key': 'last_name',
                                'type': 'text',
                                'help': 'What is your last name?'
                            },
                            {
                                'label': 'Gender',
                                'key': 'gender',
                                'type': 'dropdown',
                                'options': [
                                    {'label': 'Male', 'value': 'male'},
                                    {'label': 'Female', 'value': 'female'},
                                    {'label': 'Unspecified', 'value': 'unspecified'},
                                ],
                                'help': 'What is your gender?'
                            },
                            {
                                'label': 'Age',
                                'key': 'age',
                                'type': 'text',
                                'inputType': 'number'
                            },
                            {
                                'label': 'Which of the following foods do you like?',
                                'key': 'foods',
                                'type': 'checkbox',
                                'options': [
                                    {'label': 'Ice Cream', 'value': 'ice_cream'},
                                    {'label': 'Carrots', 'value': 'carrots'},
                                    {'label': 'Cake', 'value': 'cake'},
                                    {'label': 'Spinach', 'value': 'spinach'}
                                ],
                                'help': 'Select one or more foods that you like.'
                            },
                            {
                                'label': 'Coolness',
                                'key': 'coolness',
                                'type': 'slider',
                                'min': 0,
                                'max': 9001
                            },
                            {
                                'label': 'Eye Color',
                                'key': 'eye_color',
                                'type': 'color',
                                'format': 'hex',
                                'help': 'Your eye color'
                            },
                            {
                                'label': 'Hair Color',
                                'key': 'hair_color',
                                'type': 'color',
                                'format': 'rgb',
                                'help': 'Your hair color'
                            }
                        ]
                    }
                ]
            }
        },
        {
            'id': 'notes',
            'label': 'Notes',
            'icon': 'folder-15',
            'form': {
                'groups': [
                    {
                        'label': 'Stuff',
                        'fields': [
                            {
                                'label': 'Read notes from folder',
                                'key': 'folder',
                                'type': 'directory',
                                'help': 'The location where your notes will be stored.'
                            },
                            {
                                'heading': 'Important Message',
                                'content': '<p>The quick brown fox jumps over the long white fence. The quick brown fox jumps over the long white fence. The quick brown fox jumps over the long white fence. The quick brown fox jumps over the long white fence.</p>',
                                'type': 'message',
                            }
                        ]
                    }
                ]
            }
        },
        {
            'id': 'space',
            'label': 'Other Settings',
            'icon': 'spaceship',
            'form': {
                'groups': [
                    {
                        'label': 'Other Settings',
                        'fields': [
                            {
                                'label': 'Phone Number',
                                'key': 'phone_number',
                                'type': 'text',
                                'help': 'What is your phone number?'
                            },
                            {
                                'label': "Foo or Bar?",
                                'key': 'foobar',
                                'type': 'radio',
                                'options': [
                                    {'label': 'Foo', 'value': 'foo'},
                                    {'label': 'Bar', 'value': 'bar'},
                                    {'label': 'FooBar', 'value': 'foobar'},
                                ],
                                'help': 'Foo? Bar?'
                            },
                            {
                                'label': 'Shortcut',
                                'key': 'shortcut',
                                'type': 'accelerator',
                                'help': 'A keyboard shortcut'
                            },
                            {
                                'heading': 'Child Window',
                                'content': 'Child Window options can be overriden: <a href="https://www.duckduckgo.com" target="_blank">duckduckgo.com</a>',
                                'type': 'message'
                            },
                            {
                                'label': 'Ipc button',
                                'key': 'ipcButton',
                                'type': 'button',
                                'channel': 'applyChanges',
                                'buttonLabel': 'Restart to apply changes',
                                'help': 'This button sends on a custom ipc channel'
                            },
                        ]
                    }
                ]
            }
        },
        {
            'id': 'folderVariations',
            'label': 'Folder Variations',
            'icon': 'folder-15',
            'form': {
                'groups': [
                    {
                        'label': 'Folder Variations',
                        'fields': [
                            {
                                'label': 'Folder with Custom Button Label',
                                'key': 'customButtonLabel',
                                'type': 'directory',
                                'buttonLabel': ['Custom Label', 'Another Custom Label']
                            },
                            {
                                'label': 'Folder with Custom Prefix',
                                'key': 'customPrefix',
                                'type': 'directory',
                                'prefix': 'Custom'
                            },
                            {
                                'label': 'Folder without Prefix',
                                'key': 'noPrefix',
                                'type': 'directory',
                                'hidePrefix':'true'
                            }
                        ]
                    }
                ]
            }
        },
        {
            'id': 'fileVariations',
            'label': 'File Variations',
            'icon': 'single-folded-content',
            'form': {
                'groups': [
                    {
                        'label': 'File Variations',
                        'fields': [
                            {
                                'label': 'File with Custom Button Label',
                                'key': 'customButtonLabel',
                                'type': 'file',
                                'buttonLabel': ['Custom Label', 'Another Custom Label']
                            },
                            {
                                'label': 'File with Custom Prefix',
                                'key': 'customPrefix',
                                'type': 'file',
                                'prefix': 'Custom'
                            },
                            {
                                'label': 'File without Prefix',
                                'key': 'noPrefix',
                                'type': 'file',
                                'hidePrefix':'true'
                            }
                        ]
                    }
                ]
            }
        },
        {
            'id': 'customIcon',
            'label': 'Custom Icon',
            'icon': 'electron-preferences/example/example.png',
        },
        {
            'id': 'noIcon',
            'label': 'No Icon',
        }
    ]
});

module.exports = preferences;
