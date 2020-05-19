import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie/node-fetch";
import toughCookie from "tough-cookie";
import { execute, makePromise, GraphQLRequest } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

import * as randomInputs from "./random-inputs";

const baseUrl = "http://localhost:3000";

function newSession() {
	const fetch: typeof nodeFetch = fetchCookie(
		nodeFetch,
		new toughCookie.CookieJar()
	);

	const link = new HttpLink({
		uri: `${baseUrl}/graphql`,
		fetch: fetch as any,
	});

	const graphql = (operation: GraphQLRequest) =>
		makePromise(execute(link, operation));

	return {
		fetch,
		graphql,
	};
}

const createdData: any = {
	users: [],
	reviews: [],
};

const CREATE_REVIEW = gql`
	mutation createReview($reviewInput: CreateReviewInput!) {
		createReview(input: $reviewInput) {
			review {
				id
				company {
					name
				}
				title
				jobTitle
				location {
					address
					city
					industrialHub
				}
				numberOfMonthsWorked
				contractType
				employmentStatus
				pros
				cons
				wouldRecommendToOtherJobSeekers
				additionalComments
				created
				upvotes
				downvotes
				currentUserVote {
					isUpvote
				}
			}
		}
	}
`;

async function writeReview(session, specifiedInput = {}) {
	const operation: GraphQLRequest = {
		query: CREATE_REVIEW,
		variables: {
			reviewInput: {
				...randomInputs.reviewInput(),
				...specifiedInput,
			},
		},
	};

	const res = await session.graphql(operation);

	createdData.reviews.push(res.data.createReview.review);
}

async function registerUser(session, specifiedInput = {}) {
	const body = {
		...randomInputs.registerUser(),
		...specifiedInput,
	};

	const j = await session
		.fetch(`${baseUrl}/register`, {
			method: "POST",
			body: JSON.stringify(body),
			headers: { "Content-Type": "application/json" },
		})
		.then(res => res.json());

	createdData.users.push({ ...body, id: j.user.id });
}

async function main() {
	const companySession = newSession();
	await registerUser(companySession, { role: "company" });
	//await createCompany();
	const workerSession = newSession();
	await registerUser(workerSession, { role: "worker" });
	await writeReview(workerSession);
	console.log(JSON.stringify(createdData, null, 2));
}

main();
