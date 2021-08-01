import * as yup from "yup";

/*
 * These are schemas for validating user input on the client side.
 */

export const username = yup
	.string()
	.trim()
	.min(1)
	.max(32);

export const password = yup
	.string()
	.min(1)
	.max(256);

export const companyName = yup
	.string()
	.trim()
	.min(1)
	.max(100);

export const locationSchema = yup.object().shape({
	city: yup
		.string()
		.max(300)
		.required("Se requiere la ciudad"),
	address: yup
		.string()
		.max(300)
		.required("Se requiere la dirección"),
	industrialHub: yup.string().max(300),
});

export const workExperienceSchema = yup.object().shape({
	jobTitle: yup.string().required("Se requiere el puesto de trabajo"),
	companyName: yup.string().required("Se requiere el nombre de la empresa"),
	city: yup.string().required("Se requiere el nombre de la ciudad"),
	startDateMonth: yup.string().required("Se requiere el mes"),
	startDateYear: yup.number().required("Se requiere el año"),
	endDateMonth: yup.string().test({
		name: "end-date-month-after-start-date-check",
		exclusive: false,
		message:
			"La fecha de finalización debe de ser despues de la fecha de comienzo",
		test: function(value) {
			if (
				this.parent.startDateYear &&
				this.parent.startDateMonth &&
				this.parent.endDateYear &&
				value
			) {
				const startDate = new Date(
					this.parent.startDateYear,
					this.parent.startDateMonth,
					1
				).toISOString();
				const endDate = new Date(
					this.parent.endDateYear,
					value,
					1
				).toISOString();
				return startDate < endDate;
			} else {
				return true;
			}
		},
	}),
	endDateYear: yup.number().test({
		name: "end-date-year-after-start-date-check",
		exclusive: false,
		message:
			"La fecha de finalización debe de ser despues de la fecha de comienzo",
		test: function(value) {
			if (
				this.parent.startDateYear &&
				this.parent.startDateMonth &&
				this.parent.endDateMonth &&
				value
			) {
				const startDate = new Date(
					this.parent.startDateYear,
					this.parent.startDateMonth,
					1
				).toISOString();
				const endDate = new Date(
					value,
					this.parent.endDateMonth,
					1
				).toISOString();
				return startDate < endDate;
			} else {
				return true;
			}
		},
	}),
	iCurrentlyWorkHere: yup.boolean(),
	experienceDescription: yup
		.string()
		.required("Se requiere la descripción de la experiencia"),
});
