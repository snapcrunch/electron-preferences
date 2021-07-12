'use strict'

import React from 'react'
import PropTypes from 'prop-types'

class SliderField extends React.Component {

	render() {

		return (
			<div className="field field-slider">
				<div className="field-label">{ this.label }</div>
				<input type="range" onChange={ this.onChange.bind(this) } min={ this.min } max={ this.max } step={ this.step } value={ this.value }/>
				<label>{ this.value }</label>
				{ this.help && <span className="help">{ this.help }</span> }
			</div>
		);

	}

	get field() {

		return this.props.field;

	}

	get value() {

		return this.props.value || this.min;

	}

	get label() {

		return this.field.label;

	}

	get min() {

		return this.field.min || 0;

	}

	get max() {

		return this.field.max || 100;

	}

	get step() {

		return this.field.step || 1;

	}

	get help() {

		return this.field.help;

	}

	onChange(e) {

    	return this.props.onChange( parseInt( e.target.value ) )

	}

}

SliderField.propTypes = {
	field: PropTypes.object,
	value: PropTypes.string,
	onChange: PropTypes.func,
}

export default SliderField
