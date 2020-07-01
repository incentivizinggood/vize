import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ReactGA from "react-ga";

import { urlGenerators } from "src/pages/url-generators";
import { LinkButton } from "src/components/button";
import { translations } from "src/translations";

const T = translations.legacyTranslationsNeedsRefactor;

interface AddSalaryButtonProps {
	companyName?: string;
	buttonLocation?: string;
}

function buttonTracking(buttonLocation?: string) {
	ReactGA.event({
		category: "Button",
		action: "Add Salary Pressed",
		label: buttonLocation,
	});
}

function AddSalaryButton(props: AddSalaryButtonProps) {
	return (
		<LinkButton
			to={urlGenerators.vizeSalaryUrl(props.companyName)}
			onClick={() => buttonTracking(props.buttonLocation)}
			primary
		>
			<FontAwesomeIcon icon={faPlus} />
			&nbsp;
			<T.salary_tab.add_salary />
		</LinkButton>
	);
}

// Work around until we get types on withUpdateOnChangeLocale.
const foo: React.ComponentType<AddSalaryButtonProps> = AddSalaryButton;

export default foo;
