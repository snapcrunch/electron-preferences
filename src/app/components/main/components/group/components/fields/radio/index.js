'use strict';

import React from 'react';
import './style.scss';

class RadioField extends React.Component {

    state = {};

    render() {

        const options = this.options.map((option, idx) => {
            return (
                <div className="field field-radio-option">
                    <input type="radio" value={ option.value } key={ idx } onChange={ this.onChange.bind(this) } checked={ this.value === option.value }/>
                    <label className="field-label">{ option.label }</label>
                </div>
            );
        });

        return (
            <div className="field field-radio">
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

export default RadioField;
