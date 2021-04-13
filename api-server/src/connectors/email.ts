import request from "request-promise-native";
interface EmailConfig {
	templateId: number;
	to: string;
	params: any;
}

/**
 * Send an email via Sendinmail.
 * The text for the message can be found on the Sendinmail website (message Julian for access)
 */
export function sendEmail({ templateId, to, params }: EmailConfig): void {
	if (true) {
		const headers = {
			accept: "application/json",
			"api-key":
				"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",
			"content-type": "application/json",
		};

		const dataString = `{ 
					"sender":{ 
						"name":"Julian Alvarez de Vize", 
						"email":"jalvarez@vize.mx" 
					}, 
					"to":[ { 
						"email":"julianjear10@gmail.com"
					} ],
					"templateId": ${templateId},
					"params": ${params}
				}
			`;

		var options = {
			url: "https://api.sendinblue.com/v3/smtp/email",
			method: "POST",
			headers: headers,
			body: dataString,
		};

		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body);
			}
		}

		request(options, callback);
	} else {
		console.warn(
			"Could not send email because MAIL_API_KEY was not set.",
			"The message you tried to send was",
			{ templateId, to, params }
		);
	}
}
