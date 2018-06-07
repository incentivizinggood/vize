import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

/* eslint-disable no-unused-vars */
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
		id: ({ _id }) => _id,

		content: ({ content }) => content,
		created: ({ datePosted }) => datePosted,
		upvotes: ({ upvotes }) => upvotes,
		downvotes: ({ downvotes }) => downvotes,

		author: (obj, args, context) => context.CommentModel.getTheAuthor(obj),
		parent: () => null, // TODO
		children: () => null, // TODO
		votes: (obj, args, context) => context.VoteModel.getByAuthor(obj),
	},

	Company: {
		id: ({ _id }) => _id,

		vizeProfileUrl: ({ vizeProfileUrl }) => vizeProfileUrl,
		vizeReviewUrl: ({ vizeReviewUrl }) => vizeReviewUrl,
		vizeSalaryUrl: ({ vizeSalaryUrl }) => vizeSalaryUrl,
		vizePostJobUrl: ({ vizePostJobUrl }) => vizePostJobUrl,
		name: ({ name }) => name,
		contactEmail: ({ contactEmail }) => contactEmail,
		dateEstablished: ({ dateEstablished }) => dateEstablished,
		numEmployees: ({ numEmployees }) => numEmployees,
		industry: ({ industry }) => industry,
		locations: ({ locations }) => locations,
		otherContactInfo: ({ otherContactInfo }) => otherContactInfo,
		websiteURL: ({ otherContactInfo }) => otherContactInfo,
		descriptionOfCompany: ({ descriptionOfCompany }) =>
			descriptionOfCompany,
		dateJoined: ({ dateJoined }) => dateJoined,
		numFlags: ({ numFlags }) => numFlags,
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
		numReviews: ({ numReviews }) => numReviews,
		percentRecommended: ({ percentRecommended }) => percentRecommended,
		avgNumMonthsWorked: ({ avgNumMonthsWorked }) => avgNumMonthsWorked,

		reviews: (obj, args, context) => context.ReviewModel.getByCompany(obj),
		jobAds: (obj, args, context) => context.JobAdModel.getByCompany(obj),
	},

	JobAd: {
		id: ({ _id }) => _id,

		vizeApplyForJobUrl: ({ vizeApplyForJobUrl }) => vizeApplyForJobUrl,
		jobTitle: ({ jobTitle }) => jobTitle,
		locations: ({ locations }) => locations,
		pesosPerHour: ({ pesosPerHour }) => pesosPerHour,
		contractType: ({ contractType }) => contractType,
		jobDescription: ({ jobDescription }) => jobDescription,
		responsibilities: ({ responsibilities }) => responsibilities,
		qualifications: ({ qualifications }) => qualifications,
		created: ({ datePosted }) => datePosted,

		company: (obj, args, context) => context.JobAdModel.getTheCompany(obj),
	},

	Review: {
		id: ({ _id }) => _id,

		title: ({ reviewTitle }) => reviewTitle,
		locations: ({ locations }) => locations,
		jobTitle: ({ jobTitle }) => jobTitle,
		numberOfMonthsWorked: ({ numberOfMonthsWorked }) =>
			numberOfMonthsWorked,
		pros: ({ pros }) => pros,
		cons: ({ cons }) => cons,
		wouldRecommendToOtherJobSeekers: ({
			wouldRecommendToOtherJobSeekers,
		}) => wouldRecommendToOtherJobSeekers,
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
		additionalComments: ({ additionalComments }) => additionalComments,
		created: ({ datePosted }) => datePosted,
		upvotes: ({ upvotes }) => upvotes,
		downvotes: ({ downvotes }) => downvotes,

		author: (obj, args, context) => context.ReviewModel.getTheAuthor(obj),
		company: (obj, args, context) => context.ReviewModel.getTheCompany(obj),
		comments: (obj, args, context) => context.getByParent(obj),
		votes: (obj, args, context) => context.VoteModel.getBySubject(obj),
	},

	Salary: {
		id: ({ _id }) => _id,

		jobTitle: ({ jobTitle }) => jobTitle,
		incomeType: ({ incomeType }) => incomeType,
		incomeAmount: ({ incomeAmount }) => incomeAmount,
		created: ({ datePosted }) => datePosted,

		author: (obj, args, context) => context.SalaryModel.getTheAuthor(obj),
		company: (obj, args, context) => context.SalaryModel.getTheCompany(obj),
	},

	User: {
		id: ({ _id }) => _id,
		username: ({ username }) => username,

		role: ({ role }) => role.toUpperCase().replace("-", "_"),
		created: ({ createdAt }) => createdAt,

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
		id: ({ _id }) => _id,

		isUpvote: ({ value }) => value,

		author: (obj, args, context) => context.VoteModel.getTheAuthor(obj),
		subject: (obj, args, context) => context.VoteModel.getTheSubject(obj),
	},

	StarRatings: {
		healthAndSafety: ({ healthAndSafety }) => healthAndSafety,
		managerRelationship: ({ managerRelationship }) => managerRelationship,
		workEnvironment: ({ workEnvironment }) => workEnvironment,
		benefits: ({ benefits }) => benefits,
		overallSatisfaction: ({ overallSatisfaction }) => overallSatisfaction,
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
