import React from "react";
import PrivacyIcon from "@material-ui/icons/Security";

import {
	FormText,
	FormHeader,
	FormPageWrapper,
} from "src/components/form-stuff";
import { translations } from "src/translations";

import CreateReviewForm from "./create-review-form";

const T = translations.createReview;

interface CreateReviewPageProps {
	companyName?: string;
	referredBy?: string;
}

export default function CreateReviewPage({
	companyName,
	referredBy,
}: CreateReviewPageProps): JSX.Element {
	return (
		<FormPageWrapper title="Escribir Evaluación">
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
