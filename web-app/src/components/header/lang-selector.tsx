import React from "react";
import Popup from "reactjs-popup";
import styled from "styled-components";

import {
	LocaleContext,
	LocaleSetterContext,
	localeMetadata,
} from "src/startup/i18n";

interface LocaleIconProps {
	code: keyof typeof localeMetadata;
}

function LocaleIcon({ code }: LocaleIconProps): JSX.Element {
	return (
		<img
			style={{ borderRadius: "8px" }}
			src={localeMetadata[code].icon}
			alt={localeMetadata[code].nativeName}
		/>
	);
}

const LocaleButton = styled.button`
	padding: 0;
	& + & {
		margin-left: 5px;
	}
`;

function fak<T>(record: T): (keyof T)[] {
	return Object.keys(record) as any;
}

const langOptions =
	(setLocale: (locale: string) => void) => (close: () => void) =>
		(
			<>
				{fak(localeMetadata).map((code) => (
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

export default function LangSelector(): JSX.Element {
	const locale = React.useContext(LocaleContext);
	const setLocale = React.useContext(LocaleSetterContext);

	return (
		<Popup
			trigger={
				<button className="button">
					<LocaleIcon
						code={/*TODO: fix this type properly */ locale as any}
					/>
				</button>
			}
			closeOnDocumentClick
			contentStyle={{ width: `${(58 + 6) * 2 + 5}px` }}
		>
			{langOptions(setLocale)}
		</Popup>
	);
}
