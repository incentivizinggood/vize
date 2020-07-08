import * as yup from "yup";

export type LocationInput = {
	city: string;
	address: string;
	industrialHub?: string | null;
};

export const locationInputSchema = yup
	.object({
		city: yup.string().required(),
		address: yup.string().required(),
		industrialHub: yup.string(),
	})
	.required();
