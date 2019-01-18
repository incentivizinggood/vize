// @flow

export type Location = {|
	city: string,
	address: string,
	industrialHub: ?string,
|};

export opaque type LocationString = string;

export function parseLocationString(str: LocationString): Location {
	return JSON.parse(str);
}
