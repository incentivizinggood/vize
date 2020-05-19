import faker from "faker";
import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie/node-fetch";
import toughCookie from "tough-cookie";
import { execute, makePromise, GraphQLRequest } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

import * as randomInputs from "./random-inputs";
import { repeatInParallel, ignoreExceptions } from "./util";

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
	companies: [],
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

const CREATE_COMPANY = gql`
	mutation createCompany($input: CreateCompanyInput!) {
		createCompany(input: $input) {
			company {
				id
				name
				contactEmail
				yearEstablished
				numEmployees
				industry
				contactPhoneNumber
				websiteURL
				descriptionOfCompany
				dateJoined
			}
		}
	}
`;

async function createCompany(session, specifiedInput = {}) {
	const operation: GraphQLRequest = {
		query: CREATE_COMPANY,
		variables: {
			input: {
				...randomInputs.companyInput(),
				...specifiedInput,
			},
		},
	};

	const res = await session.graphql(operation);

	createdData.companies.push(res.data.createCompany.company);
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
	// Write reviews for companies that may not exist yet.
	await repeatInParallel(
		10,
		ignoreExceptions(async () => {
			const s = newSession();
			await registerUser(s, { role: "worker" });
			await writeReview(s);
		})
	);

	// Create companies.
	await repeatInParallel(
		10,
		ignoreExceptions(async () => {
			const s = newSession();
			await registerUser(s, { role: "company" });
			await createCompany(s);
		})
	);

	// Write reviews for companies that definitely do exist.
	await repeatInParallel(
		10,
		ignoreExceptions(async () => {
			const s = newSession();
			await registerUser(s, { role: "worker" });
			await writeReview(s, {
				companyName: faker.random.arrayElement<any>(
					createdData.companies
				).name,
			});
		})
	);

	console.log(JSON.stringify(createdData, null, 2));
}

main();
