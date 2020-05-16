import faker from "faker";
import fetch from "node-fetch";
import { execute, makePromise } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";

const baseUrl = "http://localhost:3000";

const link = new HttpLink({ uri: `${baseUrl}/graphql`, fetch: fetch as any });

const createdData: any = {
	users: [],
};

const operation = {
	query: gql`
		query {
			say
		}
	`,
};

// For single execution operations, a Promise can be used
makePromise(execute(link, operation))
	.then(data => console.log(`received data ${JSON.stringify(data, null, 2)}`))
	.catch(error => console.log(`received error ${error}`));

async function registerUser() {
	const body = {
		username: faker.internet.userName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		role: faker.random.arrayElement(["worker", "company"]),
	};

	const j = await fetch(`${baseUrl}/register`, {
		method: "POST",
		body: JSON.stringify(body),
		headers: { "Content-Type": "application/json" },
	}).then(res => res.json());

	createdData.users.push({ ...body, id: j.user.id });
}

async function main() {
	const waitingon = [];

	for (let i = 0; i < 20; ++i) {
		waitingon.push(registerUser());
	}

	await Promise.all(waitingon);

	console.log(createdData);
}

//main();
