import faker from "faker";
import { repeat } from "./util";

const nullable = x => (faker.random.boolean() ? x : undefined);

export const registerUser = () => ({
	username: faker.internet.userName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
	role: faker.random.arrayElement(["worker", "company"]),
});

export const locationInput = () => ({
	city: faker.address.city(),
	address: faker.address.streetAddress(),
	industrialHub: nullable(faker.address.state()),
});

export const starRating = () =>
	faker.random.number({
		min: 0,
		max: 5,
	});

export const reviewInput = () => ({
	companyName: faker.company.companyName(),
	reviewTitle: faker.lorem.words(3),
	location: locationInput(),
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
	healthAndSafety: starRating(),
	managerRelationship: starRating(),
	workEnvironment: starRating(),
	benefits: starRating(),
	overallSatisfaction: starRating(),
	additionalComments: nullable(faker.lorem.paragraph()),
});

export const companyInput = () => ({
	name: faker.company.companyName(),
	contactEmail: faker.internet.email(),
	contactPhoneNumber: nullable(faker.phone.phoneNumber()),
	yearEstablished: nullable(
		faker.random.number({
			min: 1,
			max: new Date().getUTCFullYear(),
		})
	),
	numEmployees: nullable(
		faker.random.arrayElement([
			"1 - 50",
			"51 - 500",
			"501 - 2000",
			"2001 - 5000",
			"5000+",
		])
	),
	industry: nullable(faker.commerce.department()),
	locations: repeat(
		faker.random.number({
			min: 1,
			max: 5,
		}),
		locationInput
	),
	websiteURL: nullable(faker.internet.url()),
	descriptionOfCompany: nullable(
		faker.lorem.paragraph(
			faker.random.number({
				min: 1,
				max: 12,
			})
		)
	),
});
