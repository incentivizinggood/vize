import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";
import { AutoForm } from "meteor/aldeed:autoform";

SimpleSchema.extendOptions(["autoform"]); // gives us the "autoform" schema option

const LocationSchema = new SimpleSchema(
	{
		city: {
			type: String,
			max: 150,
			optional: false,
			autoform: {
				afFieldInput: {
					type: "text",
				},
			},
		},
		address: {
			type: String,
			max: 150,
			optional: true,
			autoform: {
				afFieldInput: {
					type: "text",
				},
			},
		},
		industrialHub: {
			type: String,
			max: 150,
			optional: true,
			autoform: {
				afFieldInput: {
					type: "text",
				},
			},
		},
	},
	{ tracker: Tracker }
);

export default LocationSchema;
