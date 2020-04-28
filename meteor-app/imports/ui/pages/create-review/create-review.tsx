import React from "react";
import { withRouter } from "react-router-dom";
import PrivacyIcon from "@material-ui/icons/Security";

import {
	FormText,
	FormHeader,
	FormPageWrapper,
} from "imports/ui/components/form-stuff";
import { translations } from "imports/ui/translations";

import CreateReviewForm from "./create-review-form";

const T = translations.createReview;

interface CreateReviewPageProps {
	companyName?: string;
	referredBy?: string;
}

// companyName and referredBy are props that are passed down from pages.tsx.
// Both of these props are optional url parameters
function CreateReviewPage({ companyName, referredBy }: CreateReviewPageProps) {
	return (
		<FormPageWrapper title="Create Review">
			<FormHeader>
				<T.formTitle />
			</FormHeader>
			<FormText>
				<T.formSubTitle1 />
			</FormText>
			<FormText>
				<PrivacyIcon />
				<T.formSubTitle3 />
			</FormText>
			<CreateReviewForm
				companyName={companyName}
				referredBy={referredBy}
			/>
		</FormPageWrapper>
	);
}
export default withRouter(CreateReviewPage);
