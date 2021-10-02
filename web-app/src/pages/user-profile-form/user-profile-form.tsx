import React from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { mapValues, map, omitBy, filter } from "lodash";
import * as analytics from "src/startup/analytics";
import PopupModal from "src/components/popup-modal";
import RegisterLoginModal from "src/pages/register-login-forms/components/register-login-modal";
import { useUser } from "src/hoc/user";
import { workExperienceSchema } from "src/form-schemas";
import { queryRoutes } from "src/pages/url-generators";

import { useCreateUserProfileMutation } from "generated/graphql-operations";
import { useUpdateUserProfileMutation } from "generated/graphql-operations";

import InnerForm from "./user-profile-inner-form";

function omitEmptyStrings(x) {
	if (x === "") return undefined;
	if (x instanceof Array)
		return filter(map(x, omitEmptyStrings), (y) => y !== undefined);
	if (x instanceof Object)
		return omitBy(mapValues(x, omitEmptyStrings), (y) => y === undefined);
	return x;
}

function onSubmitErrorChecking(inputValues: any) {
	// End date is not required when the "I Currently Work Here" box is checked so manual checking needs to be done when the
	// "I Currently Work Here" box is not checked
	let endDateNotInputted = false;
	inputValues.workExperiences?.map(function (_: any, index: number) {
		if (
			(inputValues.workExperiences[index].endDateMonth == "" ||
				inputValues.workExperiences[index].endDateYear == "") &&
			inputValues.workExperiences[index].iCurrentlyWorkHere === false
		)
			endDateNotInputted = true;
	});
	if (endDateNotInputted)
		return "Se requiere la fecha de finalización para la experencia laboral";

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
	if (inputValues["email"]) delete inputValues["email"];
	if (inputValues["numReviews"] !== null) delete inputValues["numReviews"];
	if (inputValues["saveDataToProfile"])
		delete inputValues["saveDataToProfile"];
	if (inputValues["jobAdId"]) delete inputValues["jobAdId"];
	if (inputValues["jobTitle"]) delete inputValues["jobTitle"];
	if (inputValues["id"]) delete inputValues["id"];

	let availabilityArray = [];
	if (inputValues.morning) availabilityArray.push("MORNING_SHIFT");
	if (inputValues.afternoon) availabilityArray.push("AFTERNOON_SHIFT");
	if (inputValues.night) availabilityArray.push("NIGHT_SHIFT");
	inputValues["availability"] = availabilityArray;

	inputValues.phoneNumber = inputValues.phoneNumber.replace("-", "");
	inputValues.phoneNumber = inputValues.phoneNumber.replace("(", "");
	inputValues.phoneNumber = inputValues.phoneNumber.replace(")", "");
	inputValues.phoneNumber = inputValues.phoneNumber.replace(" ", "");

	const skillsArray = inputValues.skills.includes(",")
		? inputValues.skills.split(",")
		: [inputValues.skills];
	const certificatesAndLicencesArray =
		inputValues.certificatesAndLicences.includes(",")
			? inputValues.certificatesAndLicences.split(",")
			: [inputValues.certificatesAndLicences];

	// Clean up the white space from the input
	skillsArray.forEach(function (_: any, index: number) {
		skillsArray[index] = skillsArray[index].trim();
	});
	certificatesAndLicencesArray.forEach(function (_: any, index: number) {
		certificatesAndLicencesArray[index] =
			certificatesAndLicencesArray[index].trim();
	});
	inputValues.skills = skillsArray;
	inputValues.certificatesAndLicences = certificatesAndLicencesArray;

	delete inputValues["morning"];
	delete inputValues["afternoon"];
	delete inputValues["night"];

	inputValues.workExperiences?.forEach(function (_: any, index: number) {
		const startDateYear = inputValues.workExperiences[index].startDateYear;
		const startDateMonth =
			inputValues.workExperiences[index].startDateMonth;
		const startDate = new Date(
			startDateYear,
			startDateMonth,
			1
		).toISOString();
		inputValues.workExperiences[index].startDate = startDate;
		delete inputValues.workExperiences[index].startDateMonth;
		delete inputValues.workExperiences[index].startDateYear;

		let endDate: String | null = null;
		if (!inputValues.workExperiences[index].iCurrentlyWorkHere) {
			const endDateYear = inputValues.workExperiences[index].endDateYear;
			const endDateMonth =
				inputValues.workExperiences[index].endDateMonth;
			endDate = new Date(endDateYear, endDateMonth, 1).toISOString();
		}

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
	englishProficiency: "",
	highestLevelOfEducation: "",
	morning: false,
	afternoon: false,
	night: false,
	availabilityComments: "",
	longTermProfessionalGoal: "",
};

const schema = yup.object().shape({
	fullName: yup.string().required("Se requiere el nombre completo"),
	phoneNumber: yup.string().required("Se requiere el numero de telefono"),
	city: yup.string().required("Se requiere la ciudad"),
	neighborhood: yup.string(),
	workExperiences: yup.array().required().min(1).of(workExperienceSchema),
	skills: yup.string().required("Se requiere al menos una habilidad"),
	certificatesAndLicences: yup.string(),
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
	longTermProfessionalGoal: yup.string(),
});

const onSubmit =
	(
		user,
		userProfile,
		createUserProfile,
		updateUserProfile,
		history,
		setSubmissionError,
		setLoginRegisterModal
	) =>
	(values, actions) => {
		const userProfileFormValues = JSON.parse(JSON.stringify(values));

		const errorMessage = onSubmitErrorChecking(userProfileFormValues);
		if (errorMessage) {
			setSubmissionError(errorMessage);
			return null;
		}

		let formattedValues = formatInputData(userProfileFormValues);
		const updateOrCreateUserProfile = userProfile
			? updateUserProfile
			: createUserProfile;

		return updateOrCreateUserProfile({
			variables: {
				input: omitEmptyStrings(formattedValues),
			},
		})
			.then(({ data }) => {
				actions.resetForm(initialValues);
				if (updateOrCreateUserProfile === updateUserProfile) {
					analytics.sendEvent({
						category: "User",
						action: "User Profile Updated",
						label: user.id,
					});
				} else {
					analytics.sendEvent({
						category: "User",
						action: "User Profile Created",
						label: user.id,
					});
				}

				history.push(`/${queryRoutes.jobs}`);
			})
			.catch((errors) => {
				// Error in English: Not Logged In
				console.log("Error", errors);
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

export default function CreateUserProfileForm({
	userProfile,
}: UserProfileFormProps) {
	const history = useHistory();

	const [submissionError, setSubmissionError] = React.useState(null);
	let [loginRegisterModal, setLoginRegisterModal] = React.useState(null);
	const [createUserProfile] = useCreateUserProfileMutation();
	const [updateUserProfile] = useUpdateUserProfileMutation();

	// If user has a user profile, fill in the form fields with the user profile data
	if (userProfile) {
		initialValues = userProfile;
		initialValues.workExperiences?.map(function (_: any, index: number) {
			if (
				initialValues.workExperiences[index].iCurrentlyWorkHere === true
			) {
				initialValues.workExperiences[index].endDateMonth = "";
				initialValues.workExperiences[index].endDateYear = "";
			}
		});
	}

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
					user,
					userProfile,
					createUserProfile,
					updateUserProfile,
					history,
					setSubmissionError,
					setLoginRegisterModal
				)}
			>
				<InnerForm
					schema={schema}
					submissionError={submissionError}
					setSubmissionError={setSubmissionError}
					profileExists={userProfile != null}
				/>
			</Formik>
			{loginRegisterModal}
		</>
	);
}
