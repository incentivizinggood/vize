import React from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter } from "lodash";

import { useCreateCompanyMutation } from "generated/graphql-operations";
import * as analytics from "src/startup/analytics";
import * as schemas from "src/form-schemas";
import * as urlGenerators from "src/pages/url-generators";

import InnerForm from "./create-company-inner-form";

function omitEmptyStrings(x) {
	if (x === "") return undefined;
	if (x instanceof Array)
		return filter(map(x, omitEmptyStrings), y => y !== undefined);
	if (x instanceof Object)
		return omitBy(mapValues(x, omitEmptyStrings), y => y === undefined);
	return x;
}

const initialValues = {
	name: "",
	contactEmail: "",
	contactPhoneNumber: "",
	yearEstablished: "",
	numEmployees: "",
	industry: "",
	locations: [
		{
			city: "",
			address: "",
			industrialHub: "",
		},
	],
	websiteURL: "",
	descriptionOfCompany: "",
};

const schema = yup.object().shape({
	name: schemas.companyName.required(),
	contactEmail: yup
		.string()
		.email()
		.required(),
	contactPhoneNumber: yup.string().max(20),
	yearEstablished: yup.number().integer(),
	numEmployees: yup
		.mixed()
		.oneOf(["1 - 50", "51 - 500", "501 - 2000", "2001 - 5000", "5000+"]),
	industry: yup.string().max(50),
	locations: yup
		.array()
		.of(schemas.locationSchema)
		.required(),
	websiteURL: yup
		.string()
		.url()
		.max(250),
	descriptionOfCompany: yup.string().max(6000),
});

const onSubmit = (createCompany, history, setSubmissionError) => (
	values,
	actions
) =>
	createCompany({
		variables: {
			input: omitEmptyStrings(values),
		},
	})
		.then(({ data }) => {
			console.log("data", data);

			actions.resetForm(initialValues);

			// Track successful Company Created event
			analytics.sendEvent({
				category: "Company",
				action: "Company Created",
			});

			// Go to the newly created company's page.
			history.push(
				urlGenerators.vizeCompanyProfileUrl(
					data.createCompany.company.id
				)
			);
		})
		.catch(errors => {
			console.error(errors);
			console.log(mapValues(errors, x => x));

			setSubmissionError(errors);

			// Errors to display on form fields
			const formErrors = {};

			/*
			if (error.reason === "User not found") {
				formErrors.username = "User not found";
			}
			if (error.reason === "Incorrect password") {
				// TODO: clear the password input on this error
				formErrors.password = "Incorrect password";
			}
			*/

			actions.setErrors(formErrors);
			actions.setSubmitting(false);
		});

export default function CreateCompanyForm() {
	const history = useHistory();
	const [submissionError, setSubmissionError] = React.useState(null);
	const [createCompany] = useCreateCompanyMutation();

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={onSubmit(createCompany, history, setSubmissionError)}
		>
			<InnerForm submissionError={submissionError} />
		</Formik>
	);
}
