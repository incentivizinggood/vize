export type MongoId = string;
export type PgId = number;

/** A way of getting nominal type checking in Typescript */
export type Branded<T, B> = T & { __brand: B };

export type CommentId = Branded<PgId, "CommentId">;
export type CompanyId = Branded<PgId, "CompanyId">;
export type JobAdId = Branded<PgId, "JobAdId">;
export type ReviewId = Branded<PgId, "ReviewId">;
export type SalaryId = Branded<PgId, "SalaryId">;

export type UserMId = Branded<MongoId, "UserMId">;
export type UserPId = Branded<PgId, "UserPId">;
export type UserId = UserMId | UserPId;

export type VoteId = Branded<
	| { subjectType: "comment"; refersTo: CommentId; submittedBy: UserPId }
	| { subjectType: "review"; refersTo: ReviewId; submittedBy: UserPId },
	"VoteId"
>;

export type Comment = {
	_id: CommentId;
	submittedBy: UserId;
	datePosted: Date | null;
	content: string;
};

export type CommentParent = Comment | Review;

export type Company = {
	companyId: CompanyId;
	name: string;
	dateAdded: Date;
	yearEstablished: number;
	industry: string;
	descriptionOfCompany: string;
	numEmployees:
		| null
		| "1 - 50"
		| "51 - 500"
		| "501 - 2000"
		| "2001 - 5000"
		| "5000+";
	contactEmail: string;
	websiteURL: string;
	contactPhoneNumber: string;
	numFlags: number;
	// TODO: Separate the review stats into a separate graphql type so that we
	// do not have to join on every company query.
	numReviews: number;
	avgNumMonthsWorked: number;
	percentRecommended: number;
	healthAndSafety: number;
	managerRelationship: number;
	workEnvironment: number;
	benefits: number;
	overallSatisfaction: number;
};

export type JobAd = {
	jobAdId: JobAdId;

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

export type Review = {
	reviewId: ReviewId;

	submittedBy: UserId;
	companyName: string;
	companyId: CompanyId | null;
	location: string;
	title: string;
	jobTitle: string;
	numberOfMonthsWorked: number;
	pros: string;
	cons: string;
	wouldRecommend: boolean;

	healthAndSafety: number;
	managerRelationship: number;
	workEnvironment: number;
	benefits: number;
	overallSatisfaction: number;

	additionalComments: string | null;
	dateAdded: Date;
	upvotes: number;
	downvotes: number;
};

export type Salary = {
	salaryId: SalaryId;
	submittedBy: UserId;
	companyName: string;
	companyId: CompanyId | null;
	location: string;
	jobTitle: string;
	incomeType: string;
	incomeAmount: number;
	dateAdded: Date;
};

export type User = {
	_id: UserMId;
	username: string;
	createdAt: Date;
	role: "worker" | "company-unverified" | "company";
	companyId: CompanyId | null;
};

/** A reference to the subject of a vote. */
export type SubjectRef =
	| { subjectType: "comment"; refersTo: CommentId }
	| { subjectType: "review"; refersTo: ReviewId };

export type Vote = SubjectRef & {
	submittedBy: UserPId;
	isUpvote: boolean | null;
};

export type VoteSubject = Comment | Review;

export type Location = {
	city: string;
	address: string;
	industrialHub: string | null;
};

export type StarRatings = {
	healthAndSafety: number;
	managerRelationship: number;
	workEnvironment: number;
	benefits: number;
	overallSatisfaction: number;
};
