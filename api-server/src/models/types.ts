export type Resource = {
	slug: string;
	title: string;
	ResourceSubtitle: string;
	body: string;
	resourceImageURL: string;
	topicName: string;
	authorId: number;
	isHighlighted: boolean;
	publishDate: Date;
};

export type ResourceAuthor = {
	authorId: number;
	authorName: string;
	authorCompanyName: string;
	authorImageURL: string;
	authorBio: string;
	contactPhoneNumber: string;
	contactEmail: string;
	websiteURL: string;
	location: string;
};

export type ResourceTopic = {
	topicName: string;
	iconImageURL: string;
};

export type VoteId =
	| { subjectType: "comment"; refersTo: number; submittedBy: number }
	| { subjectType: "review"; refersTo: number; submittedBy: number };

export type Comment = {
	_id: number;
	submittedBy: number;
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
	numReviews: number | null;
	avgNumMonthsWorked: number | null;
	percentRecommended: number | null;
	healthAndSafety: number | null;
	managerRelationship: number | null;
	workEnvironment: number | null;
	benefits: number | null;
	overallSatisfaction: number | null;
};

export type CompanySalaryStats = {
	companyName: string;
	jobTitle: string;
	totalAvgPay: number;
	totalMaxPay: number;
	totalMinPay: number;
	numSalariesJobTitle: number;
};

export type JobAd = {
	jobAdId: number;

	companyName: string | null;
	companyId: number;

	jobTitle: string;
	salaryMin: number;
	salaryMax: number;
	salaryType:
		| "YEARLY_SALARY"
		| "MONTHLY_SALARY"
		| "WEEKLY_SALARY"
		| "DAILY_SALARY"
		| "HOURLY_WAGE";
	contractType: string;
	jobDescription: string;
	responsibilities: string;
	qualifications: string;
	dateAdded: Date;

	startTime: unknown | null;
	endTime: unknown | null;
	startDay: number | null;
	endDay: number | null;
};

export type Review = {
	reviewId: number;

	submittedBy: number;
	companyName: string;
	companyId: number | null;
	city: string | null;
	address: string | null;
	industrialHub: string | null;
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
	submittedBy: number;
	companyName: string;
	companyId: number | null;
	city: string | null;
	address: string | null;
	industrialHub: string | null;
	jobTitle: string;
	incomeType: string;
	incomeAmount: number;
	dateAdded: Date;
};

export type User = {
	userId: number;
	username: string | null;
	emailAddress: string | null;
	passwordHash: string | null;
	facebookId: string | null;
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
	city: string | null;
	address: string | null;
	industrialHub: string | null;
};

export type StarRatings = {
	healthAndSafety: number;
	managerRelationship: number;
	workEnvironment: number;
	benefits: number;
	overallSatisfaction: number;
};
