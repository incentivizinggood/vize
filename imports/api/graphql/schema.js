export const typeDefs = [
	`
enum UserRole {
	WORKER
	COMPANY
	COMPANY_UNVERIFIED
}

type User {
	id: String!
	username: String!
	role: UserRole!
}

type Query {
	say: String!
	user(id: ID!): User
	currentUser: User
}
`,
];
