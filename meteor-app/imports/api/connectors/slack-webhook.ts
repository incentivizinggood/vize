import * as request from "request-promise-native";

/**
 * Post a message to the Vize Slack.
 * @param  {string} text The text of the message.
 *                       Supports markdown and Slack's emoji markup.
 * @todo Escape inputs to prevent markdown code injection.
 */
export function postToSlack(text: string) {
	// Make a JSON representation of the message we want to post.
	// This var is called "body" because it is the body of the HTTP request.
	const body = {
		text,
		// Make this message look like it was posted by this server.
		username: `Server at ${process.env.ROOT_URL}`,
		icon_emoji: ":server:",
	};

	// Post the message to Vize's Slack's WebHook API.
	const options = {
		method: "POST",
		uri: process.env.SLACK_WEBHOOK_URL,
		body,
		json: true,
	};

	// Do not actualy make the request if the URL for Slack's WebHook API has not been set.
	if (process.env.SLACK_WEBHOOK_URL) {
		request(options);
	} else {
		console.warn(
			"Could not post to slack because SLACK_WEBHOOK_URL was not set.",
			"The message you tried to send was",
			text
		);
	}
}
