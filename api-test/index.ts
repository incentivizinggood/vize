import faker from "faker";
import fetch from "node-fetch";

const createdData = {
	users: [],
};

async function registerUser() {
	const body = {
		username: faker.internet.userName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		role: faker.random.arrayElement(["worker", "company"]),
	};

	const j = await fetch("http://localhost:3000/register", {
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

main();
