/* global api, document */
'use strict';

const bt = document.querySelectorAll('.bt')[0];
const bt2 = document.querySelectorAll('.bt')[1];
const bt3 = document.querySelectorAll('.bt')[2];
const bt4 = document.querySelectorAll('.bt')[3];
const bt5 = document.querySelectorAll('.bt')[4];
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

bt4.addEventListener('click', () => {
				
	api.showPreferences("notes");

});

bt5.addEventListener('click', () => {
  
  const preferences = api.getPreferences();
  
  const encrypted = preferences.account.password;
	const decrypted = api.decrypt(encrypted);
  
  alert(`Encrypted password: ${encrypted}\nDecrypted password: ${decrypted}`);

});

api.onPreferencesChanged(preferences => {

	console.log('Preferences were updated', preferences);
	prefsElement.innerHTML = JSON.stringify(preferences, null, 4);

});
