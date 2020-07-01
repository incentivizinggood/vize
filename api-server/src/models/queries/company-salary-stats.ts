import sql from "src/utils/sql-template";
import { simpleQuery } from "src/connectors/postgresql";
import { CompanySalaryStats } from "src/models";

// TODO: make this a flexible search for salary stats.
export async function getSalaryStatsByCompanyName(
	companyName: string
): Promise<CompanySalaryStats[]> {
	return simpleQuery(sql`
		SELECT
			companyname AS "companyName",
			jobtitle AS "jobTitle",
			total_avg_pay AS "totalAvgPay",
			total_max_pay AS "totalMaxPay",
			total_min_pay AS "totalMinPay",
			num_salaries_job_title AS "numSalariesJobTitle"
		FROM company_salary_statistics
		WHERE companyname = ${companyName}
	`);
}
