'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { newGuid } from '../../../../../../../utils/newGuid';

class CheckboxField extends React.Component {

	render() {

		const fieldID = `checkbox_${newGuid()}`;

		const options = this.options.map((option, idx) => {

			const id = `${fieldID}_${idx}`;

			return (
				<label htmlFor={ id } className="checkbox-option" key={idx}>
					{ option.label }
					<input type="checkbox" id={ id } onChange={ this.onChange.bind(this) } checked={ this.value.indexOf(option.value) >= 0 } />
					<span className="check-square" />
				</label>
			);

		});

		return (
			<div className="field field-checkbox">
				<div className="field-label">{ this.label }</div>
				{ options }
				{ this.help && <span className="help">{ this.help }</span> }
			</div>
		);

	}

	get field() {

		return this.props.field;

	}

	get value() {

		return this.props.value || [];

	}

	get label() {

		return this.field.label;

	}

	get options() {

		return this.field.options || [];

	}

	get help() {

		return this.field.help;

	}

	onChange(e) {

		const idx = e.target.id.split('_')[2];
		const option = this.options[idx];

		if (e.target.checked) {

			if (this.value.indexOf(option.value) === -1) {

				this.value.push(option.value);

			}

		} else {

			const valIdx = this.value.indexOf(option.value);
			if (valIdx > -1) {

				this.value.splice(valIdx, 1);

			}

		}

		return this.props.onChange(this.value);

	}

}

CheckboxField.propTypes = {
	field: PropTypes.object,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

export default CheckboxField;
