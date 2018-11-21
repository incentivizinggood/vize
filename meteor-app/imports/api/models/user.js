// @flow

import type { UserMId, CompanyId, Company } from ".";

type UserBase = {
	_id: UserMId,
	username: string,
	createdAt: Date,
};

// We use these separate cases to establish a dependency between the role and
// companyId fields.

export type CompanyUser = UserBase & {
	role: "company",
	companyId: CompanyId,
};

export type UvCompanyUser = UserBase & {
	role: "company-unverified",
	companyId: null,
};

export type WorkerUser = UserBase & {
	role: "worker",
	companyId: null,
};

export type User = WorkerUser | UvCompanyUser | CompanyUser;
