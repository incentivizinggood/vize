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
