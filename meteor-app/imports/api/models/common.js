// @flow

export type ID = string;

export type Location = {
	city: string,
	address: string,
	industrialHub: ?string,
};

export type StarRatings = {
	healthAndSafety: number,
	managerRelationship: number,
	workEnvironment: number,
	benefits: number,
	overallSatisfaction: number,
};
