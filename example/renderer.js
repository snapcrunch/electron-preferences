/* global api, document */
'use strict';

const bt = document.querySelectorAll('.bt')[0];
const bt2 = document.querySelectorAll('.bt')[1];
const bt3 = document.querySelectorAll('.bt')[2];
const prefsElement = document.querySelectorAll('.preferences')[0];
prefsElement.innerHTML = JSON.stringify(api.getPreferences(), null, 4);

bt.addEventListener('click', () => {

	api.showPreferences();

});

bt2.addEventListener('click', () => {

	api.closePreferences();

});

bt3.addEventListener('click', () => {
				
	api.resetToDefaults();

});

api.onPreferencesChanged(preferences => {

	console.log('Preferences were updated', preferences);
	prefsElement.innerHTML = JSON.stringify(preferences, null, 4);

});
