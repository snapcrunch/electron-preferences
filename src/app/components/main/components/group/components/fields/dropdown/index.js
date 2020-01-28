'use strict';

import React from 'react';
import './style.scss';

class DropdownField extends React.Component {

    state = {};

    render() {

        const options = this.options.map((option, idx) => {
            return (
                <option value={option.value} key={idx}>{option.label}</option>
            );
        });

        const fieldLabel = this.hideLabel  === 'true' ? '': <div className="field-label">{ this.label }</div>;

        return (
            <div className="field field-dropdown">
                { fieldLabel }
                <select onChange={ this.onChange.bind(this) } value={ this.value }>
                    <option value=""> { this.default ? '-- ' + this.default + ' --' : '-- Select One --' } </option>
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

    get default() {
        return this.field.default;
    }

    get hideLabel() {

        return this.field.hideLabel;

    }

    onChange(e) {

        return this.props.onChange(e.target.value);

    }

}

export default DropdownField;
