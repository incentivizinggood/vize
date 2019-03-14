import { UserMId, CompanyId, Company } from ".";

export type User = {
	_id: UserMId;
	username: string;
	createdAt: Date;
	role: "worker" | "company-unverified" | "company";
	companyId: CompanyId | null;
};
