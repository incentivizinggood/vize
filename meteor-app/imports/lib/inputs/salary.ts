import * as yup from "yup";

import LocationInput from "./location";

type CreateSalaryInput = {
	companyName: string;
	location: LocationInput;
	jobTitle: string;
	incomeType: string;
	incomeAmount: number;
	gender?: string;
};

namespace CreateSalaryInput {
	export const schema = yup.object({
		companyName: yup.string().required(),
		location: LocationInput.schema,
		jobTitle: yup.string().required(),
		incomeType: yup
			.string()
			.oneOf([
				"Yearly Salary",
				"Monthly Salary",
				"Weekly Salary",
				"Hourly Wage",
			])
			.required(),
		incomeAmount: yup
			.number()
			.min(0)
			.required(),
		gender: yup.string().oneOf(["Male", "Female"]),
	});
}

export default CreateSalaryInput;
