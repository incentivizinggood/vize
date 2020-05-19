import faker from "faker";
import nodeFetch from "node-fetch";
import fetchCookie from "fetch-cookie/node-fetch";
import toughCookie from "tough-cookie";
import { execute, makePromise, GraphQLRequest } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

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

async function writeReview() {
	const operation: GraphQLRequest = {
		query: CREATE_REVIEW,
		variables: {
			reviewInput: {
				companyName: faker.company.companyName(),
				reviewTitle: faker.lorem.words(3),
				location: {
					city: faker.address.city(),
					address: faker.address.streetAddress(),
				},
				jobTitle: faker.name.jobTitle(),
				numberOfMonthsWorked: faker.random.number({ min: 1, max: 24 }),
				contractType: faker.random.arrayElement([
					"FULL_TIME",
					"PART_TIME",
					"INTERNSHIP",
					"TEMPORARY",
					"CONTRACTOR",
				]),
				employmentStatus: faker.random.arrayElement([
					"FORMER",
					"CURRENT",
				]),
				pros: faker.lorem.words(5),
				cons: faker.lorem.words(5),
				wouldRecommendToOtherJobSeekers: faker.random.boolean(),
				healthAndSafety: faker.random.number({
					min: 0,
					max: 5,
					precision: 1,
				}),
				managerRelationship: faker.random.number({
					min: 0,
					max: 5,
					precision: 1,
				}),
				workEnvironment: faker.random.number({
					min: 0,
					max: 5,
					precision: 1,
				}),
				benefits: faker.random.number({ min: 0, max: 5, precision: 1 }),
				overallSatisfaction: faker.random.number({
					min: 0,
					max: 5,
					precision: 1,
				}),
				additionalComments: faker.lorem.paragraph(),
			},
		},
	};

	// For single execution operations, a Promise can be used
	makePromise(execute(link, operation))
		.then(data =>
			console.log(`received data ${JSON.stringify(data, null, 2)}`)
		)
		.catch(error => console.log(`received error ${error}`));
}

async function registerUser() {
	const body = {
		username: faker.internet.userName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		role: "worker", //faker.random.arrayElement(["worker", "company"]),
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
	await registerUser();
	await writeReview();
	console.log(createdData);
}

main();
