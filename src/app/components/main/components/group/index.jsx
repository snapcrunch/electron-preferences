'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import DirectoryField from './components/fields/directory';
import TextField from './components/fields/text';
import MessageField from './components/fields/message';
import DropdownField from './components/fields/dropdown';
import CheckboxField from './components/fields/checkbox';
import RadioField from './components/fields/radio';
import SliderField from './components/fields/slider';
import AcceleratorField from './components/fields/accelerator';
import ColorField from './components/fields/color';
import ListField from './components/fields/list';
import FileField from './components/fields/file';
import ButtonField from './components/fields/button';
import HideableComponent from "../../../generic/hideable";

const fieldMap = {
	directory: DirectoryField,
	text: TextField,
	number: TextField,
	message: MessageField,
	dropdown: DropdownField,
	checkbox: CheckboxField,
	radio: RadioField,
	slider: SliderField,
	accelerator: AcceleratorField,
	color: ColorField,
	list: ListField,
	file: FileField,
	button: ButtonField,
};

class Group extends React.Component {

	render() {

    const { allPreferences } = this;
    
		const label = this.label ? <div className="group-label">{ this.label }</div> : null;

		const fields = this.fields.map((field, idx) => {

			const Field = fieldMap[field.type];
			if (!Field) {

				return;

			}

			return <HideableComponent field={ field } key={ idx } allPreferences={ allPreferences } >
        <Field field={ field }
               key={ idx }
               value={ this.preferences[field.key] }
               onChange={ this.onFieldChange.bind(this, field.key) }
        />
      </HideableComponent>;

		})
			.filter(field => field);

		return (
			<div className={`group key-${this.props.groupId}`}>
				{ label }
				{ fields }
			</div>
		);

	}

	get label() {

		return this.group.label;

	}

	get fields() {

		return this.group.fields;

	}

	get group() {

		return this.props.group;

	}

	get preferences() {

		return this.props.preferences;

	}
  
  get allPreferences() {
    
    return this.props.allPreferences;
    
  }

	get onFieldChange() {

		return this.props.onFieldChange;

	}

}

Group.propTypes = {
	preferences: PropTypes.object,
	group: PropTypes.object,
	onFieldChange: PropTypes.func,
};

export default Group;
