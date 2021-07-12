'use strict'

import React from 'react'
import PropTypes from 'prop-types'

class TextField extends React.Component {

	render() {

		return (
			<div className="field field-text">
				<div className="field-label">{ this.label }</div>
				<input type={ this.inputType } onChange={ this.onChange.bind(this) } value={ this.value }/>
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

	get inputType() {

		return this.field.inputType || 'text';

	}

	get help() {

		return this.field.help;

	}

	onChange(e) {

		return this.props.onChange(e.target.value);

	}
}

TextField.propTypes = {
	field: PropTypes.object,
	value: PropTypes.string,
	onChange: PropTypes.func,
}

export default TextField
