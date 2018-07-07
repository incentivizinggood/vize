export default class PgSalaryFunctions {
	static async getSalaryById(client, id) {
		let salaryResults = { rows: [] };
		salaryResults = await client.query(
			"SELECT * FROM salaries WHERE salaryid=$1",
			[id]
		);
		return {
			salary: salaryResults.rows[0],
		};
	}

	static async getAllSalaries(client, skip, limit) {
		let salaryResults = { rows: [] };
		salaryResults = await client.query(
			"SELECT * FROM salaries OFFSET $1 LIMIT $2",
			[skip, limit]
		);
		return {
			salaries: salaryResults.rows,
		};
	}

	static async getSalariesByAuthor(client, id, skip, limit) {
		let salaryResults = { rows: [] };
		salaryResults = await client.query(
			"SELECT * FROM salaries WHERE submittedby=$1 OFFSET $2 LIMIT $3",
			[id, skip, limit]
		);
		return {
			salaries: salaryResults.rows,
		};
	}

	static async getSalariesForCompany(client, name, skip, limit) {
		let salaryResults = { rows: [] };
		salaryResults = await client.query(
			"SELECT * FROM salaries WHERE companyname=$1 OFFSET $2 LIMIT $3",
			[name, skip, limit]
		);
		return {
			salaries: salaryResults.rows,
		};
	}

	static async submitSalary(client, salary) {
		// assumes salary is formatted for SimplSchema conformity
		let newSalary = { rows: [] };

		newSalary = await client.query(
			"INSERT INTO salaries " +
				"(submittedby,companyname,companyid,salarylocation," +
				"jobtitle,incometype,incomeamount,gender) " +
				"VALUES ($1,$2,$3,$4,$5,$6,$7,$8) " +
				"RETURNING *",
			[
				salary.submittedBy,
				salary.companyName,
				salary.companyId,
				salary.location,
				salary.jobTitle,
				salary.incomeType,
				salary.incomeAmount,
				salary.gender,
			]
		);

		return {
			salary: newSalary.rows[0],
		};
	}

	//	editSalary
	//	deleteSalary
}
