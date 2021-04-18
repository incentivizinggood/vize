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
	delete userProfile["email"];
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

interface UserProfilePageProps {
	jobAdId?: string;
}

function CreateUserProfilePage({ jobAdId }: UserProfilePageProps) {
	const user = useUser();

	let { data: userProfileData, loading, error } = useGetUserProfileDataQuery({
		variables: { userId: user ? user.id : "0" },
	});

	if (loading) return <Spinner />;

	console.log('userProfile', userProfileData);
	console.log('userProfileload', loading);
	console.log('userProfileerror', error);
	let userProfile = null;

	// If user has a user profile, fill in the form fields with the user profile data
	if(userProfileData?.userProfile) {
		userProfile = formatUserProfileData(userProfileData.userProfile);
	}
	return (
		<FormPageWrapper title="Crear Perfil de Usuario">
			<FormHeader>
				<T.formTitle />
			</FormHeader>
			<FormText>
				<T.formDescription />
			</FormText>
			<CreateUserProfileForm userProfile={userProfile}/>
		</FormPageWrapper>
	);
}

export default CreateUserProfilePage;
