import React from "react";

import {
	FormHeader,
	FormPageWrapper,
} from "/imports/ui/components/form-layout.jsx";

import CreateCompanyForm from "./create-company-form.js";

function CreateCompanyPage() {
	return (
		<FormPageWrapper title="Create Company">
			<FormHeader>Create Company</FormHeader>
			<CreateCompanyForm />
		</FormPageWrapper>
	);
}

export default CreateCompanyPage;
