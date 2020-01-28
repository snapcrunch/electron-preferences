'use strict';

import React from 'react';
import './style.scss';

class SliderField extends React.Component {

    state = {};

    render() {

        const fieldLabel = this.hideLabel  === 'true' ? '': <div className="field-label">{ this.label }</div>;

        return (
            <div className="field field-slider">
                { fieldLabel }
                <input type="range" onChange={ this.onChange.bind(this) } min={ this.min } max={ this.max } value={ this.value }/>
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

    get help() {

        return this.field.help;

    }

    get hideLabel() {

        return this.field.hideLabel;

    }

    onChange(e) {

        return this.props.onChange(parseInt(e.target.value));

    }

}

export default SliderField;
