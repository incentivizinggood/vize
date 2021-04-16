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
	if (process.env.MAIL_API_KEY) {
		const headers = {
			accept: "application/json",
			"api-key": process.env.MAIL_API_KEY,
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

		function callback(error: any, response: any, body: any) {
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
