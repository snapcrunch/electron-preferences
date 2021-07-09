'use strict'

import React from 'react'
import keycodeToChar from '../../../../../../../utils/keycodeToChar.js'

const AcceleratorField = ({ field, value, onChange, ...props }) => {

	/*
		AcceleratorField

		props.field values: label, help, mofifierRequired

		modifierRequired: By default any key can be used, if this is true, a modifier must be provided.
	*/

  	// Display the keys being pushed while trying to set accelerator
  	const [ pressing, setPressing ] = React.useState(false)
  	const [ accelerator, setAccelerator ] = React.useState('')

  	/*
  		Using this info: https://keycode.info/ we exclude some keys that we need for modifiers
  		like control, shift, etc. as well as a handful of oddball codes.
  		We only save if we receive one of these non-modifier keys.
	*/
  	const excludeKeyCodes = [ 0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 16, 17, 18, 21, 22, 23, 24, 25, 26, 28, 29, 30, 31, 91, 92, 93, 94, 95 ]

	const handleKeyDown = event => {

		event.preventDefault()

		const keys = []
		event.ctrlKey && keys.push('Control')
		event.metaKey && keys.push('Command') // Probably should be called meta
		event.altKey && keys.push('Alt')
		event.shiftKey && keys.push('Shift')

		// I've not tested every combo to verify it will work in electron, all the documentation they provide:
       	// https://www.electronjs.org/docs/api/accelerator#available-key-codes
		if (!excludeKeyCodes.includes(event.which) && keycodeToChar.hasOwnProperty(event.which)) {

        	// We allow single-keys to be set, unless `modifierRequired` is passed
        	if (field.modifierRequired && keys.length < 1) {

        		return

			}

	        // Save values
	        keys.push(keycodeToChar[event.which])
	        onChange(keys.join('+'))

		}

		// Display current keys pressed
		setPressing(true)
		setAccelerator(keys.join('+'))

	}

	const handleKeyUp = event => {

    	setPressing(false)

	}

	return (
		<div className="field field-accelerator">
			<div className="field-label">{ field.label }</div>
			<input type="text" value={ (pressing && accelerator) || value } onKeyDown={ handleKeyDown } onKeyUp={ handleKeyUp } readOnly />
			{ field.help && <span className="help">{ field.help }</span> }
		</div>
	)

}

export default AcceleratorField
