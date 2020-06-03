import React from "react";

import { FormHeader, FormPageWrapper } from "src/components/form-stuff";
import { translations } from "src/translations";

import CreateJobAdForm from "./create-job-ad-form";

const T = translations.createJobAd;

function CreateJobAdPage() {
	return (
		<FormPageWrapper title="Create Job Ad">
			<FormHeader>
				<T.formTitle />
			</FormHeader>
			<CreateJobAdForm />
		</FormPageWrapper>
	);
}

export default CreateJobAdPage;
