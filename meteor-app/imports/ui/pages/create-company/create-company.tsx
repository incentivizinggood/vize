import React from "react";

import { i18n } from "meteor/universe:i18n";

import { FormHeader, FormPageWrapper } from "imports/ui/components/form-layout";

import CreateCompanyForm from "./create-company-form";

const t = i18n.createTranslator("common.forms.createCompany");
const T = i18n.createComponent(t);

function CreateCompanyPage() {
	return (
		<FormPageWrapper title="Create Company">
			<FormHeader>
				<T>formTitle</T>
			</FormHeader>
			<CreateCompanyForm />
		</FormPageWrapper>
	);
}

export default CreateCompanyPage;
