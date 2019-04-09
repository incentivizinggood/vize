import * as request from "request-promise-native";

/**
 * Send an email via MailGun.
 * @param  {string} text The text of the message.
 *                       Supports markdown and Slack's emoji markup.
 * @todo Escape inputs to prevent markdown code injection.
 */


export function sendEmail(text: string) {
	// Do not actualy make the request if the URL for Slack's WebHook API has not been set.
	if (process.env.MAIL_API_KEY) {
		// Make a JSON representation of the message we want to post.
		// This var is called "body" because it is the body of the HTTP request.

		// Post the message to Vize's Slack's WebHook API.
    var options = {
        method: 'POST',
        uri: 'https://api.mailgun.net/v3/mg.incentivizinggood.com/messages',

        auth: {
          user:"api",
          pass:process.env.MAIL_API_KEY
        },

        form: {
            from: "Excited User <mailgun@mg.incentivizinggood.com>",
            to:"krit.dce@gmail.com",
            subject:"Hello",
            text:"Testing some Mailgun awesomeness!"
        },

        headers:{

        }
    };

		request(options);
	} else {
		console.warn(
			"Could not send email because MAIL_API_KEY was not set.",
			"The message you tried to send was",
			text
		);
	}
}
