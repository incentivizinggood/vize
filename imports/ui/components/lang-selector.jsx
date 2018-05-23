import React from "react";
import { i18n } from "meteor/universe:i18n";
import PropTypes from "prop-types";
import Dropdown, {
	DropdownTrigger,
	DropdownContent,
} from "react-simple-dropdown";

const locales = [
	{ code: "en", name: "English", icon: "images/us.jpg" },
	{ code: "es", name: "Español", icon: "images/mx.jpg" },
];

function LangOption(props) {
	return (
		<button
			onClick={() => {
				i18n.setLocale(props.locale.code);
				props.extraOnClick();
			}}
		>
			<img src={props.locale.icon} alt={`${props.locale.name} icon.`} />
			<span>{props.locale.name}</span>
		</button>
	);
}

LangOption.propTypes = {
	locale: PropTypes.shape({
		code: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired,
	}).isRequired,
	extraOnClick: PropTypes.func.isRequired,
};

export default class LangSelector extends React.Component {
	constructor(props) {
		super(props);
		this.state = { locale: locales[0] };

		this.updateLocale = this.updateLocale.bind(this);
		this.dropdown = React.createRef();

		i18n.onChangeLocale(this.updateLocale);
		this.updateLocale(i18n.getLocale());
	}

	updateLocale(newLocaleCode) {
		const newLocale =
			locales.find(({ code }) => code === newLocaleCode) || locales[0];
		this.setState({ locale: newLocale });
	}

	render() {
		const hideDropdown = () => {
			this.dropdown.current.hide();
		};

		return (
			<Dropdown ref={this.dropdown}>
				<DropdownTrigger>
					<img
						src={this.state.locale.icon}
						alt={`${this.state.locale.name} icon.`}
					/>
					<span>{this.state.locale.name}</span>
				</DropdownTrigger>
				<DropdownContent>
					<ul>
						{locales.map(l => (
							<li key={l.code}>
								<LangOption
									locale={l}
									extraOnClick={hideDropdown}
								/>
							</li>
						))}
					</ul>
				</DropdownContent>
			</Dropdown>
		);
	}
}
