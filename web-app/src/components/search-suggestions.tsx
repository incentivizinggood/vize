import React from "react";
import { Control, useWatch } from "react-hook-form";
import { useSearchSuggestionsQuery } from "generated/graphql-operations";

interface SearchSuggestionsProps {
	id: string;
	name: string;
	control: Control;
}

export function SearchSuggestions({
	id,
	name,
	control,
}: SearchSuggestionsProps): JSX.Element {
	const search = useWatch({ control, name, defaultValue: "" });

	const { data } = useSearchSuggestionsQuery({
		variables: { partialCompanyName: search },
	});

	const options = data ? data.companyNameSuggestions : [];

	return (
		<datalist id={id}>
			{options.map(x => (
				<option key={x} value={x} />
			))}
		</datalist>
	);
}
