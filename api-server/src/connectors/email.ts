import axios from "axios";

type TemplateParams = {
	2: {
		companyName: string;
		jobTitle: string;
		jobAdId: string;
		applicantEmail: string;
		applicantName: string;
		phoneNumber: string;
		coverLetter: string | null;
	};
	3: {
		companyName: string;
		jobTitle: string;
		applicantName: string;
		companyId: string;
		jobAdId: string;
		readEmployerReviews: string;
	};
	4: {
		passwordResetRequestId: string | number;
	};
};

export interface EmailConfig<TID extends keyof TemplateParams> {
	templateId: TID;
	to: string;
	params: TemplateParams[TID];
}

/**
 * Send an email via Sendinmail.
 * The text for the message can be found on the Sendinmail website (message Julian for access)
 */
export async function sendEmail<TID extends keyof TemplateParams>({
	templateId,
	to,
	params,
}: EmailConfig<TID>): Promise<void> {
	if (process.env.MAIL_API_KEY) {
		try {
			const response = await axios({
				method: "POST",
				url: "https://api.sendinblue.com/v3/smtp/email",
				headers: {
					"api-key": process.env.MAIL_API_KEY,
				},
				data: {
					sender: {
						name: "Julian Alvarez de Vize",
						email: "jalvarez@vize.mx",
					},
					to: [{ email: to }],
					templateId: templateId,
					params: params,
				},
			});

			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	} else {
		console.warn(
			"Could not send email because MAIL_API_KEY was not set.",
			"The message you tried to send was",
			{ templateId, to, params }
		);
	}
}
