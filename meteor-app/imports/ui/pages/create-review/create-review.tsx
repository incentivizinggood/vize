import React from "react";

import { FormHeader, FormPageWrapper } from "imports/ui/components/form-stuff";
import { translations } from "imports/ui/translations";

import CreateReviewForm from "./create-review-form";

const T = translations.createReview;

function CreateReviewPage() {
	return (
		<FormPageWrapper title="Create Review">
			<FormHeader>
				<T.formTitle />
			</FormHeader>
			<CreateReviewForm />
		</FormPageWrapper>
	);
}

export default CreateReviewPage;
