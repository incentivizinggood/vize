import * as yup from "yup";

import sql from "src/utils/sql-template";
import { execTransactionRW, Transaction } from "src/connectors/postgresql";
import { sendEmail } from "src/connectors/email";
import { postToSlack } from "src/connectors/slack-webhook";
import {
	monthTranslations,
	educationTranslations,
	languageProficiencyTranslations,
	workShiftTranlsations,
} from "src/utils/translation-utils";
import { locationInputSchema } from "./location";
import { workExperienceInputSchema } from "./work-experience";

const createJobAdInputSchema = yup
	.object({
		jobTitle: yup.string().required(),
		locations: yup.array().required().min(1).of(locationInputSchema),
		salaryMin: yup.number().required(),
		salaryMax: yup.number().required(),
		salaryType: yup
			.string()
			.oneOf([
				"YEARLY_SALARY",
				"MONTHLY_SALARY",
				"WEEKLY_SALARY",
				"DAILY_SALARY",
				"HOURLY_WAGE",
			])
			.required(),
		contractType: yup
			.string()
			.oneOf([
				"FULL_TIME",
				"PART_TIME",
				"INTERNSHIP",
				"TEMPORARY",
				"CONTRACTOR",
			])
			.required(),
		jobDescription: yup.string().required(),
		responsibilities: yup.string().required(),
		qualifications: yup.string().required(),
		// TODO: Should we check for a valid time format here? The database ensures this for now.
		startTime: yup.string().matches(/([0-1][0-9]|2[0-3]):[0-5][0-9]/),
		endTime: yup.string().matches(/([0-1][0-9]|2[0-3]):[0-5][0-9]/),
		startDay: yup.number().integer().min(0).max(6),
		endDay: yup.number().integer().min(0).max(6),
	})
	.required();

export async function createJobAd(
	input: unknown,
	userId: number
): Promise<number> {
	const {
		jobTitle,
		locations,
		salaryMin,
		salaryMax,
		salaryType,
		contractType,
		jobDescription,
		responsibilities,
		qualifications,
		startTime,
		endTime,
		startDay,
		endDay,
	} = await createJobAdInputSchema.validate(input);

	if (salaryMin > salaryMax) {
		// Error in English: salaryMin must be less than or equal to salaryMax
		throw new Error(
			"El salario minimo debe de ser menos que el salario maximo."
		);
	}

	const transaction: Transaction<number> = async (client) => {
		const {
			rows: [{ role, companyid }],
		} = await client.query(
			sql`SELECT role, companyid FROM users WHERE userid=${userId}`
		);

		if (role !== "company-unverified" && role !== "company") {
			// Error in English: Only employers may create a company. You must create an employer account.
			throw new Error(
				"Solo los empleadores pueden crear una empresa. Tienes que crear una cuenta de empleador."
			);
		}

		if (companyid === null) {
			// Error in English: "You must create a company profile before posting job ads. Navigate to My Company to create a profile"
			throw new Error(
				'Tienes que crear un perfil para la empresa antes de publicar ofertas de empleo. Navega a "Mi Empresa" en la barra de navegación y llena la encuesta para crear el perfil.'
			);
		}

		const {
			rows: [{ jobadid }],
		} = await client.query(sql`
			INSERT INTO jobads
				(
					companyid,
					jobtitle,
					salary_min,
					salary_max,
					salary_type,
					contracttype,
					jobdescription,
					responsibilities,
					qualifications,
					start_time,
					end_time,
					start_day,
					end_day
				)
			VALUES
				(
					${companyid},
					${jobTitle},
					${salaryMin},
					${salaryMax},
					${salaryType},
					${contractType},
					${jobDescription},
					${responsibilities},
					${qualifications},
					${startTime},
					${endTime},
					${startDay},
					${endDay}
				)
			RETURNING jobadid
		`);

		await client.query(sql`
			INSERT INTO job_locations
				(jobadid, city, address, industrial_hub)
			VALUES
				${locations
					.map(
						(l) =>
							sql`(
								${jobadid},
								${l.city},
								${l.address},
								${l.industrialHub}
							)`
					)
					.reduce((a, c) => sql`${a}, ${c}`)}
		`);

		return jobadid;
	};

	return execTransactionRW(transaction);
}

function formatWorkExperiences(workExperiences: any): any {
	
	workExperiences?.forEach(function(_: any, index: number) {	
		const startDate = new Date(workExperiences[index].startDate);
		const startDateMonth = monthTranslations[startDate.getMonth().toString()];
		const startDateYear = startDate.getFullYear();
		const startDateText = `${startDateMonth} ${startDateYear}`;

		let endDateText = "Presente";
		if (workExperiences[index].endDate) {
			const endDate = new Date(workExperiences[index].endDate);
			const endDateMonth = monthTranslations[endDate.getMonth().toString()];
			const endDateYear = endDate.getFullYear();
			endDateText = `${endDateMonth} ${endDateYear}`;
		}
		const employmentDate = `${startDateText} - ${endDateText}`;
		workExperiences[index].employmentDate = employmentDate;
	});

	return workExperiences;
}

const createApplyToJobAdInputSchema = yup
	.object({
		jobAdId: yup.string().required(),
		jobTitle: yup.string().required(),
		numReviews: yup.number().required(),
		fullName: yup.string().required(),
		email: yup.string().email().required(),
		phoneNumber: yup.string().required(),
		city: yup.string().required(),
		neighborhood: yup.string(),
		workExperiences: yup.array().of(workExperienceInputSchema),
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
		coverLetter: yup.string(),
	})
	.required();

export async function applyToJobAd(input: unknown): Promise<boolean> {
	const {
		jobAdId,
		jobTitle,
		fullName,
		email: applicantEmail,
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
		coverLetter,
		numReviews,
	} = await createApplyToJobAdInputSchema.validate(input);

	const transaction: Transaction<boolean> = async (client) => {
		const {
			rows: [
				{
					companyid: companyId,
					name: companyName,
					contactemail: companyEmail,
				},
			],
		} = await client.query(
			sql`SELECT companies.companyid, name, contactemail FROM companies JOIN jobads ON companies.companyid = jobads.companyid WHERE jobadid=${jobAdId}`
		);
		await client.query(sql`
			INSERT INTO job_applications
				(
					full_name,
					phone_number,
					email,
					location_city,
					location_neighborhood,
					work_experiences,
					skills,
					certificates_and_licences,
					english_proficiency,
					education_level,
					work_availability,
					availability_comments,
					cover_letter,
					jobadid,
					companyid
				)
			VALUES
				(
					${fullName},
					${phoneNumber},
					${applicantEmail},
					${city},
					${neighborhood},
					${JSON.stringify(workExperiences)},
					${skills},
					${certificatesAndLicences},
					${englishProficiency},
					${highestLevelOfEducation},
					${availability},
					${availabilityComments},
					${coverLetter},
					${jobAdId},
					${companyId}
				)
		`);

		postToSlack(
			`The user with the email ${applicantEmail} and the phone number ${phoneNumber} has applied to the job with id=${jobAdId} for the company ${companyName}. The company's email is ${companyEmail}`
		);

		// This is the message we will use to inform companies that the worker left a field blank
		const userLeftFieldBlankMessage =
			"*El solicitante dejó este campo en blanco*";

		// Adjusting formatting for the employer email
		const workExperiencesFormatted = formatWorkExperiences(workExperiences);
		const availabilityTranslated = availability.map(function (
			_: any,
			index: number
		) {
			// @ts-ignore
			return workShiftTranlsations[availability[index]];
		});
		const availabilityTranslatedAndFormatted =
			availabilityTranslated.join(", ");
		const skillsFormatted = skills.join(", ");
		const certificatesAndLicencesFormatted =
			certificatesAndLicences && certificatesAndLicences.length > 0
				? certificatesAndLicences.join(", ")
				: userLeftFieldBlankMessage;
		const englishProficiencyTranslated =
			languageProficiencyTranslations[englishProficiency];
		const highestLevelOfEducationTranslated =
			educationTranslations[highestLevelOfEducation];
		let availabilityCommentsFormatted = availabilityComments;
		let neighborhoodFormatted = neighborhood;

		if (!availabilityComments)
			availabilityCommentsFormatted = userLeftFieldBlankMessage;
		if (!neighborhood) neighborhoodFormatted = userLeftFieldBlankMessage;

		// Have to make some adjustments for the required JSON formatting
		const coverLetterJSON = coverLetter
			? coverLetter.replace(/\n/g, "\\n")
			: userLeftFieldBlankMessage;

		const spaceIndex = fullName.indexOf(" ");
		const firstName =
			spaceIndex === -1 ? fullName : fullName.substr(0, spaceIndex);

		const readEmployerReviews =
			numReviews > 0
				? `Lee evaluaciones escritas por empleados que han trabajado en ${companyName} para obtener más información sobre cómo es la experiencia de trabajar en esta fábrica: https://www.vize.mx/perfil-de-la-empresa/${companyId}/evaluaciones`
				: "";

		await sendEmail({
			templateId: 3,
			to: applicantEmail,
			params: {
				companyName: `${companyName}`,
				jobTitle: `${jobTitle}`,
				applicantName: `${firstName}`,
				companyId: `${companyId}`,
				jobAdId: `${jobAdId}`,
				readEmployerReviews: `${readEmployerReviews}`,
			},
		});
		await sendEmail({
			templateId: 2,
			to: companyEmail,
			params: {
				companyName: `${companyName}`,
				jobTitle: `${jobTitle}`,
				jobAdId: `${jobAdId}`,
				applicantEmail: `${applicantEmail}`,
				applicantName: `${fullName}`,
				phoneNumber: `${phoneNumber}`,
				city: `${city}`,
				neighborhood: `${neighborhoodFormatted}`,
				workExperiences: workExperiencesFormatted,
				skills: `${skillsFormatted}`,
				certificatesAndLicences: `${certificatesAndLicencesFormatted}`,
				englishProficiency: `${englishProficiencyTranslated}`,
				highestLevelOfEducation: `${highestLevelOfEducationTranslated}`,
				availability: `${availabilityTranslatedAndFormatted}`,
				availabilityComments: `${availabilityCommentsFormatted}`,
				coverLetter: `${coverLetterJSON}`,
			},
		});

		return true;
	};

	return execTransactionRW(transaction);
}
