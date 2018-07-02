import { pool } from "./connection-pool.js";

export default class CompanyConnector {
	static async getCompanyByName(name) {
		const client = await pool.connect();
		await client.query("START TRANSACTION READ ONLY");
		//companyResults format is unknown
		const companyResults = await client.query(
			"SELECT * FROM companies WHERE name=$1",
			[name]
		);
		// ...therefore companyResults.companyid is undefined
		const locationResults = await client.query(
			"SELECT locationname FROM company_locations WHERE companyid=$1",
			[companyResults.rows[0].companyid]
		);
		// same issue
		const statResults = await client.query(
			"SELECT * FROM company_review_statistics WHERE name=$1",
			[name]
		);
		await client.query("COMMIT");
		client.release();

		return {
			company: companyResults.rows[0],
			locations: locationResults.rows,
			reviewStats: statResults.rows[0],
		};
	}

	static async getCompanyById(id) {
		const client = await pool.connect();
		await client.query("START TRANSACTION READ ONLY");
		const companyResults = await client.query(
			"SELECT * FROM companies WHERE companyid=$1",
			[id]
		);
		const locationResults = await client.query(
			"SELECT locationname FROM company_locations WHERE companyid=$1",
			[id]
		);
		const statResults = await client.query(
			"SELECT * FROM company_review_statistics WHERE name=$1",
			[companyResults.rows[0].name]
		);
		await client.query("COMMIT");
		client.release();

		return {
			company: companyResults.rows[0],
			locations: locationResults.rows,
			reviewStats: statResults.rows[0],
		};
	}

	static async companyNameRegexSearch(text, skip, limit) {}

	static async getAllCompanies(skip, limit) {}

	static async createCompany(company) {}

	static async editCompany(company) {}

	static async deleteCompany(name) {}
}
