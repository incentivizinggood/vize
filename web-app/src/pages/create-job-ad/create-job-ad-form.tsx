import React from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter } from "lodash";
import PopupModal from "src/components/popup-modal";
import RegisterLoginModal from "src/pages/register-login-forms/components/register-login-modal";

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
	jobDescription: "",
	skills: "",
	contractType: "",
	certificatesAndLicences: "",
	minimumEducation: "",
	minimumEnglishProficiency: "",
	shifts: [
		{
			startDay: "",
			endDay: "",
			startTime: "",
			endTime: "",
		},
	],
	locations: [
		{
			city: "",
			address: "",
			industrialHub: "",
		},
	],
	salaryType: "",
	salaryMin: "",
	salaryMax: "",
};

const schema = yup.object().shape({
	jobTitle: yup.string().required("Se requiere el titulo del empleo"),
	jobDescription: yup
		.string()
		.required("Se requiere la descripción del empleo"),
	skills: yup.string().required("Se requiere al menos una habilidad"),
	certificatesAndLicences: yup.string(),
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
	minimumEnglishProficiency: yup
		.string()
		.oneOf([
			"NATIVE_LANGUAGE",
			"FLUENT",
			"CONVERSATIONAL",
			"BASIC",
			"NO_PROFICIENCY",
		])
		.required("Se requiere el nivel educativo minimo"),
	minimumEducation: yup
		.string()
		.oneOf([
			"SOME_HIGH_SCHOOL",
			"HIGH_SCHOOL",
			"SOME_COLLEGE",
			"COLLEGE_DEGREE",
		])
		.required("Se requiere el nivel educativo minimo"),
	shifts: yup.array().required().min(1).of(schemas.shiftSchema),
	locations: yup.array().required().min(1).of(schemas.locationSchema),
	salaryType: yup
		.string()
		.oneOf([
			"YEARLY_SALARY",
			"MONTHLY_SALARY",
			"WEEKLY_SALARY",
			"DAILY_SALARY",
			"HOURLY_WAGE",
		])
		.required("Se requiere el tipo de salario"),
	salaryMin: yup.number().required("Se requiere el salario minimo"),
	salaryMax: yup.number().required("Se requiere el salario maximo"),
});

const onSubmit =
	(createJobAd, history, setSubmissionError, setLoginRegisterModal) =>
	(values, actions) => {
		console.log("vvv", values);

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
				// Error in English: Not Logged In
				if (
					errors.message.includes(
						"Tienes que iniciar una sesión o registrarte"
					)
				) {
					console.log("yeah");
					setLoginRegisterModal(
						<PopupModal isOpen={true} closeModalButtonColor="white">
							<RegisterLoginModal
								errorText="Crea una cuenta o inicia una sesión para postularte a este trabajo"
								userRole="company"
							/>
						</PopupModal>
					);
				} else {
					// Errors to display on form fields
					const formErrors = {};

					// cut out the "GraphQL error: " from error message
					const errorMessage = errors.message.substring(14);
					setSubmissionError(errorMessage);

					actions.setErrors(formErrors);
					actions.setSubmitting(false);
				}
			});
	};

export default function CreateJobAdForm(): JSX.Element {
	const history = useHistory();
	const [submissionError, setSubmissionError] = React.useState(null);
	const [createJobAd] = useCreateJobAdMutation();
	const [loginRegisterModal, setLoginRegisterModal] = React.useState(null);

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={schema}
				onSubmit={onSubmit(
					createJobAd,
					history,
					setSubmissionError,
					setLoginRegisterModal
				)}
			>
				<InnerForm
					schema={schema}
					submissionError={submissionError}
					setSubmissionError={setSubmissionError}
				/>
			</Formik>
			{loginRegisterModal}
		</>
	);
}
