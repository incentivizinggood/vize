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

import { useCreateUserProfileMutation } from "generated/graphql-operations";
// import { useCompanyIdFromJobAdIdQuery } from "generated/graphql-operations";

import InnerForm from "./create-user-profile-inner-form";

function omitEmptyStrings(x) {
	if (x === "") return undefined;
	if (x instanceof Array)
		return filter(map(x, omitEmptyStrings), y => y !== undefined);
	if (x instanceof Object)
		return omitBy(mapValues(x, omitEmptyStrings), y => y === undefined);
	return x;
}

const initialValues = {
	fullName: "",
	phoneNumber: "",
	workExperience: [
		{
			jobTitle: "",
			companyName: "",
			city: "",
			startDateMonth: "",
			startDateYear: "",
			endDateMonth: "",
			endDateYear: "",
			experienceDescription: "",
		},
	],
	skills: "",
	certificatesAndLicenses: "",
	highestLevelOfEducation: "",
	availability: "",
	availabilityComments: "",
	longTermGoal: "",
};

const schema = yup.object().shape({
	fullName: yup.string().required(),
	phoneNumber: yup.string().required(),
	city: yup.string().required(),
	neighborhood: yup.string().required(),
	address: yup.string().required(),
	workExperiences: yup.array().of(workExperienceSchema),
	skills: yup.array().of(yup.string()),
	certificatesAndLicences: yup.array().of(yup.string()),
	highestLevelOfEducation: yup
		.string()
		.oneOf([
			"SOME_HIGH_SCOOL",
			"HIGH_SCHOOL",
			"SOME_COLLEGE",
			"COLLEGE_DEGREE",
		])
		.required(),
	availability: yup
		.array()
		.required()
		.min(1)
		.of(yup.string()),
	availabilityComments: yup.string(),
	longTermGoal: yup.string(),
});

const onSubmit = (
	CreateUserProfile,
	history,
	setSubmissionError,
	setLoginRegisterModal
) => (values, actions) =>
	CreateUserProfile({
		variables: {
			input: omitEmptyStrings(values),
		},
	})
		.then(({ data }) => {
			actions.resetForm(initialValues);
			console.log("worked");

			// Track successful job application submitted event
			analytics.sendEvent({
				category: "User",
				action: "Job Application Submitted",
				label: values.jobAdId,
			});

			history.push(`/`);
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
		});

// export interface CreateUserProfileFormProps {
// 	jobAdId: string;
// }

export default function CreateUserProfileForm() {
	// const history = useHistory();
	const [submissionError, setSubmissionError] = React.useState(null);
	let [loginRegisterModal, setLoginRegisterModal] = React.useState(null);
	const [CreateUserProfile] = useCreateUserProfileMutation();
	// const { data } = useCompanyIdFromJobAdIdQuery({
	// 	variables: { jobAdId },
	// });
	// const user = useUser();

	// if (user) {
	// 	loginRegisterModal = null;
	// }

	return (
		<>
			<Formik
				initialValues={initialValues}
				validationSchema={schema}
				onSubmit={onSubmit(
					CreateUserProfile,
					history,
					setSubmissionError,
					setLoginRegisterModal
				)}
			>
				<InnerForm submissionError={submissionError} />
			</Formik>
			{/* {loginRegisterModal} */}
		</>
	);
}
