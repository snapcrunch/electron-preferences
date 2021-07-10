'use strict';

import React from 'react';
import PropTypes from 'prop-types';

class Sidebar extends React.Component {

	render() {

		const sections = this.sections.map(section => {

			let className = 'sidebar-section';
			if (this.activeSection === section.id) {

				className += ' active';

			}

			const style = {
				mask: `url("svg/${section.icon}.svg") no-repeat center / contain`,
				webkitMask: `url("svg/${section.icon}.svg") no-repeat center / contain`,
			};

			return (
				<div key={ section.id } className={ className } onClick={ this.selectSection.bind(this, section.id) }>
					<div className="section-icon" style={ style } />
					<span className="section-label">{ section.label }</span>
				</div>
			);

		});

		return (
			<div className="sidebar">
				{ sections }
			</div>
		);

	}

	get sections() {

		return this.props.sections;

	}

	get activeSection() {

		return this.props.activeSection;

	}

	get onSelectSection() {

		return this.props.onSelectSection;

	}

	selectSection(sectionId) {

		this.setState({
			activeSection: sectionId,
		});

		this.onSelectSection(sectionId);

	}

}

Sidebar.propTypes = {
	sections: PropTypes.string,
	activeSection: PropTypes.string,
	onSelectSection: PropTypes.funct,
};

export default Sidebar;
