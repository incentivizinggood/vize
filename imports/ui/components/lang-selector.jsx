import React from "react";
import { i18n } from "meteor/universe:i18n";
import PropTypes from "prop-types";

function LangOption(props) {
	return (
		<button
			onClick={() => {
				i18n.setLocale(props.locale);
			}}
		>
			<img src="/images/us.jpg" alt="US flag" />
		</button>
	);
}

LangOption.propTypes = {
	locale: PropTypes.string.isRequired,
};

export default function LangSelector(props) {
	return (
		<div>
			<button
				onClick={() => {
					i18n.setLocale("en");
				}}
			>
				<img src="/images/us.jpg" alt="US flag" />
			</button>
			<button
				onClick={() => {
					i18n.setLocale("es");
				}}
			>
				<img src="/images/mx.jpg" alt="Mexican flag" />
			</button>
		</div>
	);
}
