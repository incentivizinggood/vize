import React from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter, merge } from "lodash";
import * as analytics from "src/startup/analytics";
import PopupModal from "src/components/popup-modal";
import RegisterLoginModal from "src/components/register-login-modal";
import { useUser } from "src/hoc/user";
import * as urlGenerators from "src/pages/url-generators";
import { workExperienceSchema } from "src/form-schemas";

import { useApplyToJobAdMutation } from "generated/graphql-operations";
import { useGetJobTitleAndCompanyIdQuery } from "generated/graphql-operations";

import InnerForm from "./apply-to-job-ad-inner-form";

function omitEmptyStrings(x) {
	if (x === "") return undefined;
	if (x instanceof Array)
		return filter(map(x, omitEmptyStrings), y => y !== undefined);
	if (x instanceof Object)
		return omitBy(mapValues(x, omitEmptyStrings), y => y === undefined);
	return x;
}

const initialValues = {
	jobAdId: "",
	fullName: "",
	email: "",
	phoneNumber: "",
	city: "",
	neighborhood: "",
	workExperiences: [
		{
			jobTitle: "",
			companyName: "",
			city: "",
			startDateMonth: "",
			startDateYear: "",
			endDateMonth: "",
			endDateYear: "",
			iCurrentlyWorkHere: false,
			experienceDescription: "",
		},
	],
	skills: ["skill1"],
	certificatesAndLicences: ["certif"],
	highestLevelOfEducation: "",
	morning: false,
	afternoon: false,
	night: false,
	availabilityComments: "",
	coverLetter: "",
};

const schema = yup.object().shape({
	jobAdId: yup.string().required(),
	fullName: yup.string().required(),
	email: yup
		.string()
		.email()
		.required(),
	phoneNumber: yup.string().required(),
	city: yup.string().required(),
	neighborhood: yup.string(),
	workExperiences: yup.array().of(workExperienceSchema),
	skills: yup.array().of(yup.string()),
	certificatesAndLicences: yup.array().of(yup.string()),
	highestLevelOfEducation: yup
		.string()
		.oneOf([
			"SOME_HIGH_SCHOOL",
			"HIGH_SCHOOL",
			"SOME_COLLEGE",
			"COLLEGE_DEGREE",
		])
		.required("test"),
	morning: yup.boolean(),
	afternoon: yup.boolean(),
	night: yup.boolean(),
	availabilityComments: yup.string(),
	coverLetter: yup.string(),
});

const onSubmit = (
	applyToJobAd,
	history,
	setSubmissionError,
	setLoginRegisterModal,
) => (values, actions) => {
	let availabilityArray = [];
	if (values.morning) availabilityArray.push("MORNING_SHIFT");
	if (values.afternoon) availabilityArray.push("AFTERNOON_SHIFT");
	if (values.night) availabilityArray.push("NIGHT_SHIFT");
	delete values["morning"];
	delete values["afternoon"];
	delete values["night"];
	delete values.workExperiences[0]["iCurrentlyWorkHere"];

	values["availability"] = availabilityArray;
	
	return applyToJobAd({
		variables: {
			input: omitEmptyStrings(values),
		},
	})
		.then(({ data }) => {
			actions.resetForm(initialValues);

			// Track successful job application submitted event
			analytics.sendEvent({
				category: "User",
				action: "Job Application Submitted",
				label: values.jobAdId,
			});

			history.push(`/${urlGenerators.queryRoutes.jobApplicationSubmitted}?id=${values.companyId}`);
		})
		.catch(errors => {
			// Error in English: Not Logged In
			if (
				errors.message.includes(
					"Tienes que iniciar una sesión o registrarte"
				)
			) {
				setLoginRegisterModal(
					<PopupModal isOpen={true}>
						<RegisterLoginModal errorText="Crea una cuenta o inicia una sesión para postularte a este trabajo" />
					</PopupModal>
				);
			} else {
				// cut out the "GraphQL error: " from error message
				const errorMessage = errors.message.substring(14);
				setSubmissionError(errorMessage);

				// Errors to display on form fields
				const formErrors = {};

				actions.setErrors(formErrors);
				actions.setSubmitting(false);
			}
		})
	};

export interface ApplyToJobAdFormProps {
	jobAdId: string;
}

export default function ApplyToJobAdForm({ jobAdId }: ApplyToJobAdFormProps) {
	const history = useHistory();
	const [submissionError, setSubmissionError] = React.useState(null);
	let [loginRegisterModal, setLoginRegisterModal] = React.useState(null);
	const [applyToJobAd] = useApplyToJobAdMutation();
	const { data } = useGetJobTitleAndCompanyIdQuery({
		variables: { jobAdId },
	});
	const user = useUser();

	const jobTitle = data?.jobAd?.jobTitle;
	const companyId = data?.jobAd?.company.id;
	const numReviews = data?.jobAd?.company.numReviews;

	if (user) {
		loginRegisterModal = null;
	}

	return (
		<>
			<Formik
				initialValues={merge(initialValues, {
					jobAdId,
					jobTitle,
					companyId,
					numReviews,
				})}
				validationSchema={schema}
				onSubmit={onSubmit(
					applyToJobAd,
					history,
					setSubmissionError,
					setLoginRegisterModal
				)}
			>
				<InnerForm submissionError={submissionError} />
			</Formik>
			{loginRegisterModal}
		</>
	);
}
