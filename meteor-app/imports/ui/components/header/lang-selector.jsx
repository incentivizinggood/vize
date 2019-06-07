import React from "react";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";

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

const langOptions = close => (
	<ul>
		{Object.keys(localeMetadata).map(code => (
			<li key={code}>
				<button
					onClick={() => {
						i18n.setLocale(code);
						close();
					}}
				>
					<img
						src={localeMetadata[code].icon}
						alt={`${code} icon.`}
					/>
					<span>{localeMetadata[code].nativeName}</span>
				</button>
			</li>
		))}
	</ul>
);

function LangSelector() {
	return (
		<Popup
			trigger={
				<button className="button">
					<CurLangContainer />
				</button>
			}
			closeOnDocumentClick
		>
			{langOptions}
		</Popup>
	);
}

export default LangSelector;
