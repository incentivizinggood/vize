import React from "react";
import { withRouter } from "react-router-dom";
import PrivacyIcon from "@material-ui/icons/Security";

import {
	FormText,
	FormHeader,
	FormPageWrapper,
} from "src/components/form-stuff";
import { useTranslations } from "src/translations";

import CreateReviewForm from "./create-review-form";

interface CreateReviewPageProps {
	companyName?: string;
	referredBy?: string;
}

// companyName and referredBy are props that are passed down from pages.tsx.
// Both of these props are optional url parameters
function CreateReviewPage({ companyName, referredBy }: CreateReviewPageProps) {
	const t = useTranslations().createReview;

	return (
		<FormPageWrapper title="Create Review">
			<FormHeader>{t.formTitle}</FormHeader>
			<FormText>{t.formSubTitle1}</FormText>
			<FormText>
				<PrivacyIcon />
				{t.formSubTitle3}
			</FormText>
			<CreateReviewForm
				companyName={companyName}
				referredBy={referredBy}
			/>
		</FormPageWrapper>
	);
}

export default withRouter(CreateReviewPage);
