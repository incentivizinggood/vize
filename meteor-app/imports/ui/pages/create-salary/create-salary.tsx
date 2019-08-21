import React from "react";

import { FormHeader, FormPageWrapper } from "imports/ui/components/form-stuff";
import { translations } from "imports/ui/translations";

import CreateSalaryForm from "./create-salary-form";

const T = translations.createSalary;

interface CreateSalaryPageProps {
	companyName?: string;
}

function CreateSalaryPage({ companyName }: CreateSalaryPageProps) {
	return (
		<FormPageWrapper title="Create Salary">
			<FormHeader>
				<T.formTitle />
			</FormHeader>
			<CreateSalaryForm companyName={companyName} />
		</FormPageWrapper>
	);
}

export default CreateSalaryPage;
