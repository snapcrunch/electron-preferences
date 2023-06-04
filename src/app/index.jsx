/* global api */

/* Eleectron Renderer Process */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import debounce from './utils/debounce.js';
import Sidebar from './components/sidebar';
import Main from './components/main';
import '../../scss/style.scss';

const allSections = api.getSections();
const preferences = api.getPreferences();

const sections = allSections.filter(section => _.isBoolean(section.enabled) ? section.enabled : true);

const dSavePreferences = debounce(preferences => {

	api.setPreferences(preferences);

}, 200);

for (const section of sections) {

	if (!preferences[section.id]) {

		preferences[section.id] = {};

	}

}

class App extends React.Component {

	constructor(props) {

		super(props);
		this.state = {
			sections,
			activeSection: sections[0].id,
			preferences,
		};

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
			activeSection: sectionId,
		});

	}

	onFieldChange(key, value) {

		preferences[this.state.activeSection][key] = value;

		this.setState({
			preferences,
		});

		dSavePreferences(preferences);

	}

}

ReactDOM.render(
	<App />,
	document.querySelector('#window'),
);
