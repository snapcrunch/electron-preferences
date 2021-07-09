'use strict';

import React from 'react';
import {isArray} from "../../../../../../../utils/isArray";

class DirectoryField extends React.Component {

    render() {
        const { multiSelections, value, help, label } = this;

        const btLabel = value && value.length > 0
            ? (multiSelections ? 'Choose other Folders' : 'Choose Another Folder')
            : (multiSelections ? 'Choose Folders' : 'Choose a Folder');

        return (
            <div className="field field-directory">
                <div className="field-label">{ label }</div>
                <div className="value" onClick={ this.choose }>
                    {multiSelections ? "Folders" : "Folder"}:&nbsp;
                    {
                        value
                            ? (
                                multiSelections || value.length > 1
                                    ? <ul>{value.map(v => <li>{v}</li>)}</ul>
                                    : value[0]
                            )
                            : 'None'
                    }
                </div>
                <div className="bt" onClick={ this.choose }>
                    { btLabel }
                </div>
                { help && <span className="help">{ help }</span> }
            </div>
        );

    }

    get field() {
        return this.props.field;
    }

    get value() { //Always return an array
        const { value } = this.props;
        if (typeof(value) === "undefined")
            return undefined;
        return isArray(value) ? value : [value];
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

    get multiSelections() {
        return this.field.multiSelections || false;
    }

    get noResolveAliases() {
        return this.field.noResolveAliases || false;
    }

    get treatPackageAsDirectory() {
        return this.field.treatPackageAsDirectory || false;
    }

    get dontAddToRecent() {
        return this.field.dontAddToRecent || false;
    }

    get onChange() {
        return this.props.onChange;
    }

    choose = () => {
        const { multiSelections, noResolveAliases, treatPackageAsDirectory, dontAddToRecent } = this;
        const properties = ['openDirectory', 'createDirectory'];
        if (multiSelections)
            properties.push("multiSelections");
        if (noResolveAliases)
            properties.push("noResolveAliases");
        if (treatPackageAsDirectory)
            properties.push("treatPackageAsDirectory");
        if (dontAddToRecent)
            properties.push("dontAddToRecent");

        const result = api.showOpenDialog({
            properties: properties
        });

        if (!result)
            return;

        if (result.length) {
            this.onChange(multiSelections ? result : result[0]);
        }
    }

}

export default DirectoryField;
