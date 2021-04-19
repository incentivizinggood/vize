import React from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter, merge } from "lodash";
import * as analytics from "src/startup/analytics";
import PopupModal from "src/components/popup-modal";
import RegisterLoginModal from "src/components/register-login-modal";
import { workExperienceSchema } from "src/form-schemas";


import { useCreateUserProfileMutation } from "generated/graphql-operations";
import { useUpdateUserProfileMutation } from "generated/graphql-operations";

import InnerForm from "./user-profile-inner-form";

function omitEmptyStrings(x) {
	if (x === "") return undefined;
	if (x instanceof Array)
		return filter(map(x, omitEmptyStrings), y => y !== undefined);
	if (x instanceof Object)
		return omitBy(mapValues(x, omitEmptyStrings), y => y === undefined);
	return x;
}

function formatInputData(inputValues: any) {
console.log('inp', inputValues);
	let availabilityArray = [];
	if (inputValues.morning) availabilityArray.push("MORNING_SHIFT");
	if (inputValues.afternoon) availabilityArray.push("AFTERNOON_SHIFT");
	if (inputValues.night) availabilityArray.push("NIGHT_SHIFT");
	inputValues["availability"] = availabilityArray;

	const skillsArray = inputValues.skills.includes(",") ? inputValues.skills.split(",") : [inputValues.skills];
	const certificatesAndLicencesArray = inputValues.certificatesAndLicences.includes(",") ? inputValues.certificatesAndLicences.split(",") : [inputValues.certificatesAndLicences];
	inputValues.skills = skillsArray;
	inputValues.certificatesAndLicences = certificatesAndLicencesArray;
	console.log('skills', skillsArray);
	delete inputValues["morning"];
	delete inputValues["afternoon"];
	delete inputValues["night"];

	inputValues.workExperiences?.forEach(function(_: any, index: number) {
		delete inputValues.workExperiences[index].iCurrentlyWorkHere;

		const startDateYear = inputValues.workExperiences[index].startDateYear;
		const startDateMonth = inputValues.workExperiences[index].startDateMonth;
		const startDate = new Date(startDateYear, startDateMonth, 1).toISOString();
		inputValues.workExperiences[index].startDate = startDate;
		delete inputValues.workExperiences[index].startDateMonth;
		delete inputValues.workExperiences[index].startDateYear;

		const endDateYear = inputValues.workExperiences[index].endDateYear;
		const endDateMonth = inputValues.workExperiences[index].endDateMonth;
		const endDate = new Date(endDateYear, endDateMonth, 1).toISOString();
		inputValues.workExperiences[index].endDate = endDate;
		delete inputValues.workExperiences[index].endDateMonth;
		delete inputValues.workExperiences[index].endDateYear;
	});

	return inputValues;
}

let initialValues = {
	fullName: "",
	phoneNumber: "",
	city: "",
	neighborhood: "",
	workExperiences: [
		{
			jobTitle: "",
			companyName: "",
			city: "",
			startDateMonth: 2,
			startDateYear: 2008,
			endDateMonth: 3,
			endDateYear: 2020,
			iCurrentlyWorkHere: false,
			experienceDescription: "",
		},
	],
	skills: "",
	certificatesAndLicences: "",
	highestLevelOfEducation: "",
	morning: false,
	afternoon: false,
	night: false,
	availabilityComments: "",
	longTermGoal: "",
};

const schema = yup.object().shape({
	fullName: yup.string().required("name required"),
	phoneNumber: yup.string().required(),
	city: yup.string().required(),
	neighborhood: yup.string(),
	workExperiences: yup.array().of(workExperienceSchema),
	skills: yup.string().required(),
	certificatesAndLicences: yup
		.string(),
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
	availabilityComments: yup.string().nullable(),
	longTermGoal: yup.string(),
});

const onSubmit = (
	userProfile,
	createUserProfile,
	updateUserProfile,
	history,
	setSubmissionError,
	setLoginRegisterModal
) => (values, actions) => {
	console.log("through BEFORE", values);

	let formattedValues = formatInputData(values);
	const updateOrCreateUserProfile = userProfile ? updateUserProfile : createUserProfile;

	console.log("through", formattedValues);
	return updateOrCreateUserProfile({
		variables: {
			input: omitEmptyStrings(formattedValues),
		},
	})
		.then(({ data }) => {
			actions.resetForm(initialValues);
			console.log("worked");

			// Track successful job application submitted event
			analytics.sendEvent({
				category: "User",
				action: "Job Application Submitted",
				label: formattedValues.jobAdId,
			});

			history.push(`/`);
		})
		.catch(errors => {
			// Error in English: Not Logged In
			console.log("superbad", errors);
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
};

// export interface CreateUserProfileFormProps {
// 	jobAdId: string;
// }

interface UserProfileFormProps {
	userProfile?: any;
}

export default function CreateUserProfileForm({ userProfile }: UserProfileFormProps) {
	const history = useHistory();

	const [submissionError, setSubmissionError] = React.useState(null);
	let [loginRegisterModal, setLoginRegisterModal] = React.useState(null);
	const [createUserProfile] = useCreateUserProfileMutation();
	const [updateUserProfile] = useUpdateUserProfileMutation();

	if (userProfile) {
		initialValues = userProfile;
	}
	console.log('up user', userProfile);	
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
					userProfile,
					createUserProfile,
					updateUserProfile,
					history,
					setSubmissionError,
					setLoginRegisterModal
				)}
			>
				 
			<InnerForm submissionError={submissionError} profileExists={userProfile != null} initialValues={initialValues} />

           
			</Formik>
			{/* {loginRegisterModal} */}
		</>
	);
}
