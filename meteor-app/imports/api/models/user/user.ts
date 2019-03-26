import { UserMId, CompanyId } from "imports/api/models";

export type User = {
	_id: UserMId;
	username: string;
	createdAt: Date;
	role: "worker" | "company-unverified" | "company";
	companyId: CompanyId | null;
};
