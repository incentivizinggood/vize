import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import * as urlGenerators from "src/pages/url-generators";
import * as analytics from "src/startup/analytics";
import { LinkButton } from "src/components/button";
import { translations } from "src/translations";

const T = translations.legacyTranslationsNeedsRefactor.overview_tab;

interface WriteReviewButtonProps {
	companyName?: string;
	buttonLocation?: string;
}

function buttonTracking(buttonLocation?: string) {
	analytics.sendEvent({
		category: "Button",
		action: "Add Review Pressed",
		label: buttonLocation,
	});
}

export default function WriteReviewButton(
	props: WriteReviewButtonProps
): JSX.Element {
	return (
		<LinkButton
			to={urlGenerators.vizeReviewUrl(props.companyName)}
			onClick={() => buttonTracking(props.buttonLocation)}
			$primary
		>
			<FontAwesomeIcon icon={faPlus} />
			&nbsp;
			<T.add_review />
		</LinkButton>
	);
}
