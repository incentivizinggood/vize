import React from "react";

import { FormHeader, FormPageWrapper } from "imports/ui/components/form-layout";
import { translations } from "imports/ui/translations";

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
