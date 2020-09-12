import sql from "src/utils/sql-template";
import { simpleQuery1 } from "src/connectors/postgresql";
import { CompanyReviewStats } from "src/models";

export async function getReviewStatsByCompanyName(
	companyName: string
): Promise<CompanyReviewStats | null> {
	return simpleQuery1(sql`
		SELECT
			companyname AS "companyName",
			count(*) AS "numReviews",
			avg(nummonthsworked) AS "avgNumMonthsWorked",
			avg(wouldrecommend::integer) AS "percentRecommended",
			avg(healthandsafety) AS "healthAndSafety",
			avg(managerrelationship) AS "managerRelationship",
			avg(workenvironment) AS "workEnvironment",
			avg(benefits) AS benefits,
			avg(overallsatisfaction) AS "overallSatisfaction"
		FROM reviews
		WHERE companyname = ${companyName}
		GROUP BY companyname
	`);
}
