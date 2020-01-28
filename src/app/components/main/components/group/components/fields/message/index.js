'use strict';

import React from 'react';
import './style.scss';
const { remote } = window.require('electron');
const { dialog } = remote;

class MessageField extends React.Component {

    state = {};

    render() {

        const fieldHeading = this.hideHeading  === 'true' ? '': this.heading && <div className="field-heading">{ this.heading }</div>;

        if (!this.heading && !this.content) {
            return null;
        }

        return (
            <div className="field field-message">
                { fieldHeading }
                <div className="field-content" dangerouslySetInnerHTML={ this.getContent() }></div>
            </div>
        );

    }

    get field() {

        return this.props.field;

    }

    get content() {

        return this.field.content;

    }

    get heading() {

        return this.field.heading;

    }

    get hideHeading() {

        return this.field.hideHeading;

    }

    getContent() {

        return {
            '__html': this.content
        };

    }

}

export default MessageField;
