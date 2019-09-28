import React from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter, merge } from "lodash";

import { CreateSalaryComponent as MutationCreateSalary } from "imports/gen/graphql-operations";
import * as schemas from "imports/ui/form-schemas";

import InnerForm from "./create-salary-inner-form";

function omitEmptyStrings(x) {
	if (x === "") return undefined;
	if (x instanceof Array)
		return filter(map(x, omitEmptyStrings), y => y !== undefined);
	if (x instanceof Object)
		return omitBy(mapValues(x, omitEmptyStrings), y => y === undefined);
	return x;
}

const initialValues = {
	companyName: "",
	location: {
		city: "",
		address: " ",
		industrialHub: "",
	},
	jobTitle: "",
	incomeType: "",
	incomeAmount: "",
	gender: "",
};

const schema = yup.object().shape({
	companyName: schemas.companyName.required(),
	location: yup
		.object()
		.shape({
			city: yup
				.string()
				.max(300)
				.required(),
			address: yup
				.string()
				.max(300)
				.required(),
			industrialHub: yup.string().max(300),
		})
		.required(),
	jobTitle: yup.string().required(),
	incomeType: yup
		.string()
		.oneOf(["YEARLY_SALARY", "MONTHLY_SALARY", "HOURLY_WAGE"])
		.required(),
	incomeAmount: yup
		.number()
		.min(0)
		.required(),
	gender: yup.string().oneOf(["MALE", "FEMALE"]),
});

const onSubmit = (createSalary, history, setSubmissionError) => (
	values,
	actions
) =>
	createSalary({
		variables: {
			input: omitEmptyStrings(values),
		},
	})
		.then(({ data }) => {
			console.log("data", data);

			actions.resetForm(initialValues);

			history.push("/");
		})
		.catch(errors => {
			console.error(errors);
			console.log(mapValues(errors, x => x));

			setSubmissionError(errors);

			// Errors to display on form fields
			const formErrors = {};

			// TODO: better error displaying.

			actions.setErrors(formErrors);
			actions.setSubmitting(false);
		});

const CreateSalaryForm = ({ history, companyName }) => {
	const [submissionError, setSubmissionError] = React.useState(null);
	return (
		<MutationCreateSalary>
			{createSalary => (
				<Formik
					initialValues={merge(initialValues, {
						companyName,
					})}
					validationSchema={schema}
					onSubmit={onSubmit(
						createSalary,
						history,
						setSubmissionError
					)}
				>
					<InnerForm submissionError={submissionError} />
				</Formik>
			)}
		</MutationCreateSalary>
	);
};

export default withRouter(CreateSalaryForm);
