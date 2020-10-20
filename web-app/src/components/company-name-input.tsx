import React from "react";

import { useCompanyNameInputQuery } from "generated/graphql-operations";
import { AutocompleteInput, UseSuggestions } from "./autocomplete-input";

interface CompanyNameInputProps {
	name: string;
	required?: boolean;
	label: string;
	placeholder: string;
}

const useSuggestions: UseSuggestions = ({ value, skip }) => {
	const { loading, data } = useCompanyNameInputQuery({
		skip,
		variables: { partialCompanyName: value },
	});

	const options = data ? data.companyNameSuggestions : [];

	return { loading, options };
};

export function CompanyNameInput(props: CompanyNameInputProps): JSX.Element {
	return <AutocompleteInput {...props} useSuggestions={useSuggestions} />;
}
