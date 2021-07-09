'use strict'

import React from 'react'
import DirectoryField from './components/fields/directory'
import TextField from './components/fields/text'
import MessageField from './components/fields/message'
import DropdownField from './components/fields/dropdown'
import CheckboxField from './components/fields/checkbox'
import RadioField from './components/fields/radio'
import SliderField from './components/fields/slider'
import AcceleratorField from './components/fields/accelerator'
import ColorField from './components/fields/color'
import ListField from './components/fields/list'
import FileField from './components/fields/file'

const fieldMap = {
	directory: DirectoryField,
	text: TextField,
	message: MessageField,
	dropdown: DropdownField,
	checkbox: CheckboxField,
	radio: RadioField,
	slider: SliderField,
	accelerator: AcceleratorField,
	color: ColorField,
	list: ListField,
	file: FileField,
}

class Group extends React.Component {

	render() {

		const label = this.label ? <div className="group-label">{ this.label }</div> : null

		const fields = this.fields.map((field, idx) => {

			const Field = fieldMap[field.type]
			if (!Field) {

				return

			}

			return <Field field={ field } key={ idx } value={ this.preferences[field.key] } onChange={ this.onFieldChange.bind(this, field.key) }/>

		})
			.filter(field => field)

		return (
			<div className="group">
				{ label }
				{ fields }
			</div>
		)

	}

	get label() {

		return this.group.label

	}

	get fields() {

		return this.group.fields

	}

	get group() {

		return this.props.group

	}

	get preferences() {

		return this.props.preferences

	}

	get onFieldChange() {

		return this.props.onFieldChange

	}

}

module.exports = Group
