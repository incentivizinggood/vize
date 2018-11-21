// @flow

import type { ID, Company } from ".";

export type User = {
	_id: ID,
	username: string,
	createdAt: Date,
	role: "worker" | "company-unverified" | "company",
	companyId: ?ID,
};
