'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';

class ColorField extends React.Component {

	constructor(props) {

		super(props);
		this.wrapperRef = React.createRef();
		this.state = { displayColorPicker: false };
		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.onChange = this.onChange.bind(this);

	}

	render() {

		return (
			<div className={`field field-color key-${this.field.key}`} ref={this.wrapperRef}>
				<div className='field-label'>{ this.label }</div>
				<div className='color-container'>
					<div className='color-swatch' onClick={ this.handleClick }>
						<div className='color' style={ this.style }/>
					</div>
					{ this.state.displayColorPicker ? <div className='color-popover'>
						<ChromePicker color={ this.value } onChange={ this.onChange } disableAlpha={ this.format === 'hex' }/>
					</div> : null }
				</div>
				{ this.help && <span className='help'>{ this.help }</span> }
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
		switch (this.format) {

		case 'rgb': {

			style = `rgba(${this.value.r}, ${this.value.g}, ${this.value.b}, ${this.value.a})`;

			break;

		}

		case 'hex': {

			style = this.value;

			break;

		}

		case 'hsl': {

			style = `hsla(${this.value.h}, ${this.value.s * 100}%, ${this.value.l * 100}%, ${this.value.a})`;

			break;

		}

		default: if (this.value.hex) {

			style = this.value.hex;

		}

		}

		return { background: style };

	}

	onChange(color) {

		switch (this.format) {

		case 'rgb': {

			color = color.rgb;

			break;

		}

		case 'hex': {

			color = color.hex;

			break;

		}

		case 'hsl': {

			color = color.hsl;

			break;

		}
		// No default

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
