import sql from "src/utils/sql-template";
import { simpleQuery } from "src/connectors/postgresql";
import { CompanySalaryStats } from "src/models";

/** Convert income amounts to all be the same type. */
const companySalaryIncomeAmount = sql`
SELECT
    companyname,
    jobtitle,
    CASE incometype
        WHEN 'Yearly Salary'  THEN incomeamount / 52
        WHEN 'Monthly Salary' THEN incomeamount / 4
        WHEN 'Weekly Salary'  THEN incomeamount
        WHEN 'Daily Salary'   THEN  5 * incomeamount
        WHEN 'Hourly Wage'    THEN 50 * incomeamount
    END AS income_amount_per_week
FROM salaries
`;

// TODO: make this a flexible search for salary stats.
export async function getSalaryStatsByCompanyName(
	companyName: string
): Promise<CompanySalaryStats[]> {
	return simpleQuery(sql`
		SELECT
			companyname AS "companyName",
			jobtitle AS "jobTitle",
			avg(income_amount_per_week) AS "totalAvgPay",
			max(income_amount_per_week) AS "totalMaxPay",
			min(income_amount_per_week) AS "totalMinPay",
			count(*) AS "numSalariesJobTitle"
		FROM (${companySalaryIncomeAmount}) company_salary_income_amount
		WHERE companyname = ${companyName}
		GROUP BY companyname, jobtitle
	`);
}
