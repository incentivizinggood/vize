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
