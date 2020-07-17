import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useHistory } from "react-router-dom";

import { useTranslations } from "src/translations";

type Inputs = {
	search: string;
};

export default function CompaniesSearchBar() {
	const t = useTranslations();
	const location = useLocation();
	const history = useHistory();

	// The form data is saved in url search params.
	// We load that data into the form so that the user can edit it
	// and write it back to the url.
	const params = new URLSearchParams(location.search);

	const { register, handleSubmit } = useForm<Inputs>({
		defaultValues: { search: params.get("q") || "" },
	});

	const onSubmit: SubmitHandler<Inputs> = data => {
		history.push(`/companies?q=${data.search}`);
	};

	return (
		<form className="form-search_header" onSubmit={handleSubmit(onSubmit)}>
			<div className="search-bar-style">
				<input
					name="search"
					className="companies-search-input"
					{...t.companiesSearchBar}
					ref={register}
				/>
				<button type="submit" className="search-icon">
					<FontAwesomeIcon icon={faSearch} />
				</button>
			</div>
		</form>
	);
}
