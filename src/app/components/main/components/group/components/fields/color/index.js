'use strict';

import React from 'react';
import './style.scss';
import { ChromePicker } from "react-color";

class ColorField extends React.Component {

    state = {};

    render() {

        return (
            <div className="field field-color">
                <div className="field-label">{ this.label }</div>
                <ChromePicker color={ this.value } onChange={ this.onChange.bind(this) } disableAlpha={ this.format === "hex" }/>
                { this.help && <span className="help">{ this.help }</span> }
            </div>
        );

    }

    get field() {

        return this.props.field;

    }

    get value() {

        return this.props.value || '#fff';

    }

    get label() {

        return this.field.label;

    }

    get help() {

        return this.field.help;

    }

    get format() {

        return this.field.format;

    }

    onChange(color) {

        if (this.format === "rgb") {
            color = color.rgb;
        } else if (this.format === "hex") {
            color = color.hex;
        } else if (this.format === "hsv") {
            color = color.hsv;
        } else if (this.format === "hsl") {
            color = color.hsl;
        }

        return this.props.onChange(color);

    }

}

export default ColorField;
