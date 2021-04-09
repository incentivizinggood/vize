import sql from "src/utils/sql-template";
import { simpleQuery1 } from "src/connectors/postgresql";

import { UserProfile } from "src/models";

const attributes = sql.raw(
	[
		'userid AS "userId"',
		'full_name AS "fullName"',
		'phone_number AS "phoneNumber"',
		'location_city AS "locationCity"',
		'location_neighborhood AS "locationNeighborhood"',
		'location_address AS "locationAddress"',
		'work_experiences AS "workExperiences"',
		"skills",
		'certificates_and_licences AS "certificatesAndLicences"',
		'education_level AS "educationLevel"',
		'work_availability AS "workAvailability"',
		'availability_comments AS "availabilityComments"',
		'long_term_professional_goal AS "longTermProfessionalGoal"',
	].join(", ")
);

const baseQuery = sql`SELECT ${attributes} FROM user_profiles`;

// Get the user with a given id.
export async function getUserProfileById(
	id: number
): Promise<UserProfile | null> {
	return simpleQuery1<UserProfile>(sql`
		${baseQuery}
		WHERE userid=${id}
	`);
}
