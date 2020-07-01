import React from "react";

import { FormHeader, FormPageWrapper } from "src/components/form-stuff";
import { translations } from "src/translations";

import CreateCompanyForm from "./create-company-form";

const T = translations.createCompany;

function CreateCompanyPage() {
	return (
		<FormPageWrapper title="Create Company">
			<FormHeader>
				<T.formTitle />
			</FormHeader>
			<CreateCompanyForm />
		</FormPageWrapper>
	);
}

export default CreateCompanyPage;
