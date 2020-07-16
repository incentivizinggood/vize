import React from "react";
import { withRouter } from "react-router-dom";

import { FormHeader, FormPageWrapper } from "src/components/form-stuff";
import { useTranslations } from "src/translations";

import CreateSalaryForm from "./create-salary-form";

interface CreateSalaryPageProps {
	companyName?: string;
}

function CreateSalaryPage({ companyName, user }: CreateSalaryPageProps) {
	const t = useTranslations().createSalary;

	return (
		<FormPageWrapper title="Create Salary">
			<FormHeader>{t.formTitle}</FormHeader>
			<CreateSalaryForm companyName={companyName} />
		</FormPageWrapper>
	);
}

export default withRouter(CreateSalaryPage);
