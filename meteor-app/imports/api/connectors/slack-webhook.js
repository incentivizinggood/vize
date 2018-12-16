// @flow
import request from "request-promise-native";

opaque type MessageText = string;
opaque type Message = {|
	text: string,
	username: string,
	icon_emoji?: string,
	icon_url?: string,
|};

function buildMessageTypes(f: MessageText => Message) {
	const wrap = (mt: string => MessageText) => (text: string) => f(mt(text));
	return {
		celebrate: wrap(text => `:tada: ${text}`),
		inform: wrap(text => `:information_source: ${text}`),
		warn: wrap(text => `:warning: ${text}`),
		reportError: wrap(text => `:skull_and_crossbones: ${text}`),
	};
}

function buildMessageSources(f: Message => any) {
	const wrap = (ms: MessageText => Message) =>
		buildMessageTypes(messageText => f(ms(messageText)));
	return {
		asThisServer: wrap(messageText => ({
			text: messageText,
			username: `Server at ${process.env.ROOT_URL}`,
			icon_emoji: ":server:",
		})),
	};
}

function buildPostToSlack() {
	return buildMessageSources(message => {
		const options = {
			method: "POST",
			uri: process.env.SLACK_WEBHOOK_URL,
			body: message,
			json: true,
		};

		return request(options);
	});
}

// Transform function compositions into an object hiegharchy.
// instead of having to write postToSlack(asThisServer(celebrate(text)))
// one would write postToSlack.asThisServer.celebrate(text)
const postToSlack = buildPostToSlack();

postToSlack.asThisServer.celebrate("This pattern");

export default postToSlack;
