import React from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter } from "lodash";

import { useCreateJobAdMutation } from "generated/graphql-operations";
import * as urlGenerators from "src/pages/url-generators";
import * as analytics from "src/startup/analytics";
import * as schemas from "src/form-schemas";

import InnerForm from "./create-job-ad-inner-form";

function omitEmptyStrings(x) {
	if (x === "") return undefined;
	if (x instanceof Array)
		return filter(map(x, omitEmptyStrings), (y) => y !== undefined);
	if (x instanceof Object)
		return omitBy(mapValues(x, omitEmptyStrings), (y) => y === undefined);
	return x;
}

const initialValues = {
	jobTitle: "",
	locations: [
		{
			city: "",
			address: "",
			industrialHub: "",
		},
	],
	shifts: [
		{
			startDay: "",
			endDay: "",
			startTime: "",
			endTime: "",
		},
	],
	minimumLevel: "",
	minimumLanguage: "",
	// salaryMin: "",
	// salaryMax: "",
	jobSchedule: [
		{
			startDay: 1,
			endDay: 5,
			startTime: "08:00",
			endTime: "18:00",
		},
	],
	salaryType: "",
	contractType: "",
	jobDescription: "",
	responsibilities: "",
	qualifications: "",
};

const schema = yup.object().shape({
	jobTitle: yup.string().required("Se requiere el titulo de empleo"),
	locations: yup.array().of(schemas.locationSchema).required(),
	minimuLanguage: yup.array().of(schemas.locationSchema).required(),
	salaryMin: yup.number().required("Se requiere el salario minimo"),
	salaryMax: yup.number().required("Se requiere el salario maximo"),
	startTime: yup.string().matches(/([0-1][0-9]|2[0-3]):[0-5][0-9]/),
	endTime: yup.string().matches(/([0-1][0-9]|2[0-3]):[0-5][0-9]/),
	startDay: yup
		.number()
		.integer()
		.min(0)
		.max(6)
		.required("Se requiere el día de inicio del turno"),
	endDay: yup
		.number()
		.integer()
		.min(0)
		.max(6)
		.required("Se requiere el día final del turno"),
	salaryType: yup
		.string()
		.oneOf([
			"YEARLY_SALARY",
			"MONTHLY_SALARY",
			"WEEKLY_SALARY",
			"DAILY_SALARY",
			"HOURLY_WAGE",
		])
		.required("Se requiere el tipo de ingreso"),
	contractType: yup
		.mixed()
		.oneOf([
			"FULL_TIME",
			"PART_TIME",
			"INTERNSHIP",
			"TEMPORARY",
			"CONTRACTOR",
		])
		.required("Se requiere el tipo de contrato"),
	jobDescription: yup
		.string()
		.required("Se requiere la descripción del trabajo"),
	responsibilities: yup
		.string()
		.required("Se requieren las responabilidades"),
	qualifications: yup.string().required("Se requieren las calificaciones"),
});

const onSubmit =
	(createJobAd, history, setSubmissionError) => (values, actions) =>
		createJobAd({
			variables: {
				input: omitEmptyStrings(values),
			},
		})
			.then(({ data }) => {
				actions.resetForm(initialValues);

				// Track successful job posted event
				analytics.sendEvent({
					category: "Company",
					action: "Job Posted",
				});

				// Go to the company profile page for this jobAd's company.
				history.push(
					urlGenerators.vizeCompanyProfileUrl(
						data.createJobAd.jobAd.company.id
					)
				);
			})
			.catch((errors) => {
				// Errors to display on form fields
				const formErrors = {};

				// cut out the "GraphQL error: " from error message
				const errorMessage = errors.message.substring(14);
				setSubmissionError(errorMessage);

				actions.setErrors(formErrors);
				actions.setSubmitting(false);
			});

export default function CreateJobAdForm() {
	const history = useHistory();
	const [submissionError, setSubmissionError] = React.useState(null);
	const [createJobAd] = useCreateJobAdMutation();

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={schema}
			onSubmit={onSubmit(createJobAd, history, setSubmissionError)}
		>
			<InnerForm submissionError={submissionError} />
		</Formik>
	);
}
