import React from "react";
import {
	FormHeader,
	FormText,
	FormPageWrapper,
} from "src/components/form-stuff";
import { translations } from "src/translations";
import { useUser } from "src/hoc/user";
import Spinner from "src/components/Spinner";
import CreateUserProfileForm from "./user-profile-form";

import { useGetUserProfileDataQuery } from "generated/graphql-operations";

const T = translations.userProfileForm;

function formatUserProfileData(userProfile: any) {
	delete userProfile["companyId"];
	delete userProfile["__typename"];

	if (!userProfile["longTermProfessionalGoal"])
		userProfile.longTermProfessionalGoal = "";

	if (userProfile["availability"]) {
		userProfile["availability"].includes("MORNING_SHIFT")
			? (userProfile.morning = true)
			: (userProfile.morning = false);
		userProfile["availability"].includes("AFTERNOON_SHIFT")
			? (userProfile.afternoon = true)
			: (userProfile.afternoon = false);
		userProfile["availability"].includes("NIGHT_SHIFT")
			? (userProfile.night = true)
			: (userProfile.night = false);
		delete userProfile["availability"];
	}

	userProfile.skills = Array.isArray(userProfile.skills)
		? userProfile.skills.join(", ")
		: userProfile.skills;
	userProfile.certificatesAndLicences = Array.isArray(
		userProfile.certificatesAndLicences
	)
		? userProfile.certificatesAndLicences.join(", ")
		: userProfile.certificatesAndLicences;

	userProfile.workExperiences?.forEach(function (_: any, index: number) {
		delete userProfile.workExperiences[index].__typename;

		const startDate = new Date(
			userProfile.workExperiences[index].startDate
		);
		userProfile.workExperiences[index].startDateMonth =
			startDate.getMonth();
		userProfile.workExperiences[index].startDateYear =
			startDate.getFullYear();

		if (userProfile.workExperiences[index].endDate) {
			userProfile.workExperiences[index].iCurrentlyWorkHere = false;
			const endDate = new Date(
				userProfile.workExperiences[index].endDate
			);
			userProfile.workExperiences[index].endDateMonth =
				endDate.getMonth();
			userProfile.workExperiences[index].endDateYear =
				endDate.getFullYear();
		} else {
			userProfile.workExperiences[index].iCurrentlyWorkHere = true;
		}
	});

	return userProfile;
}

interface UserProfilePageProps {
	jobAdId?: string;
}

function CreateUserProfilePage({ jobAdId }: UserProfilePageProps) {
	const user = useUser();

	let {
		data: userProfileData,
		loading,
		error,
	} = useGetUserProfileDataQuery();

	if (loading) return <Spinner />;

	let userProfile = null;

	let profileFormTitle = <T.formTitleCreateProfile />;

	// If user has a user profile, fill in the form fields with the user profile data
	if (userProfileData?.userProfile) {
		userProfile = formatUserProfileData(userProfileData.userProfile);
		profileFormTitle = <T.formTitleEditProfile />;
	}
	return (
		<FormPageWrapper title="Formulario de Perfil">
			<FormHeader>{profileFormTitle}</FormHeader>
			<FormText>
				<T.formDescription />
			</FormText>
			<CreateUserProfileForm userProfile={userProfile} />
		</FormPageWrapper>
	);
}

export default CreateUserProfilePage;
