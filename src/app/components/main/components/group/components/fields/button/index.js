'use strict';

import React from 'react';
import './style.scss';
const { ipcRenderer } = window.require('electron');

class ButtonField extends React.Component {

    state = {};

    render() {

        const choose = () => {
            ipcRenderer.send('buttonClicked', (this.channel))
        };

        const fieldLabel = this.hideLabel  === 'true' ? '': <div className="field-label">{ this.label }</div>;

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

export default ButtonField;
