import React from "react";
import { withRouter } from "react-router-dom";

import { FormHeader, FormPageWrapper } from "src/components/form-stuff";
import { translations } from "src/translations";

import CreateSalaryForm from "./create-salary-form";

const T = translations.createSalary;

interface CreateSalaryPageProps {
	companyName?: string;
}

function CreateSalaryPage({ companyName, user }: CreateSalaryPageProps) {
	return (
		<FormPageWrapper title="Create Salary">
			<FormHeader>
				<T.formTitle />
			</FormHeader>
			<CreateSalaryForm companyName={companyName} />
		</FormPageWrapper>
	);
}

export default withRouter(CreateSalaryPage);
