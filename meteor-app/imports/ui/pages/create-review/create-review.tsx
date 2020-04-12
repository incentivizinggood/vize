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
}

function CreateReviewPage({ companyName, referrer }: CreateReviewPageProps) {
	return (
		<FormPageWrapper title="Create Review">
			<FormHeader>
				<T.formTitle />
			</FormHeader>
			<FormText>
				<T.formSubTitle1 />
			</FormText>
			<FormText>
				<T.formSubTitle2 />
			</FormText>
			<FormText>
				<PrivacyIcon />
				<T.formSubTitle3 />
			</FormText>
			<CreateReviewForm companyName={companyName} referrer={referrer} />
		</FormPageWrapper>
	);
}
export default withRouter(CreateReviewPage);
