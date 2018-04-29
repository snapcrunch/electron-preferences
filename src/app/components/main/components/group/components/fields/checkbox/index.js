'use strict';

import React from 'react';
import './style.scss';

class CheckboxField extends React.Component {

    state = {};

    render() {

        return (
            <div className="field field-checkbox">
                <label className="field-label">{ this.label }</label>
                <input type="checkbox" onChange={ this.onChange.bind(this) } checked={ this.value } />
                { this.help && <span className="help">{ this.help }</span> }
            </div>
        );

    }

    get field() {

        return this.props.field;

    }

    get value() {

        return this.props.value || false;

    }

    get label() {

        return this.field.label;

    }

    get help() {

        return this.field.help;

    }

    onChange(e) {

        return this.props.onChange(e.target.checked);

    }

}

export default CheckboxField;
