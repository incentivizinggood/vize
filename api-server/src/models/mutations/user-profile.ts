import * as yup from "yup";

import sql from "src/utils/sql-template";
import { execTransactionRW, Transaction } from "src/connectors/postgresql";
import { workExperienceInputSchema } from "./work-experience";
import { postToSlack } from "src/connectors/slack-webhook";

const userProfileInputSchema = yup
	.object({
		fullName: yup.string().required(),
		phoneNumber: yup.string().required(),
		city: yup.string().required(),
		neighborhood: yup.string(),
		workExperiences: yup
			.array()
			.required()
			.min(1)
			.of(workExperienceInputSchema),
		skills: yup.array().required().min(1).of(yup.string()),
		certificatesAndLicences: yup.array().of(yup.string()).nullable(),
		englishProficiency: yup
			.string()
			.oneOf([
				"NATIVE_LANGUAGE",
				"FLUENT",
				"CONVERSATIONAL",
				"BASIC",
				"NO_PROFICIENCY",
			])
			.required(),
		highestLevelOfEducation: yup
			.string()
			.oneOf([
				"SOME_HIGH_SCHOOL",
				"HIGH_SCHOOL",
				"SOME_COLLEGE",
				"COLLEGE_DEGREE",
			])
			.required(),
		availability: yup.array().required().min(1).of(yup.string()),
		availabilityComments: yup.string().nullable(),
		longTermProfessionalGoal: yup.string(),
	})
	.required();

export async function createUserProfile(
	input: unknown,
	userId: number
): Promise<boolean> {
	const {
		fullName,
		phoneNumber,
		city,
		neighborhood,
		workExperiences,
		skills,
		certificatesAndLicences,
		englishProficiency,
		highestLevelOfEducation,
		availability,
		availabilityComments,
		longTermProfessionalGoal,
	} = await userProfileInputSchema.validate(input);

	const transaction: Transaction<boolean> = async (client) => {
		const {
			rows: [{ role, email_address: email }],
		} = await client.query(
			sql`SELECT role, email_address FROM users WHERE userid=${userId}`
		);

		const { rows } = await client.query(
			sql`SELECT phone_number FROM user_profiles WHERE phone_number=${phoneNumber}
			LIMIT 1`
		);

		if (role !== "worker") {
			// Error in English: Only workers can create a user profile. You must create a worker account.
			throw new Error(
				"Solo los trabajadores pueden crear un perfil de usuario. Tienes que crear una cuenta de trabajador."
			);
		}

		if (userId === null) {
			// Error in English: "You must create an account before you can create a User Profile."
			throw new Error(
				'Tienes que crear una cuenta o iniciar una sesión antes de crear un perfil de usuari. Navega a "Crear Cuenta" en la barra de navegación.'
			);
		}

		if (rows.length > 0) {
			// Error in English: There is already a profile with the phone number. Please use another one or contact us if someone is using your phone number
			throw new Error(
				"Ya hay un perfil con ese numero de telefono. Por favor utiliza otro numero o contactanos si alguien mas esta utilizando tu numero."
			);
		}

		await client.query(sql`
			INSERT INTO user_profiles
				(
					userid,
					full_name,
					phone_number,
					location_city,
					location_neighborhood,
					work_experiences,
					skills,
					certificates_and_licences,
					english_proficiency,
					education_level,
					work_availability,
					availability_comments,
					long_term_professional_goal
				)
			VALUES
				(
					${userId},
					${fullName},
					${phoneNumber},
					${city},
					${neighborhood},
					${JSON.stringify(workExperiences)},
					${skills},
					${certificatesAndLicences},
					${englishProficiency},
					${highestLevelOfEducation},
					${availability},
					${availabilityComments},
					${longTermProfessionalGoal}
				)
		`);
		postToSlack(
			`The user with the email ${email} and the phone number ${phoneNumber} has created a user profile`
		);

		return true;
	};

	return execTransactionRW(transaction);
}

export async function updateUserProfile(
	input: unknown,
	userId: number
): Promise<void> {
	const {
		fullName,
		phoneNumber,
		city,
		neighborhood,
		workExperiences,
		skills,
		certificatesAndLicences,
		englishProficiency,
		highestLevelOfEducation,
		availability,
		availabilityComments,
		longTermProfessionalGoal,
	} = await userProfileInputSchema.validate(input);

	const transaction: Transaction<void> = async (client) => {
		const {
			rows: [{ role }],
		} = await client.query(
			sql`SELECT role, userid FROM users WHERE userid=${userId}`
		);

		const { rows } = await client.query(
			sql`SELECT userid FROM user_profiles WHERE phone_number=${phoneNumber}
			LIMIT 1`
		);

		if (role !== "worker") {
			// Error in English: Only workers can update a user profile. You must create a worker account.
			throw new Error(
				"Solo los trabajadores pueden actualizar su perfil. Tienes que crear una cuenta de trabajador."
			);
		}

		if (userId === null) {
			// Error in English: "You must create an account before you can create a User Profile."
			throw new Error(
				'Tienes que crear una cuenta o iniciar una sesión antes de crear un perfil. Navega a "Crear Cuenta" en la barra de navegación.'
			);
		}

		if (rows.length > 0) {
			// This additional check is to make sure the the matching phone number does not correspond to the user updating their profile (meaning the phone number is the same because they did not change it)
			if (rows[0].userid !== userId) {
				// Error in English: There is already a profile with the phone number. Please use another one or contact us if someone is using your phone number
				throw new Error(
					"Ya hay un perfil con ese numero de telefono. Por favor utiliza otro numero o contactanos si alguien mas esta utilizando tu numero."
				);
			}
		}

		await client.query(sql`
			UPDATE user_profiles 
			SET	full_name = ${fullName},
				phone_number = ${phoneNumber},
				location_city = ${city},
				location_neighborhood = ${neighborhood},
				work_experiences = ${JSON.stringify(workExperiences)},
				skills = ${skills},
				certificates_and_licences = ${certificatesAndLicences},
				english_proficiency = ${englishProficiency},
				education_level = ${highestLevelOfEducation},
				work_availability = ${availability},
				availability_comments = ${availabilityComments},
				long_term_professional_goal = ${longTermProfessionalGoal}
			WHERE userid = ${userId}
		`);
	};

	return execTransactionRW(transaction);
}
