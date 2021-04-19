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

	let availabilityArray = [];
	if (values.morning) availabilityArray.push("MORNING_SHIFT");
	if (values.afternoon) availabilityArray.push("AFTERNOON_SHIFT");
	if (values.night) availabilityArray.push("NIGHT_SHIFT");
	values["availability"] = availabilityArray;

	const skillsArray = values.skills.includes(",") ? values.skills.split(",") : [values.skills];
	const certificatesAndLicencesArray = values.certificatesAndLicences.includes(",") ? values.certificatesAndLicences.split(",") : [values.certificatesAndLicences];
	values.skills = skillsArray;
	values.certificatesAndLicences = certificatesAndLicencesArray;
	console.log('skills', skillsArray);
	delete values["morning"];
	delete values["afternoon"];
	delete values["night"];

	values.workExperiences?.forEach(function(_: any, index: number) {
		delete values.workExperiences[index].iCurrentlyWorkHere;

		const startDateYear = values.workExperiences[index].startDateYear;
		const startDateMonth = values.workExperiences[index].startDateMonth;
		const startDate = new Date(startDateYear, startDateMonth, 1);
		values.workExperiences[index].startDate = startDate;
		delete values.workExperiences[index].startDateMonth;
		delete values.workExperiences[index].startDateYear;

		const endDateYear = values.workExperiences[index].endDateYear;
		const endDateMonth = values.workExperiences[index].endDateMonth;
		const endDate = new Date(endDateYear, endDateMonth, 1);
		values.workExperiences[index].endDate = endDate;
		delete values.workExperiences[index].endDateMonth;
		delete values.workExperiences[index].endDateYear;
	});
	const updateOrCreateUserProfile = userProfile ? updateUserProfile : createUserProfile;

	console.log("through", values);
	return updateOrCreateUserProfile({
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
				 
			<InnerForm submissionError={submissionError} profileExists={userProfile != null}/>

           
			</Formik>
			{/* {loginRegisterModal} */}
		</>
	);
}
