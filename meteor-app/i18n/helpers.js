import i18n from "meteor/universe:i18n";

const t = i18n.createTranslator();

export const translateError = (error) => {
	if(typeof error === 'string')
		return (typeof error === 'string') ? error : "";
	else if(typeof error === 'object') {
		const { key, args } = error;
		if(args.label !== undefined)
			args.label = t(args.label);
		return t(key, args);
	}
	return undefined;
};

export const i18nReq = (labelId) => ({
		key: "SimpleSchema.messages.defaults.required",
		args: {label: `SimpleSchema.labels.${labelId}`}
	});

export const i18nMinString = (labelId, _min) => ({
		key: "SimpleSchema.messages.defaults.minString",
		args: {label: `SimpleSchema.labels.${labelId}`, min: _min}
	});

export const i18nMinNumber = (labelId, _min) => ({
		key: "SimpleSchema.messages.defaults.minNumber",
		args: {label: `SimpleSchema.labels.${labelId}`, min: _min}
	});

export const i18nMinNumberExclusive = (labelId, _min) => ({
		key: "SimpleSchema.messages.defaults.minNumberExclusive",
		args: {label: `SimpleSchema.labels.${labelId}`, min: _min}
	});

export const i18nMinDate = (labelId, _min) => ({
		key: "SimpleSchema.messages.defaults.minDate",
		args: {label: `SimpleSchema.labels.${labelId}`, min: _min}
	});

export const i18nMinCount = (_minCount) => ({
		key: "SimpleSchema.messages.defaults.minCount",
		args: {minCount: _minCount}
	});

export const i18nMaxString = (labelId, _max) => ({
		key: "SimpleSchema.messages.defaults.maxString",
		args: {label: `SimpleSchema.labels.${labelId}`, max: _max}
	});

export const i18nMaxNumber = (labelId, _max) => ({
		key: "SimpleSchema.messages.defaults.maxNumber",
		args: {label: `SimpleSchema.labels.${labelId}`, max: _max}
	});

export const i18nMaxNumberExclusive = (labelId, _max) => ({
		key: "SimpleSchema.messages.defaults.maxNumberExclusive",
		args: {label: `SimpleSchema.labels.${labelId}`, max: _max}
	});

export const i18nMaxDate = (labelId, _max) => ({
		key: "SimpleSchema.messages.defaults.maxDate",
		args: {label: `SimpleSchema.labels.${labelId}`, max: _max}
	});

export const i18nMaxCount = (_maxCount) => ({
		key: "SimpleSchema.messages.defaults.maxCount",
		args: {maxCount: _maxCount}
	});

export const i18nBadDate = (labelId) => ({
		key: "SimpleSchema.messages.defaults.badDate",
		args: {label: `SimpleSchema.labels.${labelId}`}
	});

export const i18nNoDecimal = (labelId) => ({
		key: "SimpleSchema.messages.defaults.noDecimal",
		args: {label: `SimpleSchema.labels.${labelId}`}
	});

export const i18nNotAllowed = (_value) => ({
		key: "SimpleSchema.messages.defaults.notAllowed",
		args: {value: _value}
	});

export const i18nExpectedType = (labelId, _dataType) => ({
		key: "SimpleSchema.messages.defaults.expectedType",
		args: {label: `SimpleSchema.labels.${labelId}`, dataType: _dataType}
	});
