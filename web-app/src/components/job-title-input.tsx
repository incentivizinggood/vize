import React from "react";

import { useJobTitleInputQuery } from "generated/graphql-operations";
import { AutocompleteInput, UseSuggestions } from "./autocomplete-input";

interface JobTitleInputProps {
	name: string;
	required?: boolean;
	label: string;
	placeholder: string;
}

const useSuggestions: UseSuggestions = ({ value, skip }) => {
	const { loading, data } = useJobTitleInputQuery({
		skip,
		variables: { partialJobTitle: value },
	});

	const options = data ? data.jobTitleSuggestions : [];

	return { loading, options };
};

export function JobTitleInput(props: JobTitleInputProps): JSX.Element {
	return <AutocompleteInput {...props} useSuggestions={useSuggestions} />;
}
