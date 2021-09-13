'use strict';

import React from 'react';
import PropTypes from 'prop-types';

class Sidebar extends React.Component {

	render() {

        const sections = this.sections.map((section) => {
            let className = 'sidebar-section';
            if (this.activeSection === section.id) {
                className += ' active';
            }

            const style = {
                mask: `url("svg/${section.icon}.svg") no-repeat center / contain`,
                webkitMask: `url("svg/${section.icon}.svg") no-repeat center / contain`
            }
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

    onTablistKeyDown = (e) => {
        if (e.repeat) return;
        let tabIncrement = 0;
        if (e.keyCode === 40 || e.keyCode === 39) {
            tabIncrement++;
        } else if (e.keyCode === 37 || e.keyCode === 38) {
            tabIncrement--;
        }

        if (tabIncrement === 0)
            return;

        const { activeSection, sections } = this;
        const sectionIds = sections.map(section => section.id);
        console.log(activeSection, sectionIds);
        if (sectionIds.length <= 0)
            return;

        let index = sectionIds.indexOf(activeSection);
        if (index === -1 || (tabIncrement > 0 && index >= sectionIds.length - 1)) {
            //last tab is selected, or no tab found... Just return to the first tab.
            this.selectSection(sectionIds[0]);
        }
        else if (index === 0 && tabIncrement < 0) {
            //select last tab
            this.selectSection(sectionIds[sectionIds.length - 1]);
        }
        else {
            this.selectSection(sectionIds[index + tabIncrement]);
        }
    }

}

Sidebar.propTypes = {
	sections: PropTypes.array,
	activeSection: PropTypes.string,
	onSelectSection: PropTypes.func,
};

export default Sidebar;
