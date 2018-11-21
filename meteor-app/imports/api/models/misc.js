// @flow
// This file is for all of the model code that didn't make to put into the other files.

export type MongoId = string;
export type PgId = number;

export type StarRatings = {
	healthAndSafety: number,
	managerRelationship: number,
	workEnvironment: number,
	benefits: number,
	overallSatisfaction: number,
};
