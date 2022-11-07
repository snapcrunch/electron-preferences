'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

class SecretField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showInputModal: false,
      updatedSecret: '',
    };
  }
  
  render() {

    return (
      <div className={`field field-secret key-${this.field.key}`}>
        <div className="field-label">{ this.label }</div>
        <div className="input-button-container">
          <input type="password" value={ this.hasValue ? "superSecret" : "" } aria-label="secret" disabled="disabled" />
          <button className="bt" onClick={ this.changeSecret.bind(this) }>Change</button>
        </div>
        { this.help && <span className="help">{ this.help }</span> }
        <ReactModal style={ this.modalStyle } shouldCloseOnOverlayClick={ true } isOpen={ this.state.showInputModal } contentLabel="Set your secret" closeTimeoutMS={ this.modalCloseTimeoutMs} >
          <div className="secret-modal">
            <h3>Set your secret:</h3>
            <input type="text" onChange={ this.onChange.bind(this) } value={ this.value } aria-label={ this.label }/>
            <div className="buttons">
              <button className="bt" onClick={ this.saveSecret.bind(this) }>Save</button>
              <button className="bt" onClick={ this.cancelSecret.bind(this) }>Cancel</button>
            </div>
          </div>
        </ReactModal>
      </div>
    );

  }

  get field() {

    return this.props.field;

  }

  get hasValue() {

    return !!this.props.value;

  }

  get label() {

    return this.field.label;

  }

  get help() {

    return this.field.help;

  }

  onChange(e) {

    this.setState({
      updatedSecret: e.target.value
    });
    
  }
  
  get modalCloseTimeoutMS() {

    return this.field.modalCloseTimeoutMS || 100;

  }

  saveSecret() {
    
    const secret = this.state.updatedSecret;
    const encrypted = api.encrypt(secret);
    this.props.onChange(encrypted);
    this.setState({ showInputModal: false, updatedSecret: ""});
    
  }

  changeSecret() {

    this.setState( {
      showInputModal: true,
      updatedSecret: ""
    });

  }

  cancelSecret() {

    this.setState( {
      showInputModal: false,
      updatedSecret: ""
    });

  }

  get modalStyle() {

    return this.field.modalStyle || {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      content: {
        top: '50%',
        left: '50%',
        bottom: 'auto',
        right: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
      },
    };

  }

}

SecretField.propTypes = {
  field: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SecretField;
