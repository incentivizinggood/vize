import { Meteor } from "meteor/meteor";

import { execTransactionRW } from "imports/api/connectors/postgresql";

import { UserId, User } from "imports/api/models";

export function createUser(userParams: unknown): User {
	throw new Error("Not implemented yet");
}

export function editUser(id: UserId, userChanges: unknown): User {
	throw new Error("Not implemented yet");
}

export function deleteUser(id: UserId): User {
	throw new Error("Not implemented yet");
}
