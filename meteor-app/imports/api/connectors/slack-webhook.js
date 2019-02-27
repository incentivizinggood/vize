// @flow
import request from "request-promise-native";

opaque type MessageDecoration = string;

export const celebrate: MessageDecoration = ":tada:";
export const inform: MessageDecoration = ":information_source:";
export const warn: MessageDecoration = ":warning:";
export const reportError: MessageDecoration = ":skull_and_crossbones:";

// TODO: Escape inputs to prevent markdown code injection.
export function postToSlack(text: string) {
	const body = {
		text,
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
