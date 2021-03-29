/* eslint-disable no-unused-vars */
import { GraphQLDateTime } from "graphql-iso-date";

// This file is generated by graphql-code-generator. If this file is not found
// or it is causing errors then it may not exist yet or it may be out of date.
// Try generating it with the command `./run.sh i`. (If you are working with
// this code a lot, you may prefer to use `cd meteor-app && npm run gen`
// instead. This command runs faster and ONLY generates the "resolvers-types.ts"
// file.)
import { IResolvers } from "generated/graphql-resolvers";

import { Query } from "./query";
import { Mutation } from "./mutation";
import { Resource } from "./resource";
import { ResourceTopic } from "./resource-topic";
import { CommentParent } from "./comment-parent";
import { Comment } from "./comment";
import { Company } from "./company";
import { JobAd } from "./job-ad";
import { JobApplication } from "./job-application";
import { Review } from "./review";
import { Salary } from "./salary";
import { User } from "./user";
import { VoteSubject } from "./vote-subject";
import { Vote } from "./vote";

export const resolvers: IResolvers = {
	Query,
	Mutation,
	Resource,
	ResourceTopic,
	CommentParent,
	Comment,
	Company,
	JobAd,
	JobApplication,
	Review,
	Salary,
	User,
	VoteSubject,
	Vote,
	DateTime: GraphQLDateTime,
};
