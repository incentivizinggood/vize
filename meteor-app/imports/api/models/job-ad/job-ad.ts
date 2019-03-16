import { JobAdId, CompanyId } from "imports/api/models";

export type JobAd = {
	jobadId: JobAdId;

	companyName: string | null;
	companyId: CompanyId;

	jobTitle: string;
	pesosPerHour: string;
	contractType: string;
	jobDescription: string;
	responsibilities: string;
	qualifications: string;
	dateAdded: Date;
};
