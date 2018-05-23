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
};

export default function LangSelector() {
	return (
		<Dropdown>
			<DropdownTrigger>test</DropdownTrigger>
			<DropdownContent>
				<ul>
					{locales.map(l => (
						<li key={l.code}>
							<LangOption locale={l} />
						</li>
					))}
				</ul>
			</DropdownContent>
		</Dropdown>
	);
}
