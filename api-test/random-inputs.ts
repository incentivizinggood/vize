import faker from "faker";

export const registerUser = () => ({
	username: faker.internet.userName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
	role: faker.random.arrayElement(["worker", "company"]),
});

export const reviewInput = () => ({
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
	employmentStatus: faker.random.arrayElement(["FORMER", "CURRENT"]),
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
});

function foomak<T>(n: number, f: () => T): T[] {
	const x = [];
	for (let i = 0; i < n; ++i) {
		x.push(f());
	}
	return x;
}

export const companyInput = () => ({
	name: faker.company.companyName(),
	contactEmail: faker.internet.email(),
	contactPhoneNumber: faker.phone.phoneNumber(),
	yearEstablished: faker.random.number({
		min: 1,
		max: new Date().getUTCFullYear(),
		precision: 1,
	}),
	numEmployees: faker.random.arrayElement([
		"1 - 50",
		"51 - 500",
		"501 - 2000",
		"2001 - 5000",
		"5000+",
	]),
	industry: faker.commerce.department(),
	locations: foomak(
		faker.random.number({
			min: 1,
			max: 5,
			precision: 1,
		}),
		() => ({
			city: faker.address.city(),
			address: faker.address.streetAddress(),
		})
	),
	websiteURL: faker.internet.url(),
	descriptionOfCompany: faker.lorem.paragraph(),
});
