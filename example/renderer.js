/* global api, document */
'use strict';

const bt = document.querySelectorAll('.bt')[0];
const prefsElement = document.querySelectorAll('.preferences')[0];
prefsElement.innerHTML = JSON.stringify(api.getPreferences(), null, 4);

bt.addEventListener('click', () => {

	api.showPreferences();

});

api.onPreferencesChanged(preferences => {

	console.log('Preferences were updated', preferences);
	prefsElement.innerHTML = JSON.stringify(preferences, null, 4);

});
