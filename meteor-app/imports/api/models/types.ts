export type UserId = string | number;

export type VoteId =
	| { subjectType: "comment"; refersTo: number; submittedBy: number }
	| { subjectType: "review"; refersTo: number; submittedBy: number };

export type Comment = {
	_id: number;
	submittedBy: UserId;
	datePosted: Date | null;
	content: string;
};

export type CommentParent = Comment | Review;

export type Company = {
	companyId: number;
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
	jobAdId: number;

	companyName: string | null;
	companyId: number;

	jobTitle: string;
	pesosPerHour: string;
	contractType: string;
	jobDescription: string;
	responsibilities: string;
	qualifications: string;
	dateAdded: Date;
};

export type Review = {
	reviewId: number;

	submittedBy: UserId;
	companyName: string;
	companyId: number | null;
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
	salaryId: number;
	submittedBy: UserId;
	companyName: string;
	companyId: number | null;
	location: string;
	jobTitle: string;
	incomeType: string;
	incomeAmount: number;
	dateAdded: Date;
};

export type User = {
	_id: string;
	username: string;
	createdAt: Date;
	role: "worker" | "company-unverified" | "company";
	companyId: number | null;
};

/** A reference to the subject of a vote. */
export type SubjectRef =
	| { subjectType: "comment"; refersTo: number }
	| { subjectType: "review"; refersTo: number };

export type Vote = SubjectRef & {
	submittedBy: number;
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
