// @flow
import { execTransactionRO } from "/imports/api/connectors/postgresql.js";

import type { CompanyId, Company } from ".";

const defaultPageSize = 100;

// Get the company with a given id.
export async function getCompanyById(id: CompanyId): Promise<Company> {
	// id is a string for now, and company id's
	// are integers, so I think this should be fine
	// for now
	if (Number.isNaN(Number(id))) throw Error("not a valid company id");

	const transaction = async client => {
		let companyResults = { rows: [] };
		let locationResults = { rows: undefined };
		let statResults = { rows: [] };

		companyResults = await client.query(
			"SELECT * FROM companies WHERE companyid=$1",
			[Number(id)]
		);

		if (companyResults.rows.length > 0) {
			statResults = await client.query(
				"SELECT * FROM company_review_statistics WHERE name=$1",
				[companyResults.rows[0].name]
			);
		}

		return {
			...companyResults.rows[0],
			...statResults.rows[0],
		};
	};

	return execTransactionRO(transaction);
}

// Get the company with a given name.
export async function getCompanyByName(name: string): Promise<Company> {
	const transaction = async client => {
		let companyResults = { rows: [] };
		let locationResults = { rows: undefined };
		let statResults = { rows: [] };

		companyResults = await client.query(
			"SELECT * FROM companies WHERE name=$1",
			[name]
		);

		if (companyResults.rows.length > 0) {
			statResults = await client.query(
				"SELECT * FROM company_review_statistics WHERE name=$1",
				[name]
			);
		}

		return {
			...companyResults.rows[0],
			...statResults.rows[0],
		};
	};

	return execTransactionRO(transaction);
}

// Get all of the companies.
export async function getAllCompanies(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Company[]> {
	const transaction = async client => {
		let companyResults = { rows: [] };
		let locationResults = {};
		let statResults = {};

		companyResults = await client.query(
			"SELECT * FROM companies OFFSET $1 LIMIT $2",
			[pageNumber * pageSize, pageSize]
		);

		let finalResults = [];
		for (let company of companyResults.rows) {
			let stats = await client.query(
				"SELECT * FROM company_review_statistics WHERE name=$1",
				[company.name]
			);
			finalResults.push({
				...company,
				...stats.rows[0],
			});
		}

		return finalResults;
	};

	return execTransactionRO(transaction);
}

// return all companies whose name
// contains the given search text
export async function searchForCompanies(
	searchText: string,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Company[]> {
	const transaction = async client => {
		let companyResults = { rows: [] };
		let locationResults = {};
		let statResults = {};

		companyResults = await client.query(
			"SELECT * FROM companies WHERE name LIKE $1 OFFSET $2 LIMIT $3",
			["%" + searchText + "%", pageNumber * pageSize, pageSize]
		);

		let finalResults = [];
		for (let company of companyResults.rows) {
			let stats = await client.query(
				"SELECT * FROM company_review_statistics WHERE name=$1",
				[company.name]
			);
			finalResults.push({
				...company,
				...stats.rows[0],
			});
		}

		return finalResults;
	};

	return execTransactionRO(transaction);
}
