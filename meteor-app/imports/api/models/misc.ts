// This file is for all of the model code that
// didn't make sence to put into the other files.

export type MongoId = string;
export type PgId = number;

export type StarRatings = {
	healthAndSafety: number;
	managerRelationship: number;
	workEnvironment: number;
	benefits: number;
	overallSatisfaction: number;
};

/** A way of getting nominal type checking in Typescript */
export type Branded<T, B> = T & { __brand: B };

export const defaultPageSize: number = 100;
