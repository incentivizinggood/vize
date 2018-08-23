export const castToNumberIfDefined = function(number) {
	return number === undefined || number === null ? number : Number(number);
};

export const processLocation = function(location) {
	/*
		location is expected to be a JSON
		string with the following format:
		{
			city: String
			address: String
			industrialHub: String
		}
		Right now we parse it with the purpose
		of giving back only the industrialHub.
		However, if one of the other two fields
		is defined, then we prefer first the
		city, and then the address. If none of
		these fields are defined, then there has
		been an error in one of the database
		functions. However, ince the underlying
		tables all force locations to be of type
		text, we can just return location since
		we know it will be a valid String, and
		that is all that GraphQL and the frontend
		are expecting at this point.
	*/
	let returnVal = "";
	try {
		const locationObj = JSON.parse(location);
		if (locationObj.industrialHub !== undefined)
			returnVal = locationObj.industrialHub;
		else if (locationObj.city !== undefined) returnVal = locationObj.city;
		else if (locationObj.address !== undefined)
			returnVal = locationObj.address;
	} catch (e) {
		returnVal = location;
	}

	if (returnVal === "") return location;
	return returnVal;
};
