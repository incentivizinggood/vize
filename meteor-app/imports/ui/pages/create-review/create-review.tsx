import React from "react";
import { withRouter } from "react-router-dom";

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

function CreateReviewPage({ companyName, user }: CreateReviewPageProps) {
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
			<CreateReviewForm companyName={companyName} />
		</FormPageWrapper>
	);
}
export default withRouter(CreateReviewPage);
