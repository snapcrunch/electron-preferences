/* global api */
'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { isArray } from '../../../../../../../utils/isArray.js';

class FileField extends React.Component {

	constructor(props) {

		super(props);

		this.choose = this.choose.bind(this);

	}

	render() {

		const { multiSelections, value, help, label } = this;

		const btLabel = value && value.length > 0
			? (multiSelections ? 'Choose other Files' : 'Choose another File')
			: (multiSelections ? 'Choose Files' : 'Choose a File');

		return (
			<div className={`field field-file key-${this.field.key}`}>
				<div className="field-label" aria-label={ label }>{label}</div>
				<div className="value" onClick={this.choose}>
					{multiSelections ? 'Files' : 'File'}:&nbsp;
					{
						value
							? (
								multiSelections || value.length > 1
									? <ul>{value.map((v, i) => <li key={i}>{v}</li>)}</ul>
									: value[0]
							)
							: 'None'
					}
				</div>
				<button className="bt" onClick={this.choose} aria-label={ btLabel }>
					{btLabel}
				</button>
				{help && <span className="help">{help}</span>}
			</div>
		);

	}

	get field() {

		return this.props.field;

	}

	get value() { // Always return an array

		const { value } = this.props;
		if (typeof (value) === 'undefined') {

			return undefined;

		}

		return isArray(value) ? value : [ value ];

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

	choose() {

		const { multiSelections, showHiddenFiles, noResolveAliases, treatPackageAsDirectory, dontAddToRecent, filters } = this;
		const properties = [ 'openFile' ];
		if (multiSelections) {

			properties.push('multiSelections');

		}

		if (showHiddenFiles) {

			properties.push('showHiddenFiles');

		}

		if (noResolveAliases) {

			properties.push('noResolveAliases');

		}

		if (treatPackageAsDirectory) {

			properties.push('treatPackageAsDirectory');

		}

		if (dontAddToRecent) {

			properties.push('dontAddToRecent');

		}

		const result = api?.showOpenDialog({
			properties,
			filters,
		});

		if (!result) {

			return;

		}

		if (result.length > 0) {

			this.onChange(multiSelections ? result : result[0]);

		}

	}

}

FileField.propTypes = {
	field: PropTypes.object,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

export default FileField;
