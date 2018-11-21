// @flow
import { Meteor } from "meteor/meteor";

import { execTransactionRW } from "/imports/api/connectors/postgresql.js";

import type { ID, User } from ".";

export function createUser(userParams: mixed): User {
	throw new Error("Not implemented yet");
}

export function editUser(id: ID, userChanges: mixed): User {
	throw new Error("Not implemented yet");
}

export function deleteUser(id: ID): User {
	throw new Error("Not implemented yet");
}
