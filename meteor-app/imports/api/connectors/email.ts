import request from "request-promise-native";

/**
 * Send an email via MailGun.
 * @param  {string} text The text of the message.
 *                       Supports markdown and Slack's emoji markup.
 * @todo Escape inputs to prevent markdown code injection.
 */

export function sendEmail({ to, subject, text }) {
	// Do not actualy make the request if the MAIL_API_KEY is not set.
	if (process.env.MAIL_API_KEY) {
		// Make a JSON representation of the message we want to post in the email.
		// the form is the actual body of the request.
		var options = {
			method: "POST",
			uri: "https://api.mailgun.net/v3/mg.incentivizinggood.com/messages",

			auth: {
				user: "api",
				pass: process.env.MAIL_API_KEY,
			},

			form: {
				from: "Vize Flag <mailgun@mg.incentivizinggood.com>",
				to,
				subject,
				text,
			},

			headers: {},
		};

		request(options);
	} else {
		console.warn(
			"Could not send email because MAIL_API_KEY was not set.",
			"The message you tried to send was",
			{ to, subject, text }
		);
	}
}
