'use strict';

import React from 'react';

class FileField extends React.Component {

    state = {};

    render() {

        const choose = () => {
            const properties = ['openFile'];
            if (this.multiSelections)
                properties.push("multiSelections");
            if (this.showHiddenFiles)
                properties.push("showHiddenFiles");
            if (this.noResolveAliases)
                properties.push("noResolveAliases");
            if (this.treatPackageAsDirectory)
                properties.push("treatPackageAsDirectory");
            if (this.dontAddToRecent)
                properties.push("dontAddToRecent");

            const result = api.showOpenDialog({
                properties: properties,
                filters: this.filters
            });

            if (!result)
                return;

            if (result.length) {
                this.onChange(result);
            }
        }

        const { multiSelections, values, help, label } = this;
        const btLabel = values && values.length > 0
            ? (multiSelections ? 'Choose other Files' : 'Choose another File')
            : (multiSelections ? 'Choose Files' : 'Choose a File');

        return (
            <div className="field field-file">
                <div className="field-label">{label}</div>
                <div className="value" onClick={choose}>
                    {multiSelections ? "Files" : "File"}:&nbsp;
                    {
                        values
                            ? (
                                multiSelections || values.length > 1
                                    ? <ul>{values.map(v => <li>{v}</li>)}</ul>
                                    : values[0]
                            )
                            : 'None'
                    }
                </div>
                <div className="bt" onClick={choose}>
                    {btLabel}
                </div>
                {help && <span className="help">{help}</span>}
            </div>
        );

    }

    get field() {
        return this.props.field;
    }

    get values() {
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
    
    get filters() {
        return this.field.filters || undefined;
    }
    
    get multiSelections() {
        return this.field.multiSelections || false;
    }
    
    get showHiddenFiles() {
        return this.field.showHiddenFiles || false;
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

}

export default FileField;
