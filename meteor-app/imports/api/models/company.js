// @flow
import {
	execTransactionRO,
	execTransactionRW,
} from "/imports/api/connectors/postgresql.js";
import { CompanySchema } from "/imports/api/data/companies.js";

import type { ID } from "/imports/api/models";

const defaultPageSize = 100;

type CompanyData = {
	companyid: number,
	name: string,
	dateadded: Date,
	yearestablished: number,
	industry: string,
	descriptionofcompany: string,
	numemployees:
		| null
		| "1 - 50"
		| "51 - 500"
		| "501 - 2000"
		| "2001 - 5000"
		| "5000+",
	contactemail: string,
	websiteurl: string,
	contactphonenumber: string,
	numflags: number,
};

// TODO: separate the review stats into a separate  graphql type so that we do
// not have to do this weird joining.
type ReviewStatsData = {
	name: string,
	numreviews: number,
	avgnummonthsworked: number,
	percentrecommended: number,
	healthandsafety: number,
	managerrelationship: number,
	workenvironment: number,
	benefits: number,
	overallsatisfaction: number,
};

export type Company = CompanyData & ReviewStatsData;

// Get the company with a given id.
export async function getCompanyById(id: ID): Promise<Company> {
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

export function isCompany(obj: any): boolean {
	// CompanySchema
	// 	.newContext()
	// 	.validate(obj);
	const context = CompanySchema.newContext();
	context.validate(obj);
	return context.isValid();
}

export async function createCompany(companyParams: mixed): Company {
	throw new Error("Not implemented yet");
}

export async function editCompany(id: ID, companyChanges: mixed): Company {
	throw new Error("Not implemented yet");
}

export async function deleteCompany(id: ID): Company {
	throw new Error("Not implemented yet");
}
