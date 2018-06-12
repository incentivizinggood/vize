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

		searchCompanies(obj, args, context) {
			return context.companyModel.search(
				args.searchText,
				args.pageNum,
				args.pageSize
			);
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

		created: p("datePosted"),

		author: (obj, args, context) => context.commentModel.getTheAuthor(obj),
		parent: (obj, args, context) => context.commentModel.getTheParent(obj),
		children: (obj, args, context) =>
			context.commentModel.getByParent(obj, args.pageNum, args.pageSize),
		votes: (obj, args, context) =>
			context.voteModel.getByAuthor(obj, args.pageNum, args.pageSize),
	},

	Company: {
		id: p("_id"),

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

		reviews: (obj, args, context) =>
			context.reviewModel.getByCompany(obj, args.pageNum, args.pageSize),
		jobAds: (obj, args, context) =>
			context.jobAdModel.getByCompany(obj, args.pageNum, args.pageSize),
		salaries: (obj, args, context) =>
			context.salaryModel.getByCompany(obj, args.pageNum, args.pageSize),
	},

	JobAd: {
		id: p("_id"),

		created: p("datePosted"),

		company: (obj, args, context) => context.jobAdModel.getTheCompany(obj),
	},

	Review: {
		id: p("_id"),

		title: p("reviewTitle"),
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
		created: p("datePosted"),

		author: (obj, args, context) => context.reviewModel.getTheAuthor(obj),
		company: (obj, args, context) => context.reviewModel.getTheCompany(obj),
		comments: (obj, args, context) =>
			context.getByParent(obj, args.pageNum, args.pageSize),
		votes: (obj, args, context) =>
			context.voteModel.getBySubject(obj, args.pageNum, args.pageSize),
	},

	Salary: {
		id: p("_id"),

		created: p("datePosted"),

		author: (obj, args, context) => context.salaryModel.getTheAuthor(obj),
		company: (obj, args, context) => context.salaryModel.getTheCompany(obj),
	},

	User: {
		id: p("_id"),

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
