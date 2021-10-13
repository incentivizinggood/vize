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
		return filter(map(x, omitEmptyStrings), (y) => y !== undefined);
	if (x instanceof Object)
		return omitBy(mapValues(x, omitEmptyStrings), (y) => y === undefined);
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
		.email("El correo electrónico debe ser válido")
		.required(),
	contactPhoneNumber: yup.string().max(20),
	yearEstablished: yup.number().integer(),
	numEmployees: yup
		.mixed()
		.oneOf(["1 - 50", "51 - 500", "501 - 2000", "2001 - 5000", "5000+"]),
	industry: yup.string().max(50),
	locations: yup.array().of(schemas.locationSchema).required(),
	websiteURL: yup.string().url().max(250),
	descriptionOfCompany: yup.string().max(6000),
});

const onSubmit =
	(createCompany, history, setSubmissionError) => (values, actions) =>
		createCompany({
			variables: {
				input: omitEmptyStrings(values),
			},
		})
			.then(({ data }) => {
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
			.catch((errors) => {
				// cut out the "GraphQL error: " from error message
				const errorMessage = errors.message.substring(14);
				setSubmissionError(errorMessage);

				// Errors to display on form fields
				const formErrors = {};

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
			<InnerForm
				schema={schema}
				submissionError={submissionError}
				setSubmissionError={setSubmissionError}
			/>
		</Formik>
	);
}
