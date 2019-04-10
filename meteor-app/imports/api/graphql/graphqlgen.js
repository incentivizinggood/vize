/* @flow */
// Code generated by github.com/prisma/graphqlgen, DO NOT EDIT.

import type { GraphQLResolveInfo } from "graphql";
import type { User } from "../models/user";
import type { Company } from "../models/company";
import type { Location } from "../models/location";
import type { StarRatings } from "../models/misc";
import type { Review } from "../models/review";
import type { Comment } from "../models/comment";
import type { Vote } from "../models/vote";
import type { JobAd } from "../models/job-ad";
import type { Salary } from "../models/salary";
import type { Context } from "./resolvers";

export type UserRole = "WORKER" | "COMPANY" | "COMPANY_UNVERIFIED";
export type RewardStatus = "CAN_EARN" | "CAN_CLAIM" | "CLAIMED" | "INELEGABLE";
export type PaymentMethod = "PAYPAL" | "XOOM";
export type ClaimWroteAReviewResult =
	| "OK"
	| "NOT_EARNED"
	| "ALREADY_CLAIMED"
	| "INELEGABLE"
	| "PHONENUMBER_INVALID"
	| "PHONENUMBER_ALREADY_USED";

// Types for Query
export const Query_defaultResolvers = {};

export interface Query_Args_AllComments {
	pageNum?: number | null;
	pageSize?: number | null;
}

export interface Query_Args_AllCompanies {
	pageNum?: number | null;
	pageSize?: number | null;
}

export interface Query_Args_AllJobAds {
	pageNum?: number | null;
	pageSize?: number | null;
}

export interface Query_Args_AllReviews {
	pageNum?: number | null;
	pageSize?: number | null;
}

export interface Query_Args_AllSalaries {
	pageNum?: number | null;
	pageSize?: number | null;
}

export interface Query_Args_AllUsers {
	pageNum?: number | null;
	pageSize?: number | null;
}

export interface Query_Args_AllVotes {
	pageNum?: number | null;
	pageSize?: number | null;
}

export interface Query_Args_Comment {
	id: string;
}

export interface Query_Args_Company {
	id: string;
}

export interface Query_Args_JobAd {
	id: string;
}

export interface Query_Args_Review {
	id: string;
}

export interface Query_Args_Salary {
	id: string;
}

export interface Query_Args_User {
	id: string;
}

export interface Query_Args_Vote {
	id: string;
}

export interface Query_Args_SearchCompanies {
	searchText?: string | null;
	pageSize?: number | null;
	pageNum?: number | null;
}

export type Query_Say_Resolver = (
	parent: {},
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Query_CurrentUser_Resolver = (
	parent: {},
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => User | null | Promise<User | null>;

export type Query_AllComments_Resolver = (
	parent: {},
	args: Query_Args_AllComments,
	ctx: Context,
	info: GraphQLResolveInfo
) => Comment[] | Promise<Comment[]>;

export type Query_AllCompanies_Resolver = (
	parent: {},
	args: Query_Args_AllCompanies,
	ctx: Context,
	info: GraphQLResolveInfo
) => Company[] | Promise<Company[]>;

export type Query_AllJobAds_Resolver = (
	parent: {},
	args: Query_Args_AllJobAds,
	ctx: Context,
	info: GraphQLResolveInfo
) => JobAd[] | Promise<JobAd[]>;

export type Query_AllReviews_Resolver = (
	parent: {},
	args: Query_Args_AllReviews,
	ctx: Context,
	info: GraphQLResolveInfo
) => Review[] | Promise<Review[]>;

export type Query_AllSalaries_Resolver = (
	parent: {},
	args: Query_Args_AllSalaries,
	ctx: Context,
	info: GraphQLResolveInfo
) => Salary[] | Promise<Salary[]>;

export type Query_AllUsers_Resolver = (
	parent: {},
	args: Query_Args_AllUsers,
	ctx: Context,
	info: GraphQLResolveInfo
) => User[] | Promise<User[]>;

export type Query_AllVotes_Resolver = (
	parent: {},
	args: Query_Args_AllVotes,
	ctx: Context,
	info: GraphQLResolveInfo
) => Vote[] | Promise<Vote[]>;

export type Query_Comment_Resolver = (
	parent: {},
	args: Query_Args_Comment,
	ctx: Context,
	info: GraphQLResolveInfo
) => Comment | null | Promise<Comment | null>;

export type Query_Company_Resolver = (
	parent: {},
	args: Query_Args_Company,
	ctx: Context,
	info: GraphQLResolveInfo
) => Company | null | Promise<Company | null>;

export type Query_JobAd_Resolver = (
	parent: {},
	args: Query_Args_JobAd,
	ctx: Context,
	info: GraphQLResolveInfo
) => JobAd | null | Promise<JobAd | null>;

export type Query_Review_Resolver = (
	parent: {},
	args: Query_Args_Review,
	ctx: Context,
	info: GraphQLResolveInfo
) => Review | null | Promise<Review | null>;

export type Query_Salary_Resolver = (
	parent: {},
	args: Query_Args_Salary,
	ctx: Context,
	info: GraphQLResolveInfo
) => Salary | null | Promise<Salary | null>;

export type Query_User_Resolver = (
	parent: {},
	args: Query_Args_User,
	ctx: Context,
	info: GraphQLResolveInfo
) => User | null | Promise<User | null>;

export type Query_Vote_Resolver = (
	parent: {},
	args: Query_Args_Vote,
	ctx: Context,
	info: GraphQLResolveInfo
) => Vote | null | Promise<Vote | null>;

export type Query_SearchCompanies_Resolver = (
	parent: {},
	args: Query_Args_SearchCompanies,
	ctx: Context,
	info: GraphQLResolveInfo
) => Company[] | Promise<Company[]>;

export type Query_WroteAReview_Resolver = (
	parent: {},
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => RewardStatus | Promise<RewardStatus>;

export interface Query_Resolvers {
	say: (
		parent: {},
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	currentUser: (
		parent: {},
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => User | null | Promise<User | null>;

	allComments: (
		parent: {},
		args: Query_Args_AllComments,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Comment[] | Promise<Comment[]>;

	allCompanies: (
		parent: {},
		args: Query_Args_AllCompanies,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Company[] | Promise<Company[]>;

	allJobAds: (
		parent: {},
		args: Query_Args_AllJobAds,
		ctx: Context,
		info: GraphQLResolveInfo
	) => JobAd[] | Promise<JobAd[]>;

	allReviews: (
		parent: {},
		args: Query_Args_AllReviews,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Review[] | Promise<Review[]>;

	allSalaries: (
		parent: {},
		args: Query_Args_AllSalaries,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Salary[] | Promise<Salary[]>;

	allUsers: (
		parent: {},
		args: Query_Args_AllUsers,
		ctx: Context,
		info: GraphQLResolveInfo
	) => User[] | Promise<User[]>;

	allVotes: (
		parent: {},
		args: Query_Args_AllVotes,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Vote[] | Promise<Vote[]>;

	comment: (
		parent: {},
		args: Query_Args_Comment,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Comment | null | Promise<Comment | null>;

	company: (
		parent: {},
		args: Query_Args_Company,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Company | null | Promise<Company | null>;

	jobAd: (
		parent: {},
		args: Query_Args_JobAd,
		ctx: Context,
		info: GraphQLResolveInfo
	) => JobAd | null | Promise<JobAd | null>;

	review: (
		parent: {},
		args: Query_Args_Review,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Review | null | Promise<Review | null>;

	salary: (
		parent: {},
		args: Query_Args_Salary,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Salary | null | Promise<Salary | null>;

	user: (
		parent: {},
		args: Query_Args_User,
		ctx: Context,
		info: GraphQLResolveInfo
	) => User | null | Promise<User | null>;

	vote: (
		parent: {},
		args: Query_Args_Vote,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Vote | null | Promise<Vote | null>;

	searchCompanies: (
		parent: {},
		args: Query_Args_SearchCompanies,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Company[] | Promise<Company[]>;

	wroteAReview: (
		parent: {},
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => RewardStatus | Promise<RewardStatus>;
}

// Types for User
export const User_defaultResolvers = {
	username: (parent: User) => parent.username,
};

export interface User_Args_Reviews {
	pageNum?: number | null;
	pageSize?: number | null;
}

export interface User_Args_Comments {
	pageNum?: number | null;
	pageSize?: number | null;
}

export interface User_Args_Votes {
	pageNum?: number | null;
	pageSize?: number | null;
}

export type User_Id_Resolver = (
	parent: User,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type User_Username_Resolver = (
	parent: User,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type User_Role_Resolver = (
	parent: User,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => UserRole | Promise<UserRole>;

export type User_Created_Resolver = (
	parent: User,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type User_Company_Resolver = (
	parent: User,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => Company | null | Promise<Company | null>;

export type User_Reviews_Resolver = (
	parent: User,
	args: User_Args_Reviews,
	ctx: Context,
	info: GraphQLResolveInfo
) => Review[] | null | Promise<Review[] | null>;

export type User_Comments_Resolver = (
	parent: User,
	args: User_Args_Comments,
	ctx: Context,
	info: GraphQLResolveInfo
) => Comment[] | Promise<Comment[]>;

export type User_Votes_Resolver = (
	parent: User,
	args: User_Args_Votes,
	ctx: Context,
	info: GraphQLResolveInfo
) => Vote[] | Promise<Vote[]>;

export interface User_Resolvers {
	id: (
		parent: User,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	username: (
		parent: User,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	role: (
		parent: User,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => UserRole | Promise<UserRole>;

	created: (
		parent: User,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	company: (
		parent: User,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Company | null | Promise<Company | null>;

	reviews: (
		parent: User,
		args: User_Args_Reviews,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Review[] | null | Promise<Review[] | null>;

	comments: (
		parent: User,
		args: User_Args_Comments,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Comment[] | Promise<Comment[]>;

	votes: (
		parent: User,
		args: User_Args_Votes,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Vote[] | Promise<Vote[]>;
}

// Types for Company
export const Company_defaultResolvers = {};

export interface Company_Args_Reviews {
	pageNum?: number | null;
	pageSize?: number | null;
}

export interface Company_Args_JobAds {
	pageNum?: number | null;
	pageSize?: number | null;
}

export interface Company_Args_Salaries {
	pageNum?: number | null;
	pageSize?: number | null;
}

export type Company_Id_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Company_Name_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Company_ContactEmail_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Company_YearEstablished_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => number | null | Promise<number | null>;

export type Company_NumEmployees_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | null | Promise<string | null>;

export type Company_Industry_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | null | Promise<string | null>;

export type Company_Locations_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => Location[] | Promise<Location[]>;

export type Company_ContactPhoneNumber_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | null | Promise<string | null>;

export type Company_WebsiteURL_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | null | Promise<string | null>;

export type Company_DescriptionOfCompany_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | null | Promise<string | null>;

export type Company_DateJoined_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | null | Promise<string | null>;

export type Company_NumFlags_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => number | null | Promise<number | null>;

export type Company_AvgStarRatings_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => StarRatings | null | Promise<StarRatings | null>;

export type Company_PercentRecommended_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => number | null | Promise<number | null>;

export type Company_AvgNumMonthsWorked_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => number | null | Promise<number | null>;

export type Company_Reviews_Resolver = (
	parent: Company,
	args: Company_Args_Reviews,
	ctx: Context,
	info: GraphQLResolveInfo
) => Review[] | Promise<Review[]>;

export type Company_NumReviews_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => number | Promise<number>;

export type Company_JobAds_Resolver = (
	parent: Company,
	args: Company_Args_JobAds,
	ctx: Context,
	info: GraphQLResolveInfo
) => JobAd[] | Promise<JobAd[]>;

export type Company_NumJobAds_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => number | Promise<number>;

export type Company_Salaries_Resolver = (
	parent: Company,
	args: Company_Args_Salaries,
	ctx: Context,
	info: GraphQLResolveInfo
) => Salary[] | Promise<Salary[]>;

export type Company_NumSalaries_Resolver = (
	parent: Company,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => number | Promise<number>;

export interface Company_Resolvers {
	id: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	name: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	contactEmail: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	yearEstablished: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | null | Promise<number | null>;

	numEmployees: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	industry: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	locations: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Location[] | Promise<Location[]>;

	contactPhoneNumber: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	websiteURL: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	descriptionOfCompany: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	dateJoined: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	numFlags: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | null | Promise<number | null>;

	avgStarRatings: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => StarRatings | null | Promise<StarRatings | null>;

	percentRecommended: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | null | Promise<number | null>;

	avgNumMonthsWorked: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | null | Promise<number | null>;

	reviews: (
		parent: Company,
		args: Company_Args_Reviews,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Review[] | Promise<Review[]>;

	numReviews: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	jobAds: (
		parent: Company,
		args: Company_Args_JobAds,
		ctx: Context,
		info: GraphQLResolveInfo
	) => JobAd[] | Promise<JobAd[]>;

	numJobAds: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	salaries: (
		parent: Company,
		args: Company_Args_Salaries,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Salary[] | Promise<Salary[]>;

	numSalaries: (
		parent: Company,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;
}

// Types for Location
export const Location_defaultResolvers = {
	city: (parent: Location) => parent.city,
	address: (parent: Location) => parent.address,
	industrialHub: (parent: Location) => parent.industrialHub,
};

export type Location_City_Resolver = (
	parent: Location,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Location_Address_Resolver = (
	parent: Location,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Location_IndustrialHub_Resolver = (
	parent: Location,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | null | Promise<string | null>;

export interface Location_Resolvers {
	city: (
		parent: Location,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	address: (
		parent: Location,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	industrialHub: (
		parent: Location,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;
}

// Types for StarRatings
export const StarRatings_defaultResolvers = {
	healthAndSafety: (parent: StarRatings) => parent.healthAndSafety,
	managerRelationship: (parent: StarRatings) => parent.managerRelationship,
	workEnvironment: (parent: StarRatings) => parent.workEnvironment,
	benefits: (parent: StarRatings) => parent.benefits,
	overallSatisfaction: (parent: StarRatings) => parent.overallSatisfaction,
};

export type StarRatings_HealthAndSafety_Resolver = (
	parent: StarRatings,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => number | Promise<number>;

export type StarRatings_ManagerRelationship_Resolver = (
	parent: StarRatings,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => number | Promise<number>;

export type StarRatings_WorkEnvironment_Resolver = (
	parent: StarRatings,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => number | Promise<number>;

export type StarRatings_Benefits_Resolver = (
	parent: StarRatings,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => number | Promise<number>;

export type StarRatings_OverallSatisfaction_Resolver = (
	parent: StarRatings,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => number | Promise<number>;

export interface StarRatings_Resolvers {
	healthAndSafety: (
		parent: StarRatings,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	managerRelationship: (
		parent: StarRatings,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	workEnvironment: (
		parent: StarRatings,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	benefits: (
		parent: StarRatings,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	overallSatisfaction: (
		parent: StarRatings,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;
}

// Types for Review
export const Review_defaultResolvers = {
	pros: (parent: Review) => parent.pros,
	cons: (parent: Review) => parent.cons,
	upvotes: (parent: Review) => parent.upvotes,
	downvotes: (parent: Review) => parent.downvotes,
};

export interface Review_Args_Comments {
	pageNum?: number | null;
	pageSize?: number | null;
}

export interface Review_Args_Votes {
	pageNum?: number | null;
	pageSize?: number | null;
}

export type Review_Id_Resolver = (
	parent: Review,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Review_Title_Resolver = (
	parent: Review,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Review_JobTitle_Resolver = (
	parent: Review,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Review_Location_Resolver = (
	parent: Review,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => Location | Promise<Location>;

export type Review_NumberOfMonthsWorked_Resolver = (
	parent: Review,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => number | Promise<number>;

export type Review_Pros_Resolver = (
	parent: Review,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Review_Cons_Resolver = (
	parent: Review,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Review_WouldRecommendToOtherJobSeekers_Resolver = (
	parent: Review,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type Review_StarRatings_Resolver = (
	parent: Review,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => StarRatings | Promise<StarRatings>;

export type Review_AdditionalComments_Resolver = (
	parent: Review,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | null | Promise<string | null>;

export type Review_Created_Resolver = (
	parent: Review,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | null | Promise<string | null>;

export type Review_Upvotes_Resolver = (
	parent: Review,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => number | null | Promise<number | null>;

export type Review_Downvotes_Resolver = (
	parent: Review,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => number | null | Promise<number | null>;

export type Review_Author_Resolver = (
	parent: Review,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => User | Promise<User>;

export type Review_Company_Resolver = (
	parent: Review,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => Company | Promise<Company>;

export type Review_Comments_Resolver = (
	parent: Review,
	args: Review_Args_Comments,
	ctx: Context,
	info: GraphQLResolveInfo
) => Comment[] | Promise<Comment[]>;

export type Review_Votes_Resolver = (
	parent: Review,
	args: Review_Args_Votes,
	ctx: Context,
	info: GraphQLResolveInfo
) => Vote[] | Promise<Vote[]>;

export type Review_CurrentUserVote_Resolver = (
	parent: Review,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => Vote | null | Promise<Vote | null>;

export interface Review_Resolvers {
	id: (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	title: (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	jobTitle: (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	location: (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Location | Promise<Location>;

	numberOfMonthsWorked: (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	pros: (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	cons: (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	wouldRecommendToOtherJobSeekers: (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => boolean | Promise<boolean>;

	starRatings: (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => StarRatings | Promise<StarRatings>;

	additionalComments: (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	created: (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	upvotes: (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | null | Promise<number | null>;

	downvotes: (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | null | Promise<number | null>;

	author: (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => User | Promise<User>;

	company: (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Company | Promise<Company>;

	comments: (
		parent: Review,
		args: Review_Args_Comments,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Comment[] | Promise<Comment[]>;

	votes: (
		parent: Review,
		args: Review_Args_Votes,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Vote[] | Promise<Vote[]>;

	currentUserVote: (
		parent: Review,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Vote | null | Promise<Vote | null>;
}

// Types for Comment
export const Comment_defaultResolvers = {
	content: (parent: Comment) => parent.content,
};

export interface Comment_Args_Children {
	pageNum?: number | null;
	pageSize?: number | null;
}

export interface Comment_Args_Votes {
	pageNum?: number | null;
	pageSize?: number | null;
}

export type Comment_Id_Resolver = (
	parent: Comment,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Comment_Content_Resolver = (
	parent: Comment,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Comment_Created_Resolver = (
	parent: Comment,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | null | Promise<string | null>;

export type Comment_Author_Resolver = (
	parent: Comment,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => User | Promise<User>;

export type Comment_Parent_Resolver = (
	parent: Comment,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => {} | Promise<{}>;

export type Comment_Children_Resolver = (
	parent: Comment,
	args: Comment_Args_Children,
	ctx: Context,
	info: GraphQLResolveInfo
) => Comment[] | Promise<Comment[]>;

export type Comment_Votes_Resolver = (
	parent: Comment,
	args: Comment_Args_Votes,
	ctx: Context,
	info: GraphQLResolveInfo
) => Vote[] | Promise<Vote[]>;

export interface Comment_Resolvers {
	id: (
		parent: Comment,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	content: (
		parent: Comment,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	created: (
		parent: Comment,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	author: (
		parent: Comment,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => User | Promise<User>;

	parent: (
		parent: Comment,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => {} | Promise<{}>;

	children: (
		parent: Comment,
		args: Comment_Args_Children,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Comment[] | Promise<Comment[]>;

	votes: (
		parent: Comment,
		args: Comment_Args_Votes,
		ctx: Context,
		info: GraphQLResolveInfo
	) => Vote[] | Promise<Vote[]>;
}

// Types for Vote
export const Vote_defaultResolvers = {};

export type Vote_Id_Resolver = (
	parent: Vote,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Vote_IsUpvote_Resolver = (
	parent: Vote,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type Vote_Author_Resolver = (
	parent: Vote,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => User | Promise<User>;

export type Vote_Subject_Resolver = (
	parent: Vote,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => {} | Promise<{}>;

export interface Vote_Resolvers {
	id: (
		parent: Vote,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	isUpvote: (
		parent: Vote,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => boolean | Promise<boolean>;

	author: (
		parent: Vote,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => User | Promise<User>;

	subject: (
		parent: Vote,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => {} | Promise<{}>;
}

// Types for JobAd
export const JobAd_defaultResolvers = {
	responsibilities: (parent: JobAd) => parent.responsibilities,
	qualifications: (parent: JobAd) => parent.qualifications,
};

export type JobAd_Id_Resolver = (
	parent: JobAd,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type JobAd_JobTitle_Resolver = (
	parent: JobAd,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type JobAd_Locations_Resolver = (
	parent: JobAd,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => Location[] | Promise<Location[]>;

export type JobAd_PesosPerHour_Resolver = (
	parent: JobAd,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type JobAd_ContractType_Resolver = (
	parent: JobAd,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type JobAd_JobDescription_Resolver = (
	parent: JobAd,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type JobAd_Responsibilities_Resolver = (
	parent: JobAd,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type JobAd_Qualifications_Resolver = (
	parent: JobAd,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type JobAd_Created_Resolver = (
	parent: JobAd,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | null | Promise<string | null>;

export type JobAd_Company_Resolver = (
	parent: JobAd,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => Company | Promise<Company>;

export interface JobAd_Resolvers {
	id: (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	jobTitle: (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	locations: (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Location[] | Promise<Location[]>;

	pesosPerHour: (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	contractType: (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	jobDescription: (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	responsibilities: (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	qualifications: (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	created: (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	company: (
		parent: JobAd,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Company | Promise<Company>;
}

// Types for Salary
export const Salary_defaultResolvers = {};

export type Salary_Id_Resolver = (
	parent: Salary,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Salary_JobTitle_Resolver = (
	parent: Salary,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Salary_Location_Resolver = (
	parent: Salary,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => Location | Promise<Location>;

export type Salary_IncomeType_Resolver = (
	parent: Salary,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | Promise<string>;

export type Salary_IncomeAmount_Resolver = (
	parent: Salary,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => number | Promise<number>;

export type Salary_Created_Resolver = (
	parent: Salary,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => string | null | Promise<string | null>;

export type Salary_Author_Resolver = (
	parent: Salary,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => User | Promise<User>;

export type Salary_Company_Resolver = (
	parent: Salary,
	args: {},
	ctx: Context,
	info: GraphQLResolveInfo
) => Company | Promise<Company>;

export interface Salary_Resolvers {
	id: (
		parent: Salary,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	jobTitle: (
		parent: Salary,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	location: (
		parent: Salary,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Location | Promise<Location>;

	incomeType: (
		parent: Salary,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | Promise<string>;

	incomeAmount: (
		parent: Salary,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => number | Promise<number>;

	created: (
		parent: Salary,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => string | null | Promise<string | null>;

	author: (
		parent: Salary,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => User | Promise<User>;

	company: (
		parent: Salary,
		args: {},
		ctx: Context,
		info: GraphQLResolveInfo
	) => Company | Promise<Company>;
}

// Types for Mutation
export const Mutation_defaultResolvers = {};

export interface Mutation_Args_ClaimWroteAReview {
	phoneNumber: string;
	paymentMethod: PaymentMethod;
}

export type Mutation_ClaimWroteAReview_Resolver = (
	parent: {},
	args: Mutation_Args_ClaimWroteAReview,
	ctx: Context,
	info: GraphQLResolveInfo
) => ClaimWroteAReviewResult | Promise<ClaimWroteAReviewResult>;

export interface Mutation_Resolvers {
	claimWroteAReview: (
		parent: {},
		args: Mutation_Args_ClaimWroteAReview,
		ctx: Context,
		info: GraphQLResolveInfo
	) => ClaimWroteAReviewResult | Promise<ClaimWroteAReviewResult>;
}

export interface Resolvers {
	Query: Query_Resolvers;
	User: User_Resolvers;
	Company: Company_Resolvers;
	Location: Location_Resolvers;
	StarRatings: StarRatings_Resolvers;
	Review: Review_Resolvers;
	Comment: Comment_Resolvers;
	Vote: Vote_Resolvers;
	JobAd: JobAd_Resolvers;
	Salary: Salary_Resolvers;
	Mutation: Mutation_Resolvers;
}