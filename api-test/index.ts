import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie/node-fetch";
import toughCookie from "tough-cookie";
import { execute, makePromise, GraphQLRequest } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

import * as randomInputs from "./random-inputs";

const baseUrl = "http://localhost:3000";

const fetch = fetchCookie(nodeFetch, new toughCookie.CookieJar());

const link = new HttpLink({ uri: `${baseUrl}/graphql`, fetch: fetch as any });

const createdData: any = {
	users: [],
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

async function writeReview(specifiedInput = {}) {
	const operation: GraphQLRequest = {
		query: CREATE_REVIEW,
		variables: {
			reviewInput: {
				...randomInputs.reviewInput(),
				...specifiedInput,
			},
		},
	};

	makePromise(execute(link, operation))
		.then(data =>
			console.log(`received data ${JSON.stringify(data, null, 2)}`)
		)
		.catch(error => console.log(`received error ${error}`));
}

async function registerUser(specifiedInput = {}) {
	const body = {
		...randomInputs.registerUser(),
		...specifiedInput,
	};

	const j = await fetch(`${baseUrl}/register`, {
		method: "POST",
		body: JSON.stringify(body),
		headers: { "Content-Type": "application/json" },
	}).then(res => res.json());

	createdData.users.push({ ...body, id: j.user.id });
}

async function main() {
	/*const waitingon = [];

	for (let i = 0; i < 20; ++i) {
		waitingon.push(registerUser());
	}

	await Promise.all(waitingon);*/
	await registerUser({ role: "worker" });
	await writeReview();
	console.log(createdData);
}

main();
