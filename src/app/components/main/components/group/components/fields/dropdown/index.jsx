'use strict'

import React from 'react'
import PropTypes from 'prop-types'

class DropdownField extends React.Component {

	render() {

		const options = this.options.map((option, idx) => (
			<option value={option.value} key={idx}>{option.label}</option>
		));

		return (
			<div className="field field-dropdown">
				<div className="field-label">{ this.label }</div>
				<select onChange={ this.onChange.bind(this) } value={ this.value }>
					<option value="">-- Select One --</option>
					{ options }
				</select>
				{ this.help && <span className="help">{ this.help }</span> }
			</div>
		);

	}

	get field() {

		return this.props.field;

	}

	get value() {

		return this.props.value || '';

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

		return this.props.onChange(e.target.value);

	}
}

DropdownField.propTypes = {
	field: PropTypes.object,
	value: PropTypes.string,
	onChange: PropTypes.func,
}

export default DropdownField
