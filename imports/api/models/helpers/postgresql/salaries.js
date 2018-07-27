import castToNumberIfDefined from "./misc.js";

export default class PgSalaryFunctions {
	static async getSalaryById(client, id) {
		let salaryResults = { rows: [] };

		try {
			salaryResults = await client.query(
				"SELECT * FROM salaries WHERE salaryid=$1",
				[id]
			);
		} catch (e) {
			console.error("ERROR IN MODEL HELPER", e.message);
		} finally {
			return {
				salary: salaryResults.rows[0],
			};
		}
	}

	static async getSalariesByAuthor(client, id, skip, limit) {
		let salaryResults = { rows: [] };
		try {
			salaryResults = await client.query(
				"SELECT * FROM salaries WHERE submittedby=$1 OFFSET $2 LIMIT $3",
				[id, skip, limit]
			);
		} catch (e) {
			console.error("ERROR IN MODEL HELPER", e.message);
		} finally {
			return {
				salaries: salaryResults.rows,
			};
		}
	}

	static async getAllSalaries(client, skip, limit) {
		let salaryResults = { rows: [] };
		try {
			salaryResults = await client.query(
				"SELECT * FROM salaries OFFSET $1 LIMIT $2",
				[skip, limit]
			);
		} catch (e) {
			console.error("ERROR IN MODEL HELPER", e.message);
		} finally {
			return {
				salaries: salaryResults.rows,
			};
		}
	}

	static async getSalariesForCompany(client, name, skip, limit) {
		let salaryResults = { rows: [] };
		try {
			salaryResults = await client.query(
				"SELECT * FROM salaries WHERE companyname=$1 OFFSET $2 LIMIT $3",
				[name, skip, limit]
			);
		} catch (e) {
			console.error("ERROR IN MODEL HELPER", e.message);
		} finally {
			return {
				salaries: salaryResults.rows,
			};
		}
	}

	static async submitSalary(client, salary) {
		// assumes salary is formatted for SimplSchema conformity
		let newSalary = { rows: [] };

		try {
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
		} catch (e) {
			console.error("ERROR IN MODEL HELPER", e.message);
		} finally {
			return {
				salary: newSalary.rows[0],
			};
		}
	}

	static processSalaryResults(salaryResults) {
		/*
			Expects object as argument,
			with single field:
			either salary (singular salary) or salaries (array of salaries)
		*/
		if (salaryResults.salary !== undefined) {
			const salary = salaryResults.salary;
			return {
				_id: Number(salary.salaryid),
				submittedby: castToNumberIfDefined(salary.submittedby),
				companyName: salary.companyname,
				companyId: castToNumberIfDefined(salary.companyid),
				location: salary.salarylocation,
				jobTitle: salary.jobtitle,
				incomeType: salary.incometype,
				incomeAmount: salary.incomeamount,
				gender: salary.gender,
				datePosted: salary.dateadded,
			};
		} else if (salaryResults.salaries !== undefined) {
			return salaryResults.salaries.map(salary => {
				return {
					_id: Number(salary.salaryid),
					submittedby: castToNumberIfDefined(salary.submittedby),
					companyName: salary.companyname,
					companyId: castToNumberIfDefined(salary.companyid),
					location: salary.salarylocation,
					jobTitle: salary.jobtitle,
					incomeType: salary.incometype,
					incomeAmount: salary.incomeamount,
					gender: salary.gender,
					datePosted: salary.dateadded,
				};
			});
		}
		return undefined;
	}

	//	editSalary
	//	deleteSalary
}
