// @flow
import request from "request-promise-native";

opaque type MessageDecoration = string;

export const celebrate: MessageDecoration = ":tada:";
export const inform: MessageDecoration = ":information_source:";
export const warn: MessageDecoration = ":warning:";
export const reportError: MessageDecoration = ":skull_and_crossbones:";

export function postToSlack(
	messageKind: MessageDecoration,
	messageText: string
) {
	const body = {
		text: `${messageKind} ${messageText}`,
		username: `Server at ${process.env.ROOT_URL}`,
		icon_emoji: ":server:",
	};

	const options = {
		method: "POST",
		uri: process.env.SLACK_WEBHOOK_URL,
		body,
		json: true,
	};

	return request(options);
}

// These functions need to be moved to the models after goodbye-autoforms has been merged.

function newUser(user) {
	// TODO: Escape inputs to prevent markdown code injection.

	`A new user has joined Vize. Please welcome \`${user.username}\`.`;
}

// postToSlack(celebrate, "something good happened")
/*
username submitted a review link to review on company name.
A new user has joined vize. please welcome username.
 */
