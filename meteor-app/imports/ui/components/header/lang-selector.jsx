import React from "react";
import PropTypes from "prop-types";
import Dropdown, {
	DropdownTrigger,
	DropdownContent,
} from "react-simple-dropdown";

import { i18n } from "meteor/universe:i18n";
import { withTracker } from "meteor/react-meteor-data";

import { localeMetadata, reactiveGetLocale } from "/imports/ui/startup/i18n.js";

function CurLang({ code }) {
	return <img src={localeMetadata[code].icon} alt={`${code} icon.`} />;
}

CurLang.propTypes = {
	code: PropTypes.string.isRequired,
};

const CurLangContainer = withTracker(() => ({
	code: reactiveGetLocale(),
}))(CurLang);

function LangSelector() {
	const refDropdown = React.useRef(null);

	const hideDropdown = () => {
		refDropdown.current.hide();
	};

	const LangOpt = code => (
		<li key={code}>
			<button
				onClick={() => {
					i18n.setLocale(code);
					hideDropdown();
				}}
			>
				<img src={localeMetadata[code].icon} alt={`${code} icon.`} />
				<span>{localeMetadata[code].nativeName}</span>
			</button>
		</li>
	);

	return (
		<Dropdown ref={refDropdown}>
			<DropdownTrigger>
				<CurLangContainer />
			</DropdownTrigger>
			<DropdownContent>
				<ul>{Object.keys(localeMetadata).map(LangOpt)}</ul>
			</DropdownContent>
		</Dropdown>
	);
}

export default LangSelector;
