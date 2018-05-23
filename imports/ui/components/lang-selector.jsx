import React from "react";
import PropTypes from "prop-types";
import Dropdown, {
	DropdownTrigger,
	DropdownContent,
} from "react-simple-dropdown";
import { i18n } from "meteor/universe:i18n";
import { withTracker } from "meteor/react-meteor-data";

import { localeMetadata, currentLocale } from "../../startup/client/i18n.js";

class LangSelector extends React.Component {
	constructor(props) {
		super(props);
		this.dropdown = React.createRef();
	}

	render() {
		const hideDropdown = () => {
			this.dropdown.current.hide();
		};

		return (
			<Dropdown ref={this.dropdown}>
				<DropdownTrigger>
					<img
						src={this.props.currentLocale.icon}
						alt={`${this.props.currentLocale.name} icon.`}
					/>
				</DropdownTrigger>
				<DropdownContent>
					<ul>
						{localeMetadata.map(l => (
							<li key={l.code}>
								<button
									onClick={() => {
										i18n.setLocale(l.code);
										hideDropdown();
									}}
								>
									<img src={l.icon} alt={`${l.name} icon.`} />
									<span>{l.name}</span>
								</button>
							</li>
						))}
					</ul>
				</DropdownContent>
			</Dropdown>
		);
	}
}

LangSelector.propTypes = {
	currentLocale: PropTypes.shape({
		code: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired,
	}).isRequired,
};

const LangSelectorContainer = withTracker(() => ({
	currentLocale: currentLocale.get(),
}))(LangSelector);

export default LangSelectorContainer;
