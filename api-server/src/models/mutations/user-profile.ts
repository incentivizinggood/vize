import * as yup from "yup";

import sql from "src/utils/sql-template";
import { execTransactionRW, Transaction } from "src/connectors/postgresql";
import { workExperienceInputSchema } from "./work-experience";

const userProfileInputSchema = yup
	.object({
		fullName: yup.string().required(),
		phoneNumber: yup.string().required(),
		city: yup.string().required(),
		neighborhood: yup.string(),
		workExperiences: yup.array().of(workExperienceInputSchema),
		skills: yup
			.array()
			.required()
			.min(1)
			.of(yup.string()),
		certificatesAndLicences: yup
			.array()
			.of(yup.string())
			.nullable(),
		spanishProficiency: yup
			.string()
			.oneOf([
				"NATIVE_LANGUAGE",
				"FLUENT",
				"CONVERSATIONAL",
				"BASIC",
				"NO_PROFICIENCY",
			])
			.required(),
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
		availability: yup
			.array()
			.required()
			.min(1)
			.of(yup.string()),
		availabilityComments: yup.string().nullable(),
		longTermGoal: yup.string(),
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
		spanishProficiency,
		englishProficiency,
		highestLevelOfEducation,
		availability,
		availabilityComments,
		longTermGoal,
	} = await userProfileInputSchema.validate(input);

	const transaction: Transaction<boolean> = async client => {
		const {
			rows: [{ role }],
		} = await client.query(
			sql`SELECT role, userid FROM users WHERE userid=${userId}`
		);

		const {
			rows: [{ phoneNumberTable }],
		} = await client.query(
			sql`SELECT EXISTS(SELECT 1 FROM user_profiles WHERE phone_number=${phoneNumber})`
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

		console.log("phonee", phoneNumberTable);
		if (rows.length > 0) {
			console.log("wahhh");
			// Error in English: Only workers can create a user profile. You must create a worker account.
			throw new Error(
				"Ya hay un perfil con ese numero de telefono. Por favor utiliza otro numero o contactanos si alguien mas esta utilizando tu numero."
			);
		}

		if (userId === null) {
			// Error in English: "You must create an account before you can create a User Profile."
			throw new Error(
				'Tienes que crear una cuenta antes de crear un perfil de usuari. Navega a "Crear Cuenta" en la barra de navegación.'
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
					spanish_proficiency,
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
					${spanishProficiency},
					${englishProficiency},
					${highestLevelOfEducation},
					${availability},
					${availabilityComments},
					${longTermGoal}
				)
		`);

		return true;
	};

	return execTransactionRW(transaction);
}

export async function updateUserProfile(
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
		spanishProficiency,
		englishProficiency,
		highestLevelOfEducation,
		availability,
		availabilityComments,
		longTermGoal,
	} = await userProfileInputSchema.validate(input);

	const transaction: Transaction<boolean> = async client => {
		const {
			rows: [{ role }],
		} = await client.query(
			sql`SELECT role, userid FROM users WHERE userid=${userId}`
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
				'Tienes que crear una cuenta antes de crear un perfil. Navega a "Crear Cuenta" en la barra de navegación.'
			);
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
				spanish_proficiency = ${spanishProficiency},
				english_proficiency = ${englishProficiency},
				education_level = ${highestLevelOfEducation},
				work_availability = ${availability},
				availability_comments = ${availabilityComments},
				long_term_professional_goal = ${longTermGoal}
			WHERE userid = ${userId}
		`);

		return true;
	};

	return execTransactionRW(transaction);
}
