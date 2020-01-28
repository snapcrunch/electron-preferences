'use strict';

import React from 'react';
import './style.scss';
const { remote } = window.require('electron');
const { dialog } = remote;

class DirectoryField extends React.Component {

    state = {};

    render() {

        const choose = () => {

            dialog.showOpenDialog({
                properties: [
                    'openDirectory',
                    'createDirectory',
                ]
            })
                .then((res) => {

                    if (res.canceled) {
                        return;
                    }

                    if (res.filePaths && res.filePaths.length) {
                        this.onChange(res.filePaths[0]);
                    }

                });

        };

        const fieldLabel = this.hideLabel  === 'true' ? '': <div className="field-label">{ this.label }</div>;

        const btLabel = this.value ? ((this.buttonLabel[1] && this.buttonLabel[0]) ? this.buttonLabel[1] : 'Choose Another Directory') : ((this.buttonLabel[1] && this.buttonLabel[0]) ? this.buttonLabel[0] : 'Choose a Directory');

        return (
            <div className="field field-directory">
                { fieldLabel }
                <div className="value">
                    { this.hidePrefix === 'true' ? '' : (this.prefix  ? this.prefix + ':' : 'Directory:') } { this.value }
                </div>
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

    get value() {

        return this.props.value;

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

    get onChange() {

        return this.props.onChange;

    }

    get buttonLabel() {
        return this.field.buttonLabel || [];
    }

    get prefix() {
        return this.field.prefix;
    }

    get hidePrefix() {
        return this.field.hidePrefix;
    }

    get hideLabel() {

        return this.field.hideLabel;

    }

}

export default DirectoryField;
