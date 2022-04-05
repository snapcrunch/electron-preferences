/* global navigator */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import keycodeToChar from '../../../../../../../utils/keycodeToChar.js';

const AcceleratorField = ({ field, value, onChange }) => {

	/*
		AcceleratorField

		props.field values: label, help, modifierRequired

		modifierRequired: By default any key can be used, if this is true, a modifier must be provided.
	*/

	// Display the keys being pushed while trying to set accelerator
	const [ pressing, setPressing ] = React.useState(false);
	const [ accelerator, setAccelerator ] = React.useState('');

	/*
		Using this info: https://keycode.info/ we exclude some keys that we need for modifiers
		like control, shift, etc. as well as a handful of oddball codes.
		We only save if we receive one of these non-modifier keys.
	*/
	const modifierKeyCodes = [ 16, 17, 18, 91, 92, 93 ];
	const specialKeyCodes = new Set([ 0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 91, 92, 93, 94, 95 ]);

	// Assign modifier key names, different OS' use different key names
	let altKeyName = 'Alt';
	let metaKeyName = 'Meta';
	if (navigator.userAgent.indexOf('Mac') !== -1) {

		altKeyName = 'Option';
		metaKeyName = 'Command';

	} else if (navigator.userAgent.indexOf('Win') !== -1) {

		metaKeyName = 'Windows';

	}

	const handleKeyDown = event => {

		event.preventDefault();

		// Start key array with any modifiers
		const keys = [
			event.ctrlKey && 'Control',
			event.metaKey && metaKeyName, // Probably should be called meta
			event.altKey && altKeyName,
			event.shiftKey && 'Shift',
		].filter(Boolean); // Remove false values

		// I've not tested every combo to verify it will work in electron, all the documentation they provide:
		// https://www.electronjs.org/docs/api/accelerator#available-key-codes
		if (!specialKeyCodes.has(event.which) && event.which in keycodeToChar) {

			// Clear the value on backspace (8) or delete (46)
			if (keys.length === 0 && (event.which === 8 || event.which === 46)) {

				setPressing(false);
				onChange('');

				return;

			}

			// We allow single-keys to be set, unless `modifierRequired` is passed
			if (field.modifierRequired && keys.length === 0) {

				return;

			}

			// Save values
			keys.push(keycodeToChar[event.which]);
			onChange(keys.join('+'));

		} else if (field.allowOnlyModifier && modifierKeyCodes.has(event.which) && keys.length === 1) {

			// `allowOnlyModifier`: we allow a single, modifier-only key to be set.
			onChange(keys[0]);

			return;

		}

		// Display current keys pressed
		setPressing(true);
		setAccelerator(keys.join('+'));

	};

	const handleKeyUp = _ => {

		setPressing(false);

	};

	return (
		<div className={`field field-accelerator key-${field.key}`}>
			<div className="field-label">{ field.label }</div>
			<input type="text" value={ (pressing && accelerator) || value } aria-label={ field.label } onKeyDown={ handleKeyDown } onKeyUp={ handleKeyUp } readOnly />
			{ field.help && <span className="help">{ field.help }</span> }
		</div>
	);

};

AcceleratorField.propTypes = {
	field: PropTypes.object,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

export default AcceleratorField;
