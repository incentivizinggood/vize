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
import Spinner from "src/components/Spinner";
import { JobApplicationSubmittedInnerContent } from "src/pages/job-application-submitted";

import { useApplyToJobAdMutation } from "generated/graphql-operations";
import { useGetJobTitleAndCompanyIdQuery } from "generated/graphql-operations";
import { useGetUserProfileDataQuery } from "generated/graphql-operations";
import { useCreateUserProfileMutation } from "generated/graphql-operations";
import { useUpdateUserProfileMutation } from "generated/graphql-operations";

import InnerForm from "./apply-to-job-ad-inner-form";

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
	delete userProfile["longTermProfessionalGoal"];

	if(userProfile["availability"]) {
		userProfile["availability"].includes("MORNING_SHIFT") ? userProfile.morning = true : userProfile.morning = false;
		userProfile["availability"].includes("AFTERNOON_SHIFT") ? userProfile.afternoon = true : userProfile.afternoon = false;
		userProfile["availability"].includes("NIGHT_SHIFT") ? userProfile.night = true : userProfile.night = false;
		delete userProfile["availability"];
	}

	userProfile.coverLetter = "";
	userProfile.saveDataToProfile = true;
	userProfile.skills = Array.isArray(userProfile.skills) ? userProfile.skills.join(", ") : userProfile.skills;
	userProfile.certificatesAndLicences = Array.isArray(userProfile.certificatesAndLicences) ? userProfile.certificatesAndLicences.join(", ") : userProfile.certificatesAndLicences;

	userProfile.workExperiences?.forEach(function(_: any, index: number) {
		delete userProfile.workExperiences[index].__typename;

		const startDate = new Date(userProfile.workExperiences[index].startDate);
		userProfile.workExperiences[index].startDateMonth = startDate.getMonth();
		userProfile.workExperiences[index].startDateYear = startDate.getFullYear();

		if (userProfile.workExperiences[index].endDate) {
			userProfile.workExperiences[index].iCurrentlyWorkHere = false;
			const endDate = new Date(userProfile.workExperiences[index].endDate);
			userProfile.workExperiences[index].endDateMonth = endDate.getMonth();
			userProfile.workExperiences[index].endDateYear = endDate.getFullYear();
		} else {
			userProfile.workExperiences[index].iCurrentlyWorkHere = true;
		}
	});

	return userProfile;
}

function onSubmitErrorChecking(inputValues: any) {
	// End date is not required when the "I Currently Work Here" box is checked so manual checking needs to be done when the
	// "I Currently Work Here" box is not checked
	let endDateNotInputted = false;
	inputValues.workExperiences?.map(function(_: any, index: number) {
		if ((inputValues.workExperiences[index].endDateMonth == "" || inputValues.workExperiences[index].endDateYear == "") && inputValues.workExperiences[index].iCurrentlyWorkHere === false)
			endDateNotInputted = true;
	});
	if(endDateNotInputted) return "Se requiere la fecha de finalización para la experencia laboral";

	// Check if at least one value has been selected for the availability
	if (!inputValues.morning && !inputValues.afternoon && !inputValues.night) 
		return "Se requiere tu disponibilidad";
	if (inputValues.englishProficiency == "") 
		return "Se requiere la seleccion que describa tu dominio del ingles";
	if (inputValues.highestLevelOfEducation == "") 
		return "Se requiere la seleccion que describa el nivel educativo más alto";
	if (!inputValues.workExperiences) 
		return "Se requiere por lo menos una experiencia laboral";

	return null;
}

function formatInputData(inputValues: any) {
	if (inputValues["id"]) delete inputValues["id"];

	let availabilityArray = [];
	if (inputValues.morning) availabilityArray.push("MORNING_SHIFT");
	if (inputValues.afternoon) availabilityArray.push("AFTERNOON_SHIFT");
	if (inputValues.night) availabilityArray.push("NIGHT_SHIFT");
	inputValues["availability"] = availabilityArray;

	inputValues.phoneNumber = inputValues.phoneNumber.replace('-','');
	inputValues.phoneNumber = inputValues.phoneNumber.replace('(','');
	inputValues.phoneNumber = inputValues.phoneNumber.replace(')','');
	inputValues.phoneNumber = inputValues.phoneNumber.replace(' ','');
	
	const skillsArray = inputValues.skills.includes(",") ? inputValues.skills.split(",") : [inputValues.skills];
	const certificatesAndLicencesArray = inputValues.certificatesAndLicences.includes(",") ? inputValues.certificatesAndLicences.split(",") : [inputValues.certificatesAndLicences];
	
	// Clean up the white space from the input
	skillsArray.forEach(function(_: any, index: number) {
		skillsArray[index] = skillsArray[index].trim();
	});
	certificatesAndLicencesArray.forEach(function(_: any, index: number) {
		certificatesAndLicencesArray[index] = certificatesAndLicencesArray[index].trim();
	});
	inputValues.skills = skillsArray;
	inputValues.certificatesAndLicences = certificatesAndLicencesArray;

	delete inputValues["morning"];
	delete inputValues["afternoon"];
	delete inputValues["night"];

	inputValues.workExperiences?.forEach(function(_: any, index: number) {
		const startDateYear = inputValues.workExperiences[index].startDateYear;
		const startDateMonth = inputValues.workExperiences[index].startDateMonth;
		const startDate = new Date(startDateYear, startDateMonth, 1).toISOString();
		inputValues.workExperiences[index].startDate = startDate;
		delete inputValues.workExperiences[index].startDateMonth;
		delete inputValues.workExperiences[index].startDateYear;

		let endDate: String | null  = null;
		if (!inputValues.workExperiences[index].iCurrentlyWorkHere) {
			const endDateYear = inputValues.workExperiences[index].endDateYear;
			const endDateMonth = inputValues.workExperiences[index].endDateMonth;
			endDate = new Date(endDateYear, endDateMonth, 1).toISOString();
		}
		
		inputValues.workExperiences[index].endDate = endDate;
		delete inputValues.workExperiences[index].endDateMonth;
		delete inputValues.workExperiences[index].endDateYear;
		delete inputValues.workExperiences[index].iCurrentlyWorkHere;
	});
	delete inputValues.saveDataToProfile;
	return inputValues;
}

let initialValues = {
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
	skills: "",
	certificatesAndLicences: "",
	englishProficiency: "",
	highestLevelOfEducation: "",
	morning: false,
	afternoon: false,
	night: false,
	availabilityComments: "",
	coverLetter: "",
	saveDataToProfile: true,
};

const schema = yup.object().shape({
	jobAdId: yup.string().required(),	
	fullName: yup.string().required("Se requiere el nombre completo"),
	email: yup
		.string()
		.email()
		.required("Se requiere el correo electrónico"),
	phoneNumber: yup.string().required("Se requiere el numero de telefono"),
	city: yup.string().required("Se requiere la ciudad"),
	neighborhood: yup.string(),
	workExperiences: yup.array().of(workExperienceSchema),
	skills: yup.string().required("Se requiere al menos una habilidad"),
	certificatesAndLicences: yup
		.string(),
	englishProficiency: yup
		.string()
		.oneOf([
			"NATIVE_LANGUAGE",
			"FLUENT",
			"CONVERSATIONAL",
			"BASIC",
			"NO_PROFICIENCY",
		]),
	highestLevelOfEducation: yup
		.string()
		.oneOf([
			"SOME_HIGH_SCHOOL",
			"HIGH_SCHOOL",
			"SOME_COLLEGE",
			"COLLEGE_DEGREE",
		]),
	morning: yup.boolean(),
	afternoon: yup.boolean(),
	night: yup.boolean(),
	availabilityComments: yup.string().nullable(),
	coverLetter: yup.string(),
	saveDataToProfile: yup.boolean(),
});

const onSubmit = (
	userProfile,
	createUserProfile,
	updateUserProfile,
	applyToJobAd,
	history,
	setSubmissionError,
	setLoginRegisterModal,
	setJobApplicationFormContent,
	modalIsOpen,
) => (values, actions) => {
	const jobApplicationFormValues = JSON.parse(JSON.stringify(values));
	const userProfileFormValues = JSON.parse(JSON.stringify(values));

	const updateOrCreateUserProfile = userProfile ? updateUserProfile : createUserProfile;
	const willSaveDataToProfile = values.saveDataToProfile;

	const errorMessage = onSubmitErrorChecking(userProfileFormValues);
	if (errorMessage) {
		setSubmissionError(errorMessage);
		return null;
	}

	let jobApplicationFormFormattedValues = formatInputData(jobApplicationFormValues);
	
	return applyToJobAd({
		variables: {
			input: omitEmptyStrings(jobApplicationFormFormattedValues),
		},
	})
		.then(({ data }) => {
			actions.resetForm(initialValues);

			// Call the mutation for updating/creating the user profile after apply to job mutation has succeeded
			if (willSaveDataToProfile) {
				delete userProfileFormValues.coverLetter;
				delete userProfileFormValues.email;
				delete userProfileFormValues.companyId;
				delete userProfileFormValues.numReviews;
				delete userProfileFormValues.jobTitle;
				delete userProfileFormValues.jobAdId;
				let userProfileFormFormattedValues = formatInputData(userProfileFormValues);

				updateOrCreateUserProfile({
					variables: {
						input: omitEmptyStrings(userProfileFormFormattedValues),
					},
				})
				.then(({ data }) => {
					console.log("Updated/Created User Profile");
				});
			}

			// Track successful job application submitted event
			analytics.sendEvent({
				category: "User",
				action: "Job Application Submitted",
				label: jobApplicationFormFormattedValues.jobAdId,
			});

			if (modalIsOpen) {
				setJobApplicationFormContent(
					<JobApplicationSubmittedInnerContent
						companyId={values.companyId}
					/>
				);
					
			} else {
				history.push(`/${urlGenerators.queryRoutes.jobApplicationSubmitted}?id=${jobApplicationFormFormattedValues.companyId}`);
			}
		})
		.catch(errors => {
			console.log('ERROR', errors.message);
			// Error in English: Not Logged In
			if (
				errors.message.includes(
					"Tienes que iniciar una sesión o registrarte"
				)
			) {
				setLoginRegisterModal(
					<PopupModal isOpen={true} closeModalButtonColor="white" >
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
	modalIsOpen?: boolean;
}

export default function ApplyToJobAdForm({ jobAdId, modalIsOpen }: ApplyToJobAdFormProps) {
	const history = useHistory();
	const user = useUser();

	const [createUserProfile] = useCreateUserProfileMutation();
	const [updateUserProfile] = useUpdateUserProfileMutation();
	const [submissionError, setSubmissionError] = React.useState(null);
	let [loginRegisterModal, setLoginRegisterModal] = React.useState(null);
	let [jobApplicationFormContent, setJobApplicationFormContent]: any = React.useState(null);
	const [applyToJobAd] = useApplyToJobAdMutation();
	const { data } = useGetJobTitleAndCompanyIdQuery({
		variables: { jobAdId },
	});

	let { data: userProfileData, loading, error } = useGetUserProfileDataQuery();

	if (loading) return <Spinner />;

	let userProfile = null;

	// If user has a user profile, fill in the form fields with the user profile data
	if(userProfileData?.userProfile) {
		userProfile = formatUserProfileData(userProfileData.userProfile);
		initialValues = userProfile;
		initialValues.workExperiences?.map(function(_: any, index: number) {
			if (initialValues.workExperiences[index].iCurrentlyWorkHere === true) {
				initialValues.workExperiences[index].endDateMonth = "";
				initialValues.workExperiences[index].endDateYear = "";
			}
		});
	}

	const jobTitle = data?.jobAd?.jobTitle;
	const companyId = data?.jobAd?.company.id;
	const numReviews = data?.jobAd?.company.numReviews;

	if (user) {
		loginRegisterModal = null;
	}

	if (jobApplicationFormContent === null)
		jobApplicationFormContent = (
		<Formik
		initialValues={merge(initialValues, {
			jobAdId,
			jobTitle,
			companyId,
			numReviews,
		})}
		validationSchema={schema}
		onSubmit={onSubmit(
			userProfile,
			createUserProfile,
			updateUserProfile,
			applyToJobAd,
			history,
			setSubmissionError,
			setLoginRegisterModal,
			setJobApplicationFormContent,
			modalIsOpen
		)}
	>
		<InnerForm submissionError={submissionError} profileExists={userProfile != null} />
	</Formik>);

	return (
		<>
			{jobApplicationFormContent}
			{loginRegisterModal}
		</>
	);
}
