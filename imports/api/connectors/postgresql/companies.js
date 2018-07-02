import { pool } from "./connection-pool.js";

export default class CompanyConnector {
	static async getCompanyByName(name) {
		const client = await pool.connect();
		await client.query("START TRANSACTION READ ONLY");
		const companyResults = await client.query(
			"SELECT * FROM companies WHERE name=$1",
			[name]
		);
		const locationResults = await client.query(
			"SELECT locationname FROM company_locations WHERE companyid=$1",
			[companyResults.companyid]
		);
		const statResults = await client.query(
			"SELECT * FROM company_review_statistics WHERE companyname=$1",
			[name]
		);
		await client.query("COMMIT");
		client.release();

		return {
			company: companyResults,
			locations: locationResults,
			review_stats: statResults,
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
			"SELECT * FROM company_review_statistics WHERE companyname=$1",
			[companyResults.name]
		);
		await client.query("COMMIT");
		client.release();

		return {
			company: companyResults,
			locations: locationResults,
			review_stats: statResults,
		};
	}

	static async companyNameRegexSearch(text, skip, limit) {}

	static async getAllCompanies(skip, limit) {}

	static async createCompany(company) {}

	static async editCompany(company) {}

	static async deleteCompany(name) {}
}
