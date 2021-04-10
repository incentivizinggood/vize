import * as yup from "yup";

import sql from "src/utils/sql-template";
import { execTransactionRW, Transaction } from "src/connectors/postgresql";
import { workExperienceInputSchema } from "./work-experience";

const createUserProfileInputSchema = yup
	.object({
		fullName: yup.string().required(),
		phoneNumber: yup.string().required(),
		city: yup.string().required(),
		neighborhood: yup.string(),
		address: yup.string(),
		workExperiences: yup.array().of(workExperienceInputSchema),
		skills: yup.array().of(yup.string()),
		certificatesAndLicences: yup.array().of(yup.string()),
		highestLevelOfEducation: yup
			.string()
			.oneOf([
				"SOME_HIGH_SCOOL",
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
		availabilityComments: yup.string(),
		longTermGoal: yup.string(),
	})
	.required();

export async function createUserProfile(
	input: unknown,
	userId: number
): Promise<boolean> {
	console.log("now in trans");
	const {
		fullName,
		phoneNumber,
		city,
		neighborhood,
		address,
		workExperiences,
		skills,
		certificatesAndLicences,
		highestLevelOfEducation,
		availability,
		availabilityComments,
		longTermGoal,
	} = await createUserProfileInputSchema.validate(input);

	const transaction: Transaction<boolean> = async client => {
		const {
			rows: [{ role }],
		} = await client.query(
			sql`SELECT role, userid FROM users WHERE userid=${userId}`
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
					location_address,
					work_experiences,
					skills,
					certificates_and_licences,
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
					${address},
					${workExperiences},
					${skills},
					${certificatesAndLicences},
					${highestLevelOfEducation},
					${availability},
					${availabilityComments},
					${longTermGoal}
				)
			RETURNING jobadid
		`);

		return true;
	};

	return execTransactionRW(transaction);
}
