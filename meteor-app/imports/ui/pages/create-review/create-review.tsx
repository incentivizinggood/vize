import React from "react";

import { FormHeader, FormPageWrapper } from "imports/ui/components/form-stuff";
import { translations } from "imports/ui/translations";

import CreateReviewForm from "./create-review-form";

const T = translations.createReview;

interface CreateReviewPageProps {
	companyName?: string;
}

function CreateReviewPage({ companyName }: CreateReviewPageProps) {
	return (
		<FormPageWrapper title="Create Review">
			<FormHeader>
				<T.formTitle />
			</FormHeader>
			<CreateReviewForm companyName={companyName} />
		</FormPageWrapper>
	);
}

export default CreateReviewPage;
