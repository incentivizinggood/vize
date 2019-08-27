import React from "react";

import { FormHeader, FormPageWrapper } from "imports/ui/components/form-stuff";
import { translations } from "imports/ui/translations";

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
