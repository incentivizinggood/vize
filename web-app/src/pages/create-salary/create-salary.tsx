import React from "react";

import { FormHeader, FormPageWrapper } from "src/components/form-stuff";
import { translations } from "src/translations";

import CreateSalaryForm from "./create-salary-form";

const T = translations.createSalary;

interface CreateSalaryPageProps {
	companyName?: string;
}

export default function CreateSalaryPage({
	companyName,
}: CreateSalaryPageProps): JSX.Element {
	return (
		<FormPageWrapper title="Create Salary">
			<FormHeader>
				<T.formTitle />
			</FormHeader>
			<CreateSalaryForm companyName={companyName} />
		</FormPageWrapper>
	);
}
