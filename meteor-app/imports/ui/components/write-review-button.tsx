import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { urlGenerators } from "imports/ui/pages/url-generators";
import { LinkButton } from "imports/ui/components/button";
import { translations } from "imports/ui/translations";

const T = translations.legacyTranslationsNeedsRefactor.overview_tab;

interface WriteReviewButtonProps {
	companyName?: string;
}

function WriteReviewButton(props: WriteReviewButtonProps) {
	return (
		<LinkButton
			to={{
				pathname: urlGenerators.vizeReviewUrl(props.companyName),
				state: {
					prevPath: location.pathname,
				},
			}}
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
