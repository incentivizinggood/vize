import React from "react";

import {
	FormHeader,
	FormPageWrapper,
	PostFormMainHeader,
	PostFormSubHeader,
} from "src/components/form-stuff";
import { translations } from "src/translations";

import CreateJobAdForm from "./create-job-ad-form";

const T = translations.createJobAd;

function CreateJobAdPage() {
	return (
		<FormPageWrapper title="Create Job Ad">
			<PostFormMainHeader>
				<T.formTitle />
			</PostFormMainHeader>
			<PostFormSubHeader>
				<T.header1 />
			</PostFormSubHeader>
			<CreateJobAdForm />
		</FormPageWrapper>
	);
}

export default CreateJobAdPage;
