import request from "request-promise-native";
//import SibApiV3Sdk from "sib-api-v3-typescript";
interface EmailConfig {
	to: string;
	subject: string;
	text: string;
}

/**
 * Send an email via MailGun.
 * @param  {string} text The text of the message.
 *                       Supports markdown and Slack's emoji markup.
 * @todo Escape inputs to prevent markdown code injection.
 */
export function sendEmail({ to, subject, text }: EmailConfig): void {
	// var url = "https://api.sendinblue.com/v3/smtp/email";

	// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

	// var xhr = new XMLHttpRequest();
	// xhr.open("POST", url);

	// xhr.setRequestHeader("accept", "application/json");
	// xhr.setRequestHeader(
	// 	"api-key",
	// 	"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"
	// );
	// xhr.setRequestHeader("content-type", "application/json");

	// xhr.onreadystatechange = function() {
	// 	if (xhr.readyState === 4) {
	// 		console.log(xhr.status);
	// 		console.log(xhr.responseText);
	// 	}
	// };

	// var data = `{
	// "sender":{
	// 	"name":"Sender Alex",
	// 	"email":"senderalex@example.com"
	// },
	// "to":[
	// 	{
	// 		"email":"testmail@example.com",
	// 		"name":"John Doe"
	// 	}
	// ],
	// "subject":"Hello world",
	// "htmlContent":"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>"
	// }`;

	// xhr.send(data);

	//var request = require("request");

	var headers = {
		accept: "application/json",
		"api-key":
			"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",
		"content-type": "application/json",
	};

	var dataString = `{ 
			"sender":{ 
				"name":"Sender Alex", 
				"email":"julianjear10@gmail.com" 
			}, 
			"to":[ { 
				"email":"jalvarez@vize.mx", 
				"name":"John Doe" 
			} ], 
			"subject":"Hello world",
			"htmlContent":"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>" }
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

	// Do not actually make the request if the MAIL_API_KEY is not set.
	// var SibApiV3Sdk = require("sib-api-v3-typescript");
	// let apiInstance = new SibApiV3Sdk.AccountApi();
	// var apiKey = apiInstance.authentications["apiKey"];
	// apiKey.apiKey =
	// 	"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";

	// apiInstance.getAccount().then(
	// 	function(data) {
	// 		console.log("API called successfully. Returned data: " + data);
	// 	},
	// 	function(error) {
	// 		console.error(error);
	// 	}
	// );

	// var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

	// var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

	// sendSmtpEmail = {
	// 	to: [
	// 		{
	// 			email: "jalvarez@vize.mx",
	// 			name: "Julian Alvarez",
	// 		},
	// 	],
	// 	sender: [
	// 		{
	// 			email: "julianjear10@gmail.com",
	// 			name: "Julian Restrepo",
	// 		},
	// 	],
	// 	// templateId: 59,
	// 	// params: {
	// 	// 	name: 'John',
	// 	// 	surname: 'Doe'
	// 	// },
	// 	headers: {
	// 		// 'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2'
	// 		accept: "application/json",
	// 		"content-type": "application/json",
	// 	},
	// };

	// apiInstance.sendTransacEmail(sendSmtpEmail).then(
	// 	function(data) {
	// 		console.log("API called successfully. Returned data: " + data);
	// 	},
	// 	function(error) {
	// 		console.error(error);
	// 	}
	// );

	if (true) {
		// if (process.env.MAIL_API_KEY) {
		// Make a JSON representation of the message we want to post in the email.
		// the form is the actual body of the request.
		//var request = require('request');
		// var headers = {
		// 	'accept': 'application/json',
		// 	'api-key': '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',
		// 	'content-type': 'application/json'
		// };
		// var dataString = {
		// 	sender: {
		// 		name: "Sender Alex",
		// 		email: "senderalex@example.com",
		// 	},
		// 	to: [
		// 		{
		// 			email: "testmail@example.com",
		// 			name: "John Doe",
		// 		},
		// 	],
		// 	subject: "Hello world",
		// 	htmlContent:
		// 		"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>",
		// };
		// var options = {
		// 	url: 'https://api.sendinblue.com/v3/smtp/email',
		// 	method: 'POST',
		// 	headers: headers,
		// 	body: dataString
		// };
		// function callback(error, response, body) {
		// 	if (!error && response.statusCode == 200) {
		// 		console.log(body);
		// 	}
		// }
		// request(options, callback);
		// let options = {
		// 	method: "POST",
		// 	url: "https://api.sendinblue.com/v3/smtp/email",
		// 	// auth: {
		// 	// 	user: "api",
		// 	// 	pass: process.env.MAIL_API_KEY,
		// 	// 	// pass: process.env.MAIL_API_KEY,
		// 	// },
		// 	// form: {
		// 	// 	from: "Vize <mailgun@vize.mx>",
		// 	// 	to,
		// 	// 	subject,
		// 	// 	text,
		// 	// },
		// 	data: {
		// 		sender: {
		// 			name: "Julian Retrepo",
		// 			email: "julianjear10@gmail.com",
		// 		},
		// 		to: [
		// 			{
		// 				name: "Julian Alvarez",
		// 				email: "jalvarez@vize.mx",
		// 			},
		// 		],
		// 		subject: "Hello world",
		// 		htmlContent:
		// 			"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>",
		// 	},
		// 	headers: {
		// 		accept: "application/json",
		// 		"api-key":
		// 			"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",
		// 		"content-type": "application/json",
		// 	},
		// };
		// request(options);
	} else {
		console.warn(
			"Could not send email because MAIL_API_KEY was not set.",
			"The message you tried to send was",
			{ to, subject, text }
		);
	}
}
// curl --request POST \
//   --url https://api.sendinblue.com/v3/smtp/email \
//   --header 'accept: application/json' \
//   --header 'api-key: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' \
//   --header 'content-type: application/json' \
//   --data '{
//    "sender":{
//       "name":"Sender Alex",
//       "email":"julianjear10@gmail.com"
//    },
//    "to":[
//       {
//          "email":"jalvarez@vize.mx",
//          "name":"John Doe"
//       }
//    ],
//    "subject":"Hello world",
//    "htmlContent":"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Sendinblue.</p></body></html>"
// }'
