const castToNumberIfDefined = function(number) {
	return number === undefined || number === null ? number : Number(number);
};

export default castToNumberIfDefined;
