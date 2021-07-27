import sql from "src/utils/sql-template";
import { simpleQuery1 } from "src/connectors/postgresql";

import { User, UserProfile } from "src/models";

const attributes = sql.raw(
	[
		'userid AS "id"',
		'full_name AS "fullName"',
		'phone_number AS "phoneNumber"',
		'location_city AS "city"',
		'location_neighborhood AS "neighborhood"',
		'work_experiences AS "workExperiences"',
		"skills",
		'certificates_and_licences AS "certificatesAndLicences"',
		'english_proficiency AS "englishProficiency"',
		'education_level AS "highestLevelOfEducation"',
		'work_availability AS "availability"',
		'availability_comments AS "availabilityComments"',
		'long_term_professional_goal AS "longTermProfessionalGoal"',
	].join(", ")
);

const baseQuery = sql`SELECT ${attributes} FROM user_profiles`;

// Get the user with a given id.
export async function getUserProfileByUser(
	user: User
): Promise<UserProfile | null> {
	return simpleQuery1<UserProfile>(sql`
		${baseQuery}
		WHERE userid=${user.userId}
	`);
}
