'use strict';

import React from 'react';
import './style.scss';
const { ipcRenderer } = window.require('electron');

class TextField extends React.Component {

    state = {};

    componentDidUpdate() {
        ipcRenderer.on('manualOnChange', () => {
            this.props.onChange(this.value);
        })
    }

    render() {

        const fieldLabel = this.hideLabel  === 'true' ? '': <div className="field-label">{ this.label }</div>;

        return (
            <div className="field field-text">
                { fieldLabel }
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

        return this.field.inputType || "text";

    }

    get help() {

        return this.field.help;

    }

    get hideLabel() {

        return this.field.hideLabel;

    }

    onChange(e) {

        return this.props.onChange(e.target.value);

    }

}

export default TextField;
