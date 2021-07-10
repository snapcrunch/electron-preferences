'use strict';

const bt = document.getElementsByClassName('bt')[0];
const prefsEl = document.getElementsByClassName('preferences')[0];
prefsEl.innerHTML = JSON.stringify(api.getPreferences(), null, 4);

bt.addEventListener('click', () => {

	api.showPreferences();

});

api.onPreferencesChanged(preferences => {

	console.log('Preferences were updated', preferences);
	prefsEl.innerHTML = JSON.stringify(preferences, null, 4);

});
