import React from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter, merge } from "lodash";
import * as analytics from "src/startup/analytics";
import PopupModal from "src/components/popup-modal";
import RegisterLoginModal from "src/components/register-login-modal";
import { useUser } from "src/hoc/user";
import { workExperienceSchema } from "src/form-schemas";
import Spinner from "src/components/Spinner";

import { useCreateUserProfileMutation } from "generated/graphql-operations";
import { useGetUserProfileDataQuery } from "generated/graphql-operations";

import InnerForm from "./user-profile-inner-form";

function omitEmptyStrings(x) {
	if (x === "") return undefined;
	if (x instanceof Array)
		return filter(map(x, omitEmptyStrings), y => y !== undefined);
	if (x instanceof Object)
		return omitBy(mapValues(x, omitEmptyStrings), y => y === undefined);
	return x;
}

function formatUserProfileData(userProfile: any) {
	delete userProfile["companyId"];
	delete userProfile["__typename"];
	console.log('userr', userProfile);


	if(userProfile["availability"]) {
		userProfile["availability"].includes("MORNING_SHIFT") ? userProfile.morning = true : userProfile.morning = false;
		userProfile["availability"].includes("AFTERNOON_SHIFT") ? userProfile.afternoon = true : userProfile.afternoon = false;
		userProfile["availability"].includes("NIGHT_SHIFT") ? userProfile.night = true : userProfile.night = false;
		delete userProfile["availability"];
	}

	userProfile.coverLetter = "";
	//userProfile.skills = ["Super Skill"];

	userProfile.workExperiences?.forEach(function(_: any, index: number) {
		userProfile.workExperiences[index].iCurrentlyWorkHere = false;
		delete userProfile.workExperiences[index].__typename;

		const startDate = new Date(userProfile.workExperiences[index].startDate);
		const endDate = new Date(userProfile.workExperiences[index].endDate);
		
		userProfile.workExperiences[index].startDateMonth = startDate.getMonth();
		userProfile.workExperiences[index].startDateYear = startDate.getFullYear();
		userProfile.workExperiences[index].endDateMonth = endDate.getMonth();
		userProfile.workExperiences[index].endDateYear = endDate.getFullYear();
	});

	return userProfile;
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
			startDateMonth: "",
			startDateYear: "",
			endDateMonth: "",
			endDateYear: "",
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
	createUserProfile,
	history,
	setSubmissionError,
	setLoginRegisterModal
) => (values, actions) => {
	let availabilityArray = [];
	if (values.morning) availabilityArray.push("MORNING_SHIFT");
	if (values.afternoon) availabilityArray.push("AFTERNOON_SHIFT");
	if (values.night) availabilityArray.push("NIGHT_SHIFT");
	values["availability"] = availabilityArray;

	const skillsArray = values.skills.split(",");
	const certificatesAndLicencesArray = values.certificatesAndLicences.split(",");
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

	console.log("through", values);
	return createUserProfile({
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

export default function CreateUserProfileForm() {
	const history = useHistory();
	const user = useUser();

	const [submissionError, setSubmissionError] = React.useState(null);
	let [loginRegisterModal, setLoginRegisterModal] = React.useState(null);
	const [createUserProfile] = useCreateUserProfileMutation();

	let { data: userProfileData, loading, error } = useGetUserProfileDataQuery({
		variables: { userId: user ? user.id : "0" },
	});

	if (loading) return <Spinner />;

	console.log('userProfile', userProfileData);
	console.log('userProfileload', loading);
	console.log('userProfileerror', error);

	// If user has a user profile, fill in the form fields with the user profile data
	if(userProfileData?.userProfile) {
		initialValues = formatUserProfileData(userProfileData.userProfile);
	}
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
					createUserProfile,
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