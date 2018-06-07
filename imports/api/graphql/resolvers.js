/* eslint-disable no-unused-vars */
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

// A helper function that produces simple resolvers.
function p(path) {
	return (obj, args, context) => obj[path];
}

export const resolvers = {
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
			return context.CommentModel.getAll();
		},
		allCompanies(obj, args, context) {
			return context.CompanyModel.getAll();
		},
		allJobAds(obj, args, context) {
			return context.JobAdModel.getAll();
		},
		allReviews(obj, args, context) {
			return context.ReviewModel.getAll();
		},
		allSalaries(obj, args, context) {
			return context.SalaryModel.getAll();
		},
		allUsers(obj, args, context) {
			return context.UserModel.getAll(args.pageNum, args.pageSize);
		},
		allVotes(obj, args, context) {
			return context.VoteModel.getAll();
		},

		comment(obj, args, context) {
			return context.CommentModel.getById(args.id);
		},
		company(obj, args, context) {
			return context.CompanyModel.getById(args.id);
		},
		jobAd(obj, args, context) {
			return context.JobAdModel.getById(args.id);
		},
		review(obj, args, context) {
			return context.ReviewModel.getById(args.id);
		},
		salary(obj, args, context) {
			return context.SalaryModel.getById(args.id);
		},
		user(obj, args, context) {
			return context.UserModel.getById(args.id);
		},
		vote(obj, args, context) {
			return context.VoteModel.getById(args.id);
		},
	},

	CommentParent: {
		__resolveType(obj, context, info) {
			// Test for the existance of fields unique to each type.
			if (obj.content) {
				return "Comment";
			}

			if (obj.companyName) {
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

		author: (obj, args, context) => context.CommentModel.getTheAuthor(obj),
		parent: () => null, // TODO
		children: () => null, // TODO
		votes: (obj, args, context) => context.VoteModel.getByAuthor(obj),
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

		reviews: (obj, args, context) => context.ReviewModel.getByCompany(obj),
		jobAds: (obj, args, context) => context.JobAdModel.getByCompany(obj),
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

		company: (obj, args, context) => context.JobAdModel.getTheCompany(obj),
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

		author: (obj, args, context) => context.ReviewModel.getTheAuthor(obj),
		company: (obj, args, context) => context.ReviewModel.getTheCompany(obj),
		comments: (obj, args, context) => context.getByParent(obj),
		votes: (obj, args, context) => context.VoteModel.getBySubject(obj),
	},

	Salary: {
		id: p("_id"),

		jobTitle: p("jobTitle"),
		incomeType: p("incomeType"),
		incomeAmount: p("incomeAmount"),
		created: p("datePosted"),

		author: (obj, args, context) => context.SalaryModel.getTheAuthor(obj),
		company: (obj, args, context) => context.SalaryModel.getTheCompany(obj),
	},

	User: {
		id: p("_id"),
		username: p("username"),

		role: ({ role }) => role.toUpperCase().replace("-", "_"),
		created: p("createdAt"),

		company: (obj, args, context) => context.UserModel.getTheCompany(obj),
		reviews: (obj, args, context) => context.ReviewModel.getByAuthor(obj),
		comments: (obj, args, context) => context.CommentModel.getByAuthor(obj),
		votes: (obj, args, context) => context.VoteModel.getByAuthor(obj),
	},

	VoteSubject: {
		__resolveType(obj, context, info) {
			// Test for the existance of fields unique to each type.
			if (obj.content) {
				return "Comment";
			}

			if (obj.companyName) {
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

		author: (obj, args, context) => context.VoteModel.getTheAuthor(obj),
		subject: (obj, args, context) => context.VoteModel.getTheSubject(obj),
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
