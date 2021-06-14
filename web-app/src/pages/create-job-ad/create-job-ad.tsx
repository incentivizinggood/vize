import React from "react";

import {
	FormHeader,
	FormPageWrapper,
	PostFormHeaderContainer,
	PostFormMainHeader,
	PostFormSubHeader,
} from "src/components/form-stuff";
import { translations } from "src/translations";

import CreateJobAdForm from "./create-job-ad-form";

const T = translations.createJobAd;

function CreateJobAdPage() {
	return (
		<FormPageWrapper title="Create Job Ad">
			<PostFormHeaderContainer>
				<PostFormMainHeader>
					<T.formTitle />
				</PostFormMainHeader>
				<PostFormSubHeader>
					<T.header1 />
				</PostFormSubHeader>
			</PostFormHeaderContainer>
			<CreateJobAdForm />
		</FormPageWrapper>
	);
}

export default CreateJobAdPage;
