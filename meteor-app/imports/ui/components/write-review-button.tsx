import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { i18n } from "meteor/universe:i18n";

import { urlGenerators } from "imports/ui/pages/url-generators";
import withUpdateOnChangeLocale from "imports/ui/hoc/update-on-change-locale";
import { LinkButton } from "imports/ui/components/button";

const t = i18n.createTranslator();

interface WriteReviewButtonProps {
	companyName?: string;
}

function WriteReviewButton(props: WriteReviewButtonProps) {
	return (
		<LinkButton to={urlGenerators.vizeReviewUrl(props.companyName)} primary>
			<FontAwesomeIcon icon={faPlus} />
			&nbsp;
			{t("common.overview_tab.add_review")}
		</LinkButton>
	);
}

// Work around untill we get types on withUpdateOnChangeLocale.
const foo: React.ComponentType<
	WriteReviewButtonProps
> = withUpdateOnChangeLocale(WriteReviewButton);

export default foo;
