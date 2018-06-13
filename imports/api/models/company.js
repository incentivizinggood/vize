// @flow
import type { Mongo } from "meteor/mongo";
import type { ID, StarRatings, AllModels } from "./common.js";

const defaultPageSize = 100;

export type Company = {
	_id: ID,
	name: string,

	contactEmail: string,
	dateEstablished: ?Date,
	numEmployees: ?(
		| "1 - 50"
		| "51 - 500"
		| "501 - 2000"
		| "2001 - 5000"
		| "5000+"
	),
	industry: ?string,
	locations: [string],
	otherContactInfo: ?string,
	websiteURL: ?string,
	descriptionOfCompany: ?string,
	dateJoined: ?Date,
	numFlags: ?number,

	healthAndSafety: number,
	managerRelationship: number,
	workEnvironment: number,
	benefits: number,
	overallSatisfaction: number,

	numReviews: number,
	percentRecommended: ?number,
	avgNumMonthsWorked: ?number,
};

export default class CompanyModel {
	connector: Mongo.Collection;

	constructor(connector: Mongo.Collection) {
		this.connector = connector;
	}

	init({  }: AllModels) {
		// This does not need any refrences to other models.
	}

	// Get the company with a given id.
	getCompanyById(id: ID): Company {
		return this.connector.findOne(id);
	}

	// Get the company with a given name.
	getCompanyByName(name: string): Company {
		return this.connector.findOne({ name });
	}

	// Get all of the companies.
	getAllCompanies(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Company] {
		const cursor = this.connector.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	}

	searchForCompanies(
		searchText: string,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Company] {
		const cursor = this.connector.find(
			{ name: { $regex: `.*${searchText}.*`, $options: "i" } },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	}

	createCompany(companyParams: mixed): Company {
		throw new Error("Not implemented yet");
	}

	editCompany(id: ID, companyChanges: mixed): Company {
		throw new Error("Not implemented yet");
	}

	deleteCompany(id: ID): Company {
		throw new Error("Not implemented yet");
	}
}
