/*
	NOTE
	This file is the result of me trying to decouple
	the forms from the schemas from the error translation
	from Meteor's internationalization package. It's
	been a heckuva job, but the helpers in this file
	can be used to generate arguments to *any given*
	translation package (if rewritten) and "re-translate"
	the results, with the outside code not having to know
	about the translation package.
	You will notice, if you have looked at the new form
	code, that this (what is being done for error translation)
	is significantly more difficult and complex than what
	was done for the label translation.
	Labels are pieces of text that don't change. You can
	make one call to the translator, with the correct
	arguments (which do not change), and if that call is
	in a reactive context then it will update reactively.
	Error messages, however, are parameterized, and
	they are only ever set inside the schema package,
	which is not reactive in the slightest. The translator
	will be called once, with the locale that happens
	to be set when the schema is compiled, and that will
	be that. No reactively translated error messages
	that way.
	SimpleSchema got around this with Tracker and messageBox.
	Yup is not so well-integrated with ecosystem (thank God).
	So what I'm doing in this file is defining two halves
	to the translation layer, one above the schema and one
	below it. The one above the schema takes all arguments
	and packages them into something the layer below the
	schema can unpackage and carefully feed to the translator.
	The layer above the schema is defined by the i18n* functions
	exported by this file, and you can see it in action in
	imports/api/data/yup-schemas.js, where it is used to define
	the errors that Yup throws for any given problem.
	The layer below the schema is defined by translateError,
	which is called *once* (as of this writing) by the
	withVizeFormatting HOC in
	imports/ui/components/vize-formik-components.jsx,
	in which context it is responsible for the final translation
	of the error messages. However, it can also be used in
	other contexts to convert errors to a more human-friendly
	format.
	I can only hope I'm not overthinking this, in my mind
	this just seems like the logical way to get us out of
	the mess we got ourselves into by how we chose to use
	Meteor and its package system early on.
*/

import i18n from "meteor/universe:i18n";

const t = i18n.createTranslator();

export const translateError = (error) => {
	console.log(error);
	if(typeof error === 'string')
		return (typeof error === 'string') ? error : "";
	else if(typeof error === 'object') {
		const { key, args } = error;
		if(key !== undefined && args !== undefined) {
			if(args.label !== undefined)
				args.label = t(args.label);
			if(args.dataType !== undefined)
				args.dataType = t(args.dataType);
			return t(key, args);
		}
	}
	return "";
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

// Oh my goodness, will I ever need to translate data types?
// What will need to be supported? This is horrifying...
// I'm going to assume for now that anyone who cares about data
// types is a programmer and therefore speaks English.
// On the other hand...I could just make a list based on
// the things I find myself using it for, and I can think
// of a few places where it might be needed already. They would
// have to be under SimpleSchema.dataTypes, which would fortunately
// be a very simple sub-namespace.
// Okay, fine then:
// Types to support:
// - boolean
// - string
// - number
// - date
// - object
// - array
export const i18nTypeError = {
	boolean: (labelId) => ({
			key: "SimpleSchema.messages.defaults.expectedType",
			args: {label: `SimpleSchema.labels.${labelId}`, dataType: "SimpleSchema.dataTypes.boolean"}
		}),
	string: (labelId) => ({
			key: "SimpleSchema.messages.defaults.expectedType",
			args: {label: `SimpleSchema.labels.${labelId}`, dataType: "SimpleSchema.dataTypes.string"}
		}),
	number: (labelId) => ({
			key: "SimpleSchema.messages.defaults.expectedType",
			args: {label: `SimpleSchema.labels.${labelId}`, dataType: "SimpleSchema.dataTypes.number"}
		}),
	date: (labelId) => ({
			key: "SimpleSchema.messages.defaults.expectedType",
			args: {label: `SimpleSchema.labels.${labelId}`, dataType: "SimpleSchema.dataTypes.date"}
		}),
	object: (labelId) => ({
			key: "SimpleSchema.messages.defaults.expectedType",
			args: {label: `SimpleSchema.labels.${labelId}`, dataType: "SimpleSchema.dataTypes.array"}
		}),
	array: (labelId) => ({
			key: "SimpleSchema.messages.defaults.expectedType",
			args: {label: `SimpleSchema.labels.${labelId}`, dataType: "SimpleSchema.dataTypes.object"}
		}),
}

export const i18nRegEx = {
	msg: (labelId) => ({
			key: "SimpleSchema.messages.defaults.regEx.msg",
			args: {label: `SimpleSchema.labels.${labelId}`}
		}),
	Email: (labelId) => ({
			key: "SimpleSchema.messages.defaults.regEx.Email",
			args: {label: `SimpleSchema.labels.${labelId}`}
		}),
	EmailWithTLD: (labelId) => ({
			key: "SimpleSchema.messages.defaults.regEx.EmailWithTLD",
			args: {label: `SimpleSchema.labels.${labelId}`}
		}),
	Domain: (labelId) => ({
			key: "SimpleSchema.messages.defaults.regEx.Domain",
			args: {label: `SimpleSchema.labels.${labelId}`}
		}),
	WeakDomain: (labelId) => ({
			key: "SimpleSchema.messages.defaults.regEx.WeakDomain",
			args: {label: `SimpleSchema.labels.${labelId}`}
		}),
	IP: (labelId) => ({
			key: "SimpleSchema.messages.defaults.regEx.IP",
			args: {label: `SimpleSchema.labels.${labelId}`}
		}),
	IPv4: (labelId) => ({
			key: "SimpleSchema.messages.defaults.regEx.IPv4",
			args: {label: `SimpleSchema.labels.${labelId}`}
		}),
	IPv6: (labelId) => ({
			key: "SimpleSchema.messages.defaults.regEx.IPv6",
			args: {label: `SimpleSchema.labels.${labelId}`}
		}),
	Url: (labelId) => ({
			key: "SimpleSchema.messages.defaults.regEx.Url",
			args: {label: `SimpleSchema.labels.${labelId}`}
		}),
	Id: (labelId) => ({
			key: "SimpleSchema.messages.defaults.regEx.Id",
			args: {label: `SimpleSchema.labels.${labelId}`}
		}),
	ZipCode: (labelId) => ({
			key: "SimpleSchema.messages.defaults.regEx.ZipCode",
			args: {label: `SimpleSchema.labels.${labelId}`}
		}),
	Phone: (labelId) => ({
			key: "SimpleSchema.messages.defaults.regEx.Phone",
			args: {label: `SimpleSchema.labels.${labelId}`}
		}),
};
