/*
	A lot of times we need to convert a String to a Number,
	and some of those times the field we need to convert is
	not guaranteed to be defined, which causes the Number
	cast to throw an exception. castToNumberIfDefined is used to
	avoid that scenario, particularly in the process[Type]Results
	functions found in the other classes defined in the other
	files found in this directory.
*/
export const castToNumberIfDefined = function(number) {
	return number === undefined || number === null ? number : Number(number);
};

/*
	The purpose of processLocation is to parse
	Locations as they are stored in PostgreSQL
	into a format that is palatable to the frontend
	and/or GraphQL. We have the peculiar situation
	where Locations are stored as JSON strings in
	the backend, are expected to be JSON objects by
	GraphQL and SimpleSchema, and human-readable
	(i.e. not JSON) strings on the frontend. The
	process[Type]Results helper functions in the
	rest of this directory are supposed to convert
	database query results into something that makes
	sense to GraphQL, while this function is currently
	used to turn GraphQL results into what the frontend
	wants, which for now is just the industrialHub.

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
	functions. However, since the underlying
	tables all force locations to be of type
	text, we can just return location since
	we know it will be a valid String, and
	that is all that GraphQL and the frontend
	would be expecting.
*/
export const processLocation = function(location) {
	let returnVal = "";

	try {
		const locationObj = JSON.parse(location);

		if (
			locationObj.industrialHub !== undefined &&
			locationObj.industrialHub !== null &&
			locationObj.industrialHub !== "-" &&
			locationObj.industrialHub !== "(unknown or not provided by user)"
		)
			returnVal = locationObj.industrialHub;
		else if (
			locationObj.city !== undefined &&
			locationObj.city !== null &&
			locationObj.city !== "-" &&
			locationObj.city !== "(unknown or not provided by user)"
		)
			returnVal = locationObj.city;
		else if (
			locationObj.address !== undefined &&
			locationObj.address !== null &&
			locationObj.address !== "-" &&
			locationObj.address !== "(unknown or not provided by user)"
		)
			returnVal = locationObj.address;
	} catch (e) {
		returnVal = location;
	}

	if (returnVal === "") {
		return location;
	}

	return returnVal;
};
