import * as yup from "yup";

export const locationInputSchema = yup
	.object({
		city: yup.string().required(),
		address: yup.string().required(),
		industrialHub: yup.string(),
	})
	.required();

export const shiftInputSchema = yup
	.object({
		startDay: yup
			.number()
			.integer()
			.min(0)
			.max(6)
			.required("Se requiere el día de inicio del turno"),
		endDay: yup
			.number()
			.integer()
			.min(0)
			.max(6)
			.required("Se requiere el día final del turno"),
		startTime: yup
			.string()
			.required("Se requiere el tiempo que inicia el turno"),
		endTime: yup
			.string()
			.required("Se requiere el tiempo que termina el turno"),
	})
	.required();

// The actual creation of locations is done by the objects that use them.
