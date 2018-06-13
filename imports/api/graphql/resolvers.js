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
			return context.commentModel.getAllComments(
				args.pageNum,
				args.pageSize
			);
		},
		allCompanies(obj, args, context) {
			return context.companyModel.getAllCompanies(
				args.pageNum,
				args.pageSize
			);
		},
		allJobAds(obj, args, context) {
			return context.jobAdModel.getAllJobAds(args.pageNum, args.pageSize);
		},
		allReviews(obj, args, context) {
			return context.reviewModel.getAllReviews(
				args.pageNum,
				args.pageSize
			);
		},
		allSalaries(obj, args, context) {
			return context.salaryModel.getAllSalaries(
				args.pageNum,
				args.pageSize
			);
		},
		allUsers(obj, args, context) {
			return context.userModel.getAllUsers(args.pageNum, args.pageSize);
		},
		allVotes(obj, args, context) {
			return context.voteModel.getAllVotes(args.pageNum, args.pageSize);
		},

		comment(obj, args, context) {
			return context.commentModel.getCommentById(args.id);
		},
		company(obj, args, context) {
			return context.companyModel.getCompanyById(args.id);
		},
		jobAd(obj, args, context) {
			return context.jobAdModel.getJobAdById(args.id);
		},
		review(obj, args, context) {
			return context.reviewModel.getReviewById(args.id);
		},
		salary(obj, args, context) {
			return context.salaryModel.getSalaryById(args.id);
		},
		user(obj, args, context) {
			return context.userModel.getUserById(args.id);
		},
		vote(obj, args, context) {
			return context.voteModel.getVoteById(args.id);
		},

		searchCompanies(obj, args, context) {
			return context.companyModel.searchForCompanies(
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

		author: (obj, args, context) =>
			context.commentModel.getAuthorOfComment(obj),
		parent: (obj, args, context) =>
			context.commentModel.getParentOfComment(obj),
		children: (obj, args, context) =>
			context.commentModel.getCommentsByParent(
				obj,
				args.pageNum,
				args.pageSize
			),
		votes: (obj, args, context) =>
			context.voteModel.getVotesBySubject(
				obj,
				args.pageNum,
				args.pageSize
			),
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
			context.reviewModel.getReviewsByCompany(
				obj,
				args.pageNum,
				args.pageSize
			),
		jobAds: (obj, args, context) =>
			context.jobAdModel.getJobAdsByCompany(
				obj,
				args.pageNum,
				args.pageSize
			),
		salaries: (obj, args, context) =>
			context.salaryModel.getSalariesByCompany(
				obj,
				args.pageNum,
				args.pageSize
			),
	},

	JobAd: {
		id: p("_id"),

		created: p("datePosted"),

		company: (obj, args, context) =>
			context.jobAdModel.getCompanyOfJobAd(obj),
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

		author: (obj, args, context) =>
			context.reviewModel.getAuthorOfReview(obj),
		company: (obj, args, context) =>
			context.reviewModel.getCompanyOfReview(obj),
		comments: (obj, args, context) =>
			context.getCommentsByParent(obj, args.pageNum, args.pageSize),
		votes: (obj, args, context) =>
			context.voteModel.getVotesBySubject(
				obj,
				args.pageNum,
				args.pageSize
			),
	},

	Salary: {
		id: p("_id"),

		created: p("datePosted"),

		author: (obj, args, context) =>
			context.salaryModel.getAuthorOfSalary(obj),
		company: (obj, args, context) =>
			context.salaryModel.getCompanyOfSalary(obj),
	},

	User: {
		id: p("_id"),

		role: ({ role }) => role.toUpperCase().replace("-", "_"),
		created: p("createdAt"),

		company: (obj, args, context) =>
			context.userModel.getCompanyOfUser(obj),
		reviews: (obj, args, context) =>
			context.reviewModel.getReviewsByAuthor(
				obj,
				args.pageNum,
				args.pageSize
			),
		comments: (obj, args, context) =>
			context.commentModel.getCommentsByAuthor(
				obj,
				args.pageNum,
				args.pageSize
			),
		votes: (obj, args, context) =>
			context.voteModel.getVotesByAuthor(
				obj,
				args.pageNum,
				args.pageSize
			),
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

		author: (obj, args, context) => context.voteModel.getAuthorOfVote(obj),
		subject: (obj, args, context) =>
			context.voteModel.getSubjectOfVote(obj),
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
