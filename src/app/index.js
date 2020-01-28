'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/sidebar';
import Main from './components/main';
import _ from 'lodash';

const { ipcRenderer } = window.require('electron');
const options = ipcRenderer.sendSync('getPreferenceOptions');
let preferences = ipcRenderer.sendSync('getPreferences');
const defaults = ipcRenderer.sendSync('getDefaults');

options.sections = options.sections.filter((section) => {
    return _.isBoolean(section.enabled) ? section.enabled : true;
});

options.sections.forEach((section) => {
    if (!preferences[section.id]) {
        preferences[section.id] = {};
    }
});

class App extends React.Component {

    state = {
        'options': options,
        'activeSection': options.sections[0].id,
        'preferences': preferences
    };

    componentDidMount() {
        ipcRenderer.on('changeProps', () => {
            this.setState({'preferences': ipcRenderer.sendSync('getPreferences')});
        });
    }

    render() {

        return (
            <React.Fragment>
                <Sidebar { ...this.state } onSelectSection={ this.onSelectSection.bind(this) } />
                <Main { ...this.state } onFieldChange={ this.onFieldChange.bind(this) } />
            </React.Fragment>
        );

    }

    onSelectSection(sectionId) {

        this.setState({
            'activeSection': sectionId
        });

    }

    onFieldChange(key, value) {

        preferences[this.state.activeSection][key] = value;

        this.setState({
            'preferences': preferences
        });

        ipcRenderer.send('setPreferences', preferences);

    }

}

ReactDOM.render(
    <App />,
    document.getElementById('window')
);
