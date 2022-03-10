/* global api */
import React from 'react';
import PropTypes from 'prop-types';

class ButtonField extends React.Component {

	render() {

		const choose = () => {

			api.sendButtonClick(this.channel);

		};

		const fieldLabel = this.hideLabel === 'true' ? '' : <div className="field-label">{ this.label }</div>;

		const btLabel = this.buttonLabel ? this.buttonLabel : 'Click Here';

		return (
			<div className="field field-button">
				{ fieldLabel }
				<div className="bt" onClick={ choose }>
					{ btLabel }
				</div>
				{ this.help && <span className="help">{ this.help }</span> }
			</div>
		);

	}

	get field() {

		return this.props.field;

	}

	get label() {

		return this.field.label;

	}

	get type() {

		return this.field.type;

	}

	get help() {

		return this.field.help;

	}

	get buttonLabel() {

		return this.field.buttonLabel;

	}

	get channel() {

		return this.field.channel;

	}

	get hideLabel() {

		return this.field.hideLabel;

	}

}

ButtonField.propTypes = {
	field: PropTypes.object,
};

export default ButtonField;
