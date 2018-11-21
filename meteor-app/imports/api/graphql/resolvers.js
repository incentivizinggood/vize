// @flow
/* eslint-disable no-unused-vars */

import { GraphQLDateTime } from "graphql-iso-date";

import type { User } from "/imports/api/models";
import * as dataModel from "/imports/api/models";

import {
	Resolvers,
	Comment_defaultResolvers,
	Company_defaultResolvers,
	JobAd_defaultResolvers,
	Review_defaultResolvers,
	Salary_defaultResolvers,
	User_defaultResolvers,
	Vote_defaultResolvers,
	Location_defaultResolvers,
	StarRatings_defaultResolvers,
} from "./graphqlgen.js";

export type Context = {
	user: User,
};

const defaultPageSize = 100;

const resolvers: Resolvers = {
	Query: {
		say: (obj, args, context, info) => "Hello world.",

		currentUser: (obj, args, context, info) =>
			// The current user is added to the context
			// by the `meteor/apollo` package.
			context.user,

		allComments: (obj, args, context, info) =>
			dataModel.getAllComments(
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		allCompanies: (obj, args, context, info) =>
			dataModel.getAllCompanies(
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		allJobAds: (obj, args, context, info) =>
			dataModel.getAllJobAds(
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		allReviews: (obj, args, context, info) =>
			dataModel.getAllReviews(
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		allSalaries: (obj, args, context, info) =>
			dataModel.getAllSalaries(
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		allUsers: (obj, args, context, info) =>
			dataModel.getAllUsers(
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		allVotes: (obj, args, context, info) =>
			dataModel.getAllVotes(
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		comment: (obj, args, context, info) =>
			dataModel.getCommentById(args.id),

		company: (obj, args, context, info) =>
			dataModel.getCompanyById(args.id),

		jobAd: (obj, args, context, info) => dataModel.getJobAdById(args.id),

		review: (obj, args, context, info) => dataModel.getReviewById(args.id),

		salary: (obj, args, context, info) => dataModel.getSalaryById(args.id),

		user: (obj, args, context, info) => dataModel.getUserById(args.id),

		vote: (obj, args, context, info) => dataModel.getVoteById(args.id),

		searchCompanies: (obj, args, context, info) =>
			dataModel.searchForCompanies(
				args.searchText || "",
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),
	},

	CommentParent: {
		// WARNING: Comments have not been fully implemented yet. The code for
		// them is a half done mess. Keep that in mind when working with it.
		__resolveType(obj, context, info) {
			// Test for the existance of fields unique to each type.
			if (dataModel.isComment(obj)) {
				return "Comment";
			}

			if (dataModel.isReview(obj)) {
				return "Review";
			}

			// It should be imposible to get here.
			// TODO throw a more informative error message.
			return null;
		},
	},

	Comment: {
		// WARNING: Comments have not been fully implemented yet. The code for
		// them is a half done mess. Keep that in mind when working with it.
		...Comment_defaultResolvers,

		id: (obj, args, context, info) => obj._id,

		created: (obj, args, context, info) => obj.datePosted,

		author: (obj, args, context, info) => dataModel.getAuthorOfComment(obj),

		parent: (obj, args, context, info) => dataModel.getParentOfComment(obj),

		children: (obj, args, context, info) =>
			dataModel.getCommentsByParent(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		votes: (obj, args, context, info) =>
			dataModel.getVotesBySubject(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),
	},

	Company: {
		...Company_defaultResolvers,

		id: (obj, args, context, info) => String(obj.companyid),
		name: (obj, args, context, info) => obj.name,

		contactEmail: (obj, args, context, info) => obj.contactemail,
		yearEstablished: (obj, args, context, info) => obj.yearestablished,
		numEmployees: (obj, args, context, info) => obj.numemployees,
		industry: (obj, args, context, info) => obj.industry,

		locations: (obj, args, context, info) =>
			dataModel.getLocationsByCompany(obj),

		contactPhoneNumber: (obj, args, context, info) =>
			obj.contactphonenumber,
		websiteURL: (obj, args, context, info) => obj.websiteurl,
		descriptionOfCompany: (obj, args, context, info) =>
			obj.descriptionofcompany,
		dateJoined: (obj, args, context, info) => obj.datejoined,
		numFlags: (obj, args, context, info) => obj.numflags,

		avgStarRatings: (obj, args, context, info) => {
			if (
				obj.healthandsafety === null ||
				obj.healthandsafety === undefined ||
				obj.managerrelationship === null ||
				obj.managerrelationship === undefined ||
				obj.workenvironment === null ||
				obj.workenvironment === undefined ||
				obj.benefits === null ||
				obj.benefits === undefined ||
				obj.overallsatisfaction === null ||
				obj.overallsatisfaction === undefined
			) {
				return null;
			} else {
				return {
					healthAndSafety: obj.healthandsafety,
					managerRelationship: obj.managerrelationship,
					workEnvironment: obj.workenvironment,
					benefits: obj.benefits,
					overallSatisfaction: obj.overallsatisfaction,
				};
			}
		},

		percentRecommended: (obj, args, context, info) =>
			obj.percentrecommended,
		avgNumMonthsWorked: (obj, args, context, info) =>
			obj.avgnummonthsworked,
		numReviews: (obj, args, context, info) => obj.numreviews,

		reviews: (obj, args, context, info) =>
			dataModel.getReviewsByCompany(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		jobAds: (obj, args, context, info) =>
			dataModel.getJobAdsByCompany(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		numJobAds: (obj, args, context, info) =>
			dataModel.countJobAdsByCompany(obj),
		salaries: (obj, args, context, info) =>
			dataModel.getSalariesByCompany(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		numSalaries: (obj, args, context, info) =>
			dataModel.countSalariesByCompany(obj),
	},

	JobAd: {
		...JobAd_defaultResolvers,

		id: (obj, args, context, info) => String(obj.jobadid),

		jobTitle: (obj, args, context, info) => obj.jobtitle,
		locations: (obj, args, context, info) =>
			dataModel.getLocationsByJobAd(obj),
		pesosPerHour: (obj, args, context, info) => obj.pesosperhour,
		contractType: (obj, args, context, info) => obj.contracttype,
		jobDescription: (obj, args, context, info) => obj.jobdescription,
		created: (obj, args, context, info) => obj.dateadded,

		company: (obj, args, context, info) => dataModel.getCompanyOfJobAd(obj),
	},

	Review: {
		...Review_defaultResolvers,

		id: (obj, args, context, info) => String(obj.reviewid),

		title: (obj, args, context, info) => obj.reviewtitle,

		jobTitle: (obj, args, context, info) => obj.jobtitle,
		location: (obj, args, context, info) => JSON.parse(obj.reviewlocation),
		numberOfMonthsWorked: (obj, args, context, info) => obj.nummonthsworked,
		wouldRecommendToOtherJobSeekers: (obj, args, context, info) =>
			obj.wouldrecommend,

		starRatings: (obj, args, context, info) => ({
			healthAndSafety: obj.healthandsafety,
			managerRelationship: obj.managerrelationship,
			workEnvironment: obj.workenvironment,
			benefits: obj.benefits,
			overallSatisfaction: obj.overallsatisfaction,
		}),

		additionalComments: (obj, args, context, info) =>
			obj.additionalcomments,
		created: (obj, args, context, info) => obj.dateadded,

		author: (obj, args, context, info) => dataModel.getAuthorOfReview(obj),

		company: (obj, args, context, info) =>
			dataModel.getCompanyOfReview(obj),

		comments: (obj, args, context, info) =>
			dataModel.getCommentsByParent(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		votes: (obj, args, context, info) =>
			dataModel.getVotesBySubject(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		currentUserVote: (obj, args, context, info) =>
			context.user
				? dataModel.getVoteByAuthorAndSubject(context.user, obj)
				: null,
	},

	Salary: {
		...Salary_defaultResolvers,

		id: (obj, args, context, info) => String(obj.salaryid),

		jobTitle: (obj, args, context, info) => obj.jobtitle,
		location: (obj, args, context, info) => JSON.parse(obj.salarylocation),
		incomeType: (obj, args, context, info) => obj.incometype,
		incomeAmount: (obj, args, context, info) => obj.incomeamount,
		created: (obj, args, context, info) => obj.dateadded,

		author: (obj, args, context, info) => dataModel.getAuthorOfSalary(obj),

		company: (obj, args, context, info) =>
			dataModel.getCompanyOfSalary(obj),
	},

	User: {
		...User_defaultResolvers,

		id: (obj, args, context, info) => obj._id,

		role: (obj, args, context, info) => {
			if (obj.role === "worker") return "WORKER";
			if (obj.role === "company-unverified") return "COMPANY_UNVERIFIED";
			if (obj.role === "company") return "COMPANY";
			throw Error("User role is not valid.");
		},

		created: (obj, args, context, info) => obj.createdAt,

		company: (obj, args, context, info) => dataModel.getCompanyOfUser(obj),

		reviews: (obj, args, context, info) =>
			dataModel.getReviewsByAuthor(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		comments: (obj, args, context, info) =>
			dataModel.getCommentsByAuthor(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),

		votes: (obj, args, context, info) =>
			dataModel.getVotesByAuthor(
				obj,
				args.pageNum || 0,
				args.pageSize || defaultPageSize
			),
	},

	VoteSubject: {
		__resolveType(obj, context, info) {
			// Test for the existance of fields unique to each type.
			if (dataModel.isComment(obj)) {
				return "Comment";
			}

			if (dataModel.isReview(obj)) {
				return "Review";
			}

			// It should be imposible to get here.
			// TODO throw a more informative error message.
			return null;
		},
	},

	Vote: {
		...Vote_defaultResolvers,

		id: (obj, args, context, info) =>
			JSON.stringify({
				submittedBy: obj.submittedby,
				subjectType: obj.subjecttype,
				refersTo: obj.refersto,
			}),
		isUpvote: (obj, args, context, info) => obj.value,

		author: (obj, args, context, info) => dataModel.getAuthorOfVote(obj),

		subject: (obj, args, context, info) => dataModel.getSubjectOfVote(obj),
	},

	Location: {
		...Location_defaultResolvers,
	},

	StarRatings: {
		...StarRatings_defaultResolvers,
	},

	DateTime: GraphQLDateTime,
};

export default resolvers;
