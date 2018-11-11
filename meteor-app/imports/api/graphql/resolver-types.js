// @flow

import { GraphQLDateTime } from "graphql-iso-date";

import type { Comment, CommentParent } from "../models/comment.js";
import type { Company } from "../models/company.js";
import type { JobAd } from "../models/job-ad.js";
import type { Review } from "../models/review.js";
import type { User } from "../models/user.js";
import type { Salary } from "../models/salary.js";
import type { Vote, VoteSubject } from "../models/vote.js";
import type { ID } from "../models/common.js";

export type Context = {
	user: User,
};

export type PgnArgs = {
	pageNum?: number,
	pageSize?: number,
};

export type IdArg = { id: ID };

export type Resolver<O, A, R> = (O, A, Context) => R | Promise<R>;

export type Resolvers = {|
	Query: {|
		say?: Resolver<{}, {}, string>,
		currentUser?: Resolver<{}, {}, ?User>,

		allComments?: Resolver<{}, PgnArgs, [Comment]>,
		allCompanies?: Resolver<{}, PgnArgs, [Company]>,
		allJobAds?: Resolver<{}, PgnArgs, [JobAd]>,
		allReviews?: Resolver<{}, PgnArgs, [Review]>,
		allSalaries?: Resolver<{}, PgnArgs, [Salary]>,
		allUsers?: Resolver<{}, PgnArgs, [User]>,
		allVotes?: Resolver<{}, PgnArgs, [Vote]>,

		comment?: Resolver<{}, IdArg, ?Comment>,
		company?: Resolver<{}, IdArg, ?Company>,
		jobAd?: Resolver<{}, IdArg, ?JobAd>,
		review?: Resolver<{}, IdArg, ?Review>,
		salary?: Resolver<{}, IdArg, ?Salary>,
		user?: Resolver<{}, IdArg, User>,
		vote?: Resolver<{}, IdArg, Vote>,

		searchCompanies?: Resolver<
			{},
			{ searchText?: string } & PgnArgs,
			[Company]
		>,
	|},

	CommentParent: {|
		__resolveType?: (CommentParent, Context, mixed) => "Comment" | "Review",
	|},

	Comment: {|
		id?: Resolver<Comment, {}, string>,

		content?: Resolver<Comment, {}, string>,
		created?: Resolver<Comment, {}, ?Date>,

		author?: Resolver<Comment, {}, User>,
		parent?: Resolver<Comment, {}, CommentParent>,
		children?: Resolver<Comment, PgnArgs, [Comment]>,
		votes?: Resolver<Comment, PgnArgs, [Vote]>,
	|},

	Company: {|
		id?: Resolver<Company, {}, string>,

		name?: Resolver<Company, {}, string>,
		contactEmail?: Resolver<Company, {}, string>,
		yearEstablished?: Resolver<Company, {}, ?number>,
		numEmployees?: Resolver<Company, {}, ?string>,
		industry?: Resolver<Company, {}, ?string>,
		locations?: Resolver<Company, {}, [Location]>,
		contactPhoneNumber?: Resolver<Company, {}, ?string>,
		websiteURL?: Resolver<Company, {}, ?string>,
		descriptionOfCompany?: Resolver<Company, {}, ?string>,
		dateJoined?: Resolver<Company, {}, ?Date>,
		numFlags?: Resolver<Company, {}, ?number>,
		avgStarRatings?: Resolver<Company, {}, ?StarRatings>,
		percentRecommended?: Resolver<Company, {}, ?number>,
		avgNumMonthsWorked?: Resolver<Company, {}, ?number>,

		reviews?: Resolver<Company, PgnArgs, [Review]>,
		jobAds?: Resolver<Company, PgnArgs, [JobAd]>,
		numJobAds?: Resolver<Company, PgnArgs, ?number>,
		salaries?: Resolver<Company, PgnArgs, [Salary]>,
		numSalaries?: Resolver<Company, PgnArgs, ?number>,
	|},

	JobAd: {|
		id?: Resolver<JobAd, {}, string>,

		jobTitle?: Resolver<JobAd, {}, string>,
		locations?: Resolver<JobAd, {}, [Location]>,
		pesosPerHour?: Resolver<JobAd, {}, string>,
		contractType?: Resolver<JobAd, {}, string>,
		jobDescription?: Resolver<JobAd, {}, string>,
		responsibilities?: Resolver<JobAd, {}, string>,
		qualifications?: Resolver<JobAd, {}, string>,
		created?: Resolver<JobAd, {}, ?Date>,

		company?: Resolver<JobAd, {}, Company>,
	|},

	Review: {|
		author?: Resolver<Review, {}, User>,
		company?: Resolver<Review, {}, Company>,
		comments?: Resolver<Review, PgnArgs, [Comment]>,
		votes?: Resolver<Review, PgnArgs, [Vote]>,
		currentUserVote?: Resolver<Review, {}, ?Vote>,
	|},

	Salary: {|
		author?: Resolver<Salary, {}, User>,
		company?: Resolver<Salary, {}, Company>,
	|},

	User: {|
		role?: Resolver<User, {}, string>,
		company?: Resolver<User, {}, ?Company>,
		reviews?: Resolver<User, PgnArgs, [Review]>,
		comments?: Resolver<User, PgnArgs, [Comment]>,
		votes?: Resolver<User, PgnArgs, [Vote]>,
	|},

	VoteSubject: {|
		__resolveType?: (VoteSubject, Context, mixed) => "Comment" | "Review",
	|},

	Vote: {|
		id?: Resolver<Vote, {}, string>,
		isUpvote?: Resolver<Vote, {}, boolean>,
		author?: Resolver<Vote, {}, User>,
		subject?: Resolver<Vote, {}, ?VoteSubject>,
	|},

	DateTime: typeof GraphQLDateTime,
|};
