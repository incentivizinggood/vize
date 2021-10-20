import React from "react";
import { Form, useFormikContext } from "formik";

import { Button } from "src/components/button";
import { FormToolbar, SubmissionError } from "src/components/form-stuff";

interface FormWrapperProps {
	children: any;
	schema: any;
	submissionError: any;
	setSubmissionError: any;
	submitButtonText: any;
}

// A wrapper for every form that we use
function FormWrapper({
	children,
	schema,
	submissionError,
	setSubmissionError,
	submitButtonText: T,
}: FormWrapperProps): any {
	const { values }: any = useFormikContext();

	function checkError(): void {
		schema
			.validate(values, { abortEarly: false })
			.then(function () {
				// Success
			})
			.catch(function (err: any) {
				let errorMessage = "Error: ";
				const errors = err.inner;

				for (const error of errors) {
					if (
						error.type !== "typeError" &&
						!error.message.includes("must be at least 1 characters")
					) {
						errorMessage += error.message;
						break;
					}
				}

				if (errorMessage === "Error: ")
					errorMessage =
						"Hay un error en esta encuesta. Por favor encuentra el campo con el error para areglarlo.";
				console.log("em", errorMessage);
				console.log("err", err);
				setSubmissionError(errorMessage);
			});
	}

	return (
		<Form noValidate>
			{children}

			<SubmissionError error={submissionError} />

			<br />

			<FormToolbar>
				<T
					renderer={(submitButtonText: any) => (
						<Button
							$primary
							onClick={checkError}
							type="submit"
							style={{ fontSize: "21px" }}
						>
							{submitButtonText}
						</Button>
					)}
				/>
			</FormToolbar>
		</Form>
	);
}

export default FormWrapper;
