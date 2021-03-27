'use strict';

// const electron = require('electron');
// const app = electron.app;
const path = require('path');
const os = require('os');
const ElectronPreferences = require('../');

const preferences = new ElectronPreferences({
    'dataStore': path.resolve(__dirname, 'preferences.json'),
    'defaults': {
        'notes': {
            'folder': path.resolve(os.homedir(), 'Notes')
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
    'browserWindowOverrides': {
        'title': 'My Electron Preferences',
        'webPreferences': {
	        'devTools': true
	    },
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
                                'label': "Bar or Foo?",
                                'key': 'barfoo',
                                'type': 'radio',
                                'options': [
                                    {'label': 'Bar', 'value': 'bar'},
                                    {'label': 'Foo', 'value': 'foo'},
                                    {'label': 'BarFoo', 'value': 'barfoo'},
                                ],
                                'help': 'Bar? Foo?'
                            },
                            {
                                'label': 'Shortcut',
                                'key': 'shortcut',
                                'type': 'accelerator',
                                'help': 'A keyboard shortcut'
                            }
                        ]
                    }
                ]
            }
        },
        {
            'id': 'theme',
            'label': 'Theme',
            'icon': 'brightness-6',
            'form': {
                'groups': [
                    {
                        'fields': [
                            {
                                'label': "Theme",
                                'key': 'theme',
                                'type': 'radio',
                                'options': [
                                    {'label': 'System (default)', 'value': 'system'},
                                    {'label': 'Light', 'value': 'light'},
                                    {'label': 'Dark', 'value': 'dark'}
                                ],
                                'help': 'Light or dark theme?'
                            }
                        ]
                    }
                ]
            }
        }
    ]
});

module.exports = preferences;
