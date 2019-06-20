import * as yup from "yup";

type LocationInput = {
	city: string;
	address: string;
	industrialHub?: string;
};

namespace LocationInput {
	export const schema = yup.object({
		city: yup.string().required(),
		address: yup.string().required(),
		industrialHub: yup.string(),
	});
}

export default LocationInput;