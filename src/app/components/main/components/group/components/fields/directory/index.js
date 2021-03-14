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

        }

        const btLabel = this.value ? 'Choose Another Folder' : 'Choose a Folder';

        return (
            <div className="field field-directory">
                <div className="field-label">{ this.label }</div>
                <div className="value" onClick={ choose }>
                    Folder: { this.value }
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

}

export default DirectoryField;
