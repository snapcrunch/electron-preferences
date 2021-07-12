/* global document */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';

class ColorField extends React.Component {

	constructor(props) {

		super(props);
		this.wrapperRef = React.createRef();
		this.state = { displayColorPicker: false };

	}

	render() {

		return (
			<div className="field field-color" ref={this.wrapperRef}>
				<div className="field-label">{ this.label }</div>
				<div className="color-container">
					<div className="color-swatch" onClick={ this.handleClick }>
						<div className="color" style={ this.style }/>
					</div>
					{ this.state.displayColorPicker ? <div className="color-popover">
						<ChromePicker color={ this.value } onChange={ this.onChange.bind(this) } disableAlpha={ this.format === 'hex' }/>
					</div> : null }
				</div>
				{ this.help && <span className="help">{ this.help }</span> }
			</div>
		);

	}

	handleClick() {

		this.setState({ displayColorPicker: !this.state.displayColorPicker });

	}

	handleClose() {

		this.setState({ displayColorPicker: false });

	}

	componentDidMount() {

		document.addEventListener('click', this.handleClickOutside, true);

	}

	componentWillUnmount() {

		document.removeEventListener('click', this.handleClickOutside, true);

	}

	handleClickOutside(event) {

		// Do not use findDOMNode. It doesn’t work with function components and is deprecated in StrictMode. See https://reactjs.org/docs/react-dom.html#finddomnode
		if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {

			this.handleClose();

		}

	}

	get field() {

		return this.props.field;

	}

	get value() {

		return this.props.value || '#fff';

	}

	get label() {

		return this.field.label;

	}

	get help() {

		return this.field.help;

	}

	get format() {

		return this.field.format;

	}

	get style() {

		let style = '';
		if (this.format === 'rgb') {

			style = `rgba(${this.value.r}, ${this.value.g}, ${this.value.b}, ${this.value.a})`;

		} else if (this.format === 'hex') {

			style = this.value;

		} else if (this.format === 'hsl') {

			style = `hsla(${this.value.h}, ${this.value.s * 100}%, ${this.value.l * 100}%, ${this.value.a})`;

		} else if (this.value.hex) {

			style = this.value.hex;

		}

		return { background: style };

	}

	onChange(color) {

		if (this.format === 'rgb') {

			color = color.rgb;

		} else if (this.format === 'hex') {

			color = color.hex;

		} else if (this.format === 'hsl') {

			color = color.hsl;

		}

		return this.props.onChange(color);

	}

}

ColorField.propTypes = {
	field: PropTypes.object,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

export default ColorField;
