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
	console.log('skills', skillsArray);


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
		console.log('endd', endDate);
		
		inputValues.workExperiences[index].endDate = endDate;
		delete inputValues.workExperiences[index].endDateMonth;
		delete inputValues.workExperiences[index].endDateYear;
		delete inputValues.workExperiences[index].iCurrentlyWorkHere;
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
	spanishProficiency: "",
	englishProficiency: "",
	highestLevelOfEducation: "",
	morning: false,
	afternoon: false,
	night: false,
	availabilityComments: "",
	longTermGoal: "",
};

const schema = yup.object().shape({
	fullName: yup.string().required("Se requiere el nombre completo"),
	phoneNumber: yup.string().required("Se requiere el numero de telefono"),
	city: yup.string().required("Se requiere la ciudad"),
	neighborhood: yup.string(),
	workExperiences: yup
		.array()
		.required()
		.min(1)
		.of(workExperienceSchema),
	skills: yup.string().required("Se requiere al menos una habilidad"),
	certificatesAndLicences: yup
		.string(),
	spanishProficiency: yup
		.string()
		.oneOf([
			"NATIVE_LANGUAGE",
			"FLUENT",
			"CONVERSATIONAL",
			"BASIC",
			"NO_PROFICIENCY",
		])
		.required("Se requiere la seleccion que describa tu dominio del español"),
	englishProficiency: yup
		.string()
		.oneOf([
			"NATIVE_LANGUAGE",
			"FLUENT",
			"CONVERSATIONAL",
			"BASIC",
			"NO_PROFICIENCY",
		])
		.required("Se requiere la seleccion que describa tu dominio del ingles"),
	highestLevelOfEducation: yup
		.string()
		.oneOf([
			"SOME_HIGH_SCHOOL",
			"HIGH_SCHOOL",
			"SOME_COLLEGE",
			"COLLEGE_DEGREE",
		])
		.required("Se requiere la seleccion que describa el nivel educativo más alto"),
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

	// End date is not required when the "I Currently Work Here" box is checked so manual checking needs to be done when the
	// "I Currently Work Here" box is not checked
	let endDateNotInputted = false;
	values.workExperiences?.map(function(_: any, index: number) {
		if ((values.workExperiences[index].endDateMonth == "" || values.workExperiences[index].endDateYear == "") && values.workExperiences[index].iCurrentlyWorkHere === false) {
			setSubmissionError("Se requiere la fecha de finalización en la experencia laboral");
			endDateNotInputted = true;
			return null;
		}
	});
	// If an end date was not inputted, return null so that the error can be displayed
	if(endDateNotInputted) return null;

	// Check if at least one value has been selected for the availability
	if (!values.morning && !values.afternoon && !values.night) {
		setSubmissionError("Se requiere tu disponibilidad");
		return null;
	}

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
					<PopupModal isOpen={true} closeModalButtonColor="white">
						<RegisterLoginModal errorText="Crea una cuenta o inicia una sesión para crear un perfil" />
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

interface UserProfileFormProps {
	userProfile?: any;
}

export default function CreateUserProfileForm({ userProfile }: UserProfileFormProps) {
	const history = useHistory();

	const [submissionError, setSubmissionError] = React.useState(null);
	let [loginRegisterModal, setLoginRegisterModal] = React.useState(null);
	const [createUserProfile] = useCreateUserProfileMutation();
	const [updateUserProfile] = useUpdateUserProfileMutation();

	// If user has a user profile, fill in the form fields with the user profile data
	if (userProfile) {
		initialValues = userProfile;
		initialValues.workExperiences?.map(function(_: any, index: number) {
			if (initialValues.workExperiences[index].iCurrentlyWorkHere === true) {
				initialValues.workExperiences[index].endDateMonth = "";
				initialValues.workExperiences[index].endDateYear = "";
			}
		});
	}
	console.log('up user', userProfile);	

	const user = useUser();

	if (user) {
		loginRegisterModal = null;
	}

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
				 
			<InnerForm submissionError={submissionError} profileExists={userProfile != null} />

           
			</Formik>
			{loginRegisterModal}
		</>
	);
}
