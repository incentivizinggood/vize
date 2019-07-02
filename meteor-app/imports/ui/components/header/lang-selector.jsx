import React from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";

import { i18n } from "meteor/universe:i18n";
import { withTracker } from "meteor/react-meteor-data";

import { localeMetadata, reactiveGetLocale } from "/imports/ui/startup/i18n.js";

const LocaleIcon = ({ code }) => (
	<img
		src={localeMetadata[code].icon}
		alt={localeMetadata[code].nativeName}
	/>
);

const CurrentLocaleIcon = withTracker(() => ({
	code: reactiveGetLocale(),
}))(LocaleIcon);

const LocaleButton = styled.button`
	padding: 0;
	& + & {
		margin-left: 5px;
	}
`;

const langOptions = close => (
	<>
		{Object.keys(localeMetadata).map(code => (
			<LocaleButton
				key={code}
				onClick={() => {
					i18n.setLocale(code);
					close();
				}}
			>
				<LocaleIcon code={code} />
			</LocaleButton>
		))}
	</>
);

function LangSelector() {
	return (
		<Popup
			trigger={
				<button className="button">
					<CurrentLocaleIcon />
				</button>
			}
			closeOnDocumentClick
			contentStyle={{ width: `${(58 + 6) * 2 + 5}px` }}
		>
			{langOptions}
		</Popup>
	);
}

export default LangSelector;
