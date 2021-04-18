import React from "react";
import {
	FormHeader,
	FormText,
	FormPageWrapper,
} from "src/components/form-stuff";
import { translations } from "src/translations";

import CreateUserProfileForm from "./user-profile-form";

const T = translations.userProfileForm;

interface CreateUserProfilePageProps {
	jobAdId?: string;
}

function CreateUserProfilePage({ jobAdId }: CreateUserProfilePageProps) {
	return (
		<FormPageWrapper title="Crear Perfil de Usuario">
			<FormHeader>
				<T.formTitle />
			</FormHeader>
			<FormText>
				<T.formDescription />
			</FormText>
			<CreateUserProfileForm />
		</FormPageWrapper>
	);
}

export default CreateUserProfilePage;
