/* eslint-disable no-unused-vars */
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

// A helper function that produces simple resolvers.
function p(path) {
	return (obj, args, context) => obj[path];
}

export default {
	Query: {
		say(obj, args, context) {
			return "Hello world.";
		},
		currentUser(obj, args, context) {
			// The current user is added to the context
			// by the `meteor/apollo` package.
			return context.user;
		},

		allComments(obj, args, context) {
			return context.commentModel.getAll(args.pageNum, args.pageSize);
		},
		allCompanies(obj, args, context) {
			return context.companyModel.getAll(args.pageNum, args.pageSize);
		},
		allJobAds(obj, args, context) {
			return context.jobAdModel.getAll(args.pageNum, args.pageSize);
		},
		allReviews(obj, args, context) {
			return context.reviewModel.getAll(args.pageNum, args.pageSize);
		},
		allSalaries(obj, args, context) {
			return context.salaryModel.getAll(args.pageNum, args.pageSize);
		},
		allUsers(obj, args, context) {
			return context.userModel.getAll(args.pageNum, args.pageSize);
		},
		allVotes(obj, args, context) {
			return context.voteModel.getAll(args.pageNum, args.pageSize);
		},

		comment(obj, args, context) {
			return context.commentModel.getById(args.id);
		},
		company(obj, args, context) {
			return context.companyModel.getById(args.id);
		},
		jobAd(obj, args, context) {
			return context.jobAdModel.getById(args.id);
		},
		review(obj, args, context) {
			return context.reviewModel.getById(args.id);
		},
		salary(obj, args, context) {
			return context.salaryModel.getById(args.id);
		},
		user(obj, args, context) {
			return context.userModel.getById(args.id);
		},
		vote(obj, args, context) {
			return context.voteModel.getById(args.id);
		},
	},

	CommentParent: {
		__resolveType(obj, context, info) {
			// Test for the existance of fields unique to each type.
			if (context.commentModel.isComment(obj)) {
				return "Comment";
			}

			if (context.reviewModel.isReview(obj)) {
				return "Review";
			}

			// It should be imposible to get here.
			// TODO throw a more informative error message.
			return null;
		},
	},

	Comment: {
		id: p("_id"),

		content: p("content"),
		created: p("datePosted"),
		upvotes: p("upvotes"),
		downvotes: p("downvotes"),

		author: (obj, args, context) => context.commentModel.getTheAuthor(obj),
		parent: (obj, args, context) => context.commentModel.getTheParent(obj),
		children: (obj, args, context) =>
			context.commentModel.getByParent(obj, args.pageNum, args.pageSize),
		votes: (obj, args, context) =>
			context.voteModel.getByAuthor(obj, args.pageNum, args.pageSize),
	},

	Company: {
		id: p("_id"),

		vizeProfileUrl: p("vizeProfileUrl"),
		vizeReviewUrl: p("vizeReviewUrl"),
		vizeSalaryUrl: p("vizeSalaryUrl"),
		vizePostJobUrl: p("vizePostJobUrl"),
		name: p("name"),
		contactEmail: p("contactEmail"),
		dateEstablished: p("dateEstablished"),
		numEmployees: p("numEmployees"),
		industry: p("industry"),
		locations: p("locations"),
		otherContactInfo: p("otherContactInfo"),
		websiteURL: p("otherContactInfo"),
		descriptionOfCompany: p("descriptionOfCompany"),
		dateJoined: p("dateJoined"),
		numFlags: p("numFlags"),
		avgStarRatings: ({
			healthAndSafety,
			managerRelationship,
			workEnvironment,
			benefits,
			overallSatisfaction,
		}) => ({
			healthAndSafety,
			managerRelationship,
			workEnvironment,
			benefits,
			overallSatisfaction,
		}),
		numReviews: p("numReviews"),
		percentRecommended: p("percentRecommended"),
		avgNumMonthsWorked: p("avgNumMonthsWorked"),

		reviews: (obj, args, context) =>
			context.reviewModel.getByCompany(obj, args.pageNum, args.pageSize),
		jobAds: (obj, args, context) =>
			context.jobAdModel.getByCompany(obj, args.pageNum, args.pageSize),
	},

	JobAd: {
		id: p("_id"),

		vizeApplyForJobUrl: p("vizeApplyForJobUrl"),
		jobTitle: p("jobTitle"),
		locations: p("locations"),
		pesosPerHour: p("pesosPerHour"),
		contractType: p("contractType"),
		jobDescription: p("jobDescription"),
		responsibilities: p("responsibilities"),
		qualifications: p("qualifications"),
		created: p("datePosted"),

		company: (obj, args, context) => context.jobAdModel.getTheCompany(obj),
	},

	Review: {
		id: p("_id"),

		title: p("reviewTitle"),
		locations: p("locations"),
		jobTitle: p("jobTitle"),
		numberOfMonthsWorked: p("numberOfMonthsWorked"),
		pros: p("pros"),
		cons: p("cons"),
		wouldRecommendToOtherJobSeekers: p("wouldRecommendToOtherJobSeekers"),
		starRatings: ({
			healthAndSafety,
			managerRelationship,
			workEnvironment,
			benefits,
			overallSatisfaction,
		}) => ({
			healthAndSafety,
			managerRelationship,
			workEnvironment,
			benefits,
			overallSatisfaction,
		}),
		additionalComments: p("additionalComments"),
		created: p("datePosted"),
		upvotes: p("upvotes"),
		downvotes: p("downvotes"),

		author: (obj, args, context) => context.reviewModel.getTheAuthor(obj),
		company: (obj, args, context) => context.reviewModel.getTheCompany(obj),
		comments: (obj, args, context) =>
			context.getByParent(obj, args.pageNum, args.pageSize),
		votes: (obj, args, context) =>
			context.voteModel.getBySubject(obj, args.pageNum, args.pageSize),
	},

	Salary: {
		id: p("_id"),

		jobTitle: p("jobTitle"),
		incomeType: p("incomeType"),
		incomeAmount: p("incomeAmount"),
		created: p("datePosted"),

		author: (obj, args, context) => context.salaryModel.getTheAuthor(obj),
		company: (obj, args, context) => context.salaryModel.getTheCompany(obj),
	},

	User: {
		id: p("_id"),
		username: p("username"),

		role: ({ role }) => role.toUpperCase().replace("-", "_"),
		created: p("createdAt"),

		company: (obj, args, context) => context.userModel.getTheCompany(obj),
		reviews: (obj, args, context) =>
			context.reviewModel.getByAuthor(obj, args.pageNum, args.pageSize),
		comments: (obj, args, context) =>
			context.commentModel.getByAuthor(obj, args.pageNum, args.pageSize),
		votes: (obj, args, context) =>
			context.voteModel.getByAuthor(obj, args.pageNum, args.pageSize),
	},

	VoteSubject: {
		__resolveType(obj, context, info) {
			// Test for the existance of fields unique to each type.
			if (context.commentModel.isComment(obj)) {
				return "Comment";
			}

			if (context.reviewModel.isReview(obj)) {
				return "Review";
			}

			// It should be imposible to get here.
			// TODO throw a more informative error message.
			return null;
		},
	},

	Vote: {
		id: p("_id"),

		isUpvote: p("value"),

		author: (obj, args, context) => context.voteModel.getTheAuthor(obj),
		subject: (obj, args, context) => context.voteModel.getTheSubject(obj),
	},

	StarRatings: {
		healthAndSafety: p("healthAndSafety"),
		managerRelationship: p("managerRelationship"),
		workEnvironment: p("workEnvironment"),
		benefits: p("benefits"),
		overallSatisfaction: p("overallSatisfaction"),
	},

	Date: new GraphQLScalarType({
		name: "Date",
		description:
			"JavaScript Date serialized as milliseconds since midnight January 1, 1970 UTC.",
		parseValue(value) {
			return new Date(value); // value from the client
		},
		serialize(value) {
			return value.getTime(); // value sent to the client
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return parseInt(ast.value, 10); // ast value is always in string format
			}
			return null;
		},
	}),
};
