// @flow
import { Meteor } from "meteor/meteor";

import { execTransactionRW } from "/imports/api/connectors/postgresql.ts";

import type { UserId, User } from ".";

export function createUser(userParams: mixed): User {
	throw new Error("Not implemented yet");
}

export function editUser(id: UserId, userChanges: mixed): User {
	throw new Error("Not implemented yet");
}

export function deleteUser(id: UserId): User {
	throw new Error("Not implemented yet");
}
