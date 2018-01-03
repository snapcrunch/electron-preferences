'use strict';

import React from 'react';
import './style.scss';

class TextField extends React.Component {

    state = {};

    render() {

        return (
            <div className="field field-text">
                <div className="field-label">{ this.label }</div>
                <input type="text" onChange={ this.onChange.bind(this) } value={ this.value } />
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

    get type() {

        return this.field.type;

    }

    onChange(e) {

        return this.props.onChange(e.target.value);

    }

}

export default TextField;
