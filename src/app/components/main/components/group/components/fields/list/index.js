'use strict';

import React from 'react';
import ReactModal from 'react-modal';
import './style.scss';

class ListField extends React.Component {

    state = {
      showInputModal: false,
      itemToAdd: '',
      selectedIndex: 0
    };

    constructor(props) {
      super(props);
      this.addClick = this.addClick.bind(this);
      this.removeClick = this.removeClick.bind(this);
      this.upClick = this.upClick.bind(this);
      this.downClick = this.downClick.bind(this);
    }

    render() {
        return (
            <div className="field field-list">
                <div className="field-label">{ this.label }</div>
                <div>
                  <div>
                    <select style={ this.style } className="ep-list" size={ this.size } onChange={ this.selectItem.bind(this) }>
                      {
                        this.value.map((item, index) => {
                          if (index === this.state.selectedIndex) {
                            return (<option selected value={item}>{item}</option>);
                          } else {
                            return (<option value={item}>{item}</option>);
                          }
                        })
                      }
                    </select>
                  </div>
                  <span className="ep-list-button-first" onClick={ this.addClick }><span className="ep-list-button-text">+</span></span>
                  <span className="ep-list-button" onClick={ this.removeClick }><span className="ep-list-button-text">-</span></span>
                  { this.orderable &&
                    <React.Fragment>
                      <span className="ep-list-button" onClick={ this.upClick }><span className="ep-list-button-text">↑</span></span>
                      <span className="ep-list-button" onClick={ this.downClick }><span className="ep-list-button-text">↓</span></span>
                    </React.Fragment>
                  }
                  <ReactModal style={ this.modalStyle } isOpen={ this.state.showInputModal } contentLabel='add item' closeTimeoutMS={ this.modalCloseTimeoutMS }>
                    <div className="ep-list-modal-container">
                      <div className="ep-list-modal-input-container">
                        <label className="ep-list-modal-input-label">{ this.addItemLabel }: </label>
                        <input className="ep-list-modal-input" type="text" value={ this.state.itemToAdd } onChange={ this.itemToAddChanged.bind(this) } />
                      </div>
                      <div className="ep-list-modal-button-container">
                        <button className="ep-list-modal-button" onClick={ this.cancelAdd.bind(this) }>Cancel</button>
                        { this.addItemValidator.test(this.state.itemToAdd) &&
                          <button className="ep-list-modal-button" onClick={ this.saveItem.bind(this) }>Save</button>
                          ||
                          <button className="ep-list-modal-button" disabled="disabled">Save</button>
                        }
                      </div>
                    </div>
                  </ReactModal>
                </div>
                { this.help && <span className="help">{ this.help }</span> }
            </div>
        );
    }

    selectItem = (e) => {
      this.setState({ selectedIndex: e.target.selectedIndex });
    };

    itemToAddChanged = (e) => {
      this.setState({ itemToAdd: e.target.value });
    };

    addClick = () => {
      this.setState({ showInputModal: true });
    };

    cancelAdd = () => {
      this.setState({ showInputModal: false, itemToAdd: '' });
    };

    saveItem = () => {
      if (this.state.itemToAdd !== undefined && this.state.itemToAdd !== null && this.state.itemToAdd !== '') {
        this.props.onChange([...this.value, this.state.itemToAdd]);
      }
      this.setState({ showInputModal: false, itemToAdd: '' });
    };

    removeClick = () => {
      if (this.state.selectedIndex >= 0) {
        this.props.onChange(this.value.filter((item, index) => index !== this.state.selectedIndex));
      }
    };

    upClick = () => {
      const { selectedIndex } = this.state;
      if (selectedIndex >= 1) {
        const newIndex = selectedIndex - 1;
        this.props.onChange([...this.value.slice(0, newIndex), this.value[selectedIndex], this.value[newIndex], ...this.value.slice(selectedIndex + 1)]);
        this.setState({ selectedIndex: this.state.selectedIndex - 1 });
      }
    };

    downClick = () => {
      const { selectedIndex } = this.state;
      if (selectedIndex <= this.value.length - 2) {
        const newIndex = selectedIndex + 1;
        this.props.onChange([...this.value.slice(0, selectedIndex), this.value[newIndex], this.value[selectedIndex], ...this.value.slice(newIndex + 1)]);
        this.setState({ selectedIndex: this.state.selectedIndex + 1 });
      }
    };

    get field() {
        return this.props.field;
    }

    get value() {
        return this.props.value || [];
    }

    get label() {
        return this.field.label;
    }

    get inputType() {
        return this.field.inputType || "list";
    }

    get orderable() {
      return this.field.orderable || false;
    }

    get size() {
      return this.field.size || 10;
    }

    get help() {
        return this.field.help;
    }

    get style() {
      return this.field.style || {};
    }

    get modalStyle() {
      return this.field.modalStyle || {
        'content': {
          'top': '40px',
          'left': '50%',
          'bottom': 'auto',
          'right': 'auto',
          'marginRight': '-50%',
          'transform': 'translate(-50%, -50%)'
        }
      };
    }

    get modalCloseTimeoutMS() {
      return this.field.modalCloseTimeoutMS || 100;
    }

    get addItemLabel() {
      return this.field.addItemLabel || 'Add item';
    }

    get addItemValidator() {
      if (this.field.addItemValidator) {
        const str = this.field.addItemValidator;
        const lastSlash = str.lastIndexOf('/');
        const validator = new RegExp(str.slice(1, lastSlash), str.slice(lastSlash + 1));
        return validator;
      }
      return /.+/;
    }
}

export default ListField;
