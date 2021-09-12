import React from "react";
import { TextField } from "formik-material-ui";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useField, useFormikContext } from "formik";
import styled from "styled-components";
import { useCompanyNameInputQuery } from "generated/graphql-operations";

interface CompanyNameInputProps {
	name: string;
	required?: boolean;
	label: string;
	placeholder: string;
}
const FormikFieldWrapper = styled.div`
	.MuiAutocomplete-inputRoot {
		margin-top: 10px;
		border-radius: 10px;
		background-color: #f0f8ff;
	}
	.MuiOutlinedInput-notchedOutline {
		border: 1px solid #dcdcdc !important;
	}
`;
const FieldHeading = styled.p`
	font-size: 0.9rem;
	.optional {
		color: red;
	}
`;

export function CompanyNameInput(props: CompanyNameInputProps): JSX.Element {
	const form = useFormikContext();
	const [field, meta, helpers] = useField<string>(props.name);

	const [open, setOpen] = React.useState<boolean>(false);

	const { loading, data } = useCompanyNameInputQuery({
		skip: !open,
		variables: { partialCompanyName: field.value },
	});

	const options = data ? data.companyNameSuggestions : [];

	return (
		<Autocomplete<string, false, false, true>
			multiple={false}
			disableClearable={false}
			freeSolo={true}
			style={{ width: "100%" }}
			value={field.value}
			onChange={(_event, value, _reason) => helpers.setValue(value || "")}
			open={open}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			getOptionSelected={(option, value) => option === value}
			getOptionLabel={(option) => option}
			options={options}
			loading={loading}
			renderInput={(params) => (
				<FormikFieldWrapper>
					<FieldHeading>
						{props.label + (props.required ? " *" : "")}
					</FieldHeading>
					<TextField
						{...params}
						field={field}
						form={form}
						meta={meta}
						placeholder={props.placeholder}
						variant="outlined"
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<React.Fragment>
									{loading ? (
										<CircularProgress
											color="inherit"
											size={20}
										/>
									) : null}
									{params.InputProps.endAdornment}
								</React.Fragment>
							),
						}}
					/>
				</FormikFieldWrapper>
			)}
		/>
	);
}
