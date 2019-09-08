import React from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";

import {
	LocaleContext,
	LocaleSetterContext,
	localeMetadata,
} from "imports/ui/startup/i18n";

const LocaleIcon = ({ code }) => (
	<img
		src={localeMetadata[code].icon}
		alt={localeMetadata[code].nativeName}
	/>
);

const LocaleButton = styled.button`
	padding: 0;
	& + & {
		margin-left: 5px;
	}
`;

const langOptions = (setLocale: (locale: string) => void) => (
	close: () => void
) => (
	<>
		{Object.keys(localeMetadata).map(code => (
			<LocaleButton
				key={code}
				onClick={() => {
					setLocale(code);
					close();
				}}
			>
				<LocaleIcon code={code} />
			</LocaleButton>
		))}
	</>
);

function LangSelector() {
	const locale = React.useContext(LocaleContext);
	const setLocale = React.useContext(LocaleSetterContext);

	return (
		<Popup
			trigger={
				<button className="button">
					<LocaleIcon code={locale} />
				</button>
			}
			closeOnDocumentClick
			contentStyle={{ width: `${(58 + 6) * 2 + 5}px` }}
		>
			{langOptions(setLocale)}
		</Popup>
	);
}

export default LangSelector;
