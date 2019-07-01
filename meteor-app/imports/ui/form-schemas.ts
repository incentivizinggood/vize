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
