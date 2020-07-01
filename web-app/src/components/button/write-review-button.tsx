import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ReactGA from "react-ga";

import { urlGenerators } from "src/pages/url-generators";
import { LinkButton } from "src/components/button";
import { translations } from "src/translations";

const T = translations.legacyTranslationsNeedsRefactor.overview_tab;

interface WriteReviewButtonProps {
	companyName?: string;
	buttonLocation?: string;
}

function buttonTracking(buttonLocation?: string) {
	ReactGA.event({
		category: "Button",
		action: "Add Review Pressed",
		label: buttonLocation,
	});
}

function WriteReviewButton(props: WriteReviewButtonProps) {
	return (
		<LinkButton
			to={urlGenerators.vizeReviewUrl(props.companyName)}
			onClick={() => buttonTracking(props.buttonLocation)}
			primary
		>
			<FontAwesomeIcon icon={faPlus} />
			&nbsp;
			<T.add_review />
		</LinkButton>
	);
}

// Work around until we get types on withUpdateOnChangeLocale.
const foo: React.ComponentType<WriteReviewButtonProps> = WriteReviewButton;

export default foo;
