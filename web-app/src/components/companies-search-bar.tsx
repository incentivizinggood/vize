import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useHistory } from "react-router-dom";
import ReactPixel from "react-facebook-pixel";
import ReactGA from "react-ga";

import { useTranslations } from "src/translations";
import { SearchSuggestions } from "./search-suggestions";

type Inputs = {
	search: string;
};

export default function CompaniesSearchBar(): JSX.Element {
	const t = useTranslations();
	const location = useLocation();
	const history = useHistory();

	// The form data is saved in url search params.
	// We load that data into the form so that the user can edit it
	// and write it back to the url.
	const params = new URLSearchParams(location.search);

	const { register, handleSubmit, control } = useForm<Inputs>({
		defaultValues: { search: params.get("q") || "" },
	});

	const onSubmit: SubmitHandler<Inputs> = data => {
		ReactGA.event({
			category: "User",
			action: "Search",
			label: data.search,
		});

		ReactPixel.track("Search", {
			category: "User",
			label: data.search,
		});

		history.push(`/companies?q=${data.search}`);
	};

	return (
		<form className="form-search_header" onSubmit={handleSubmit(onSubmit)}>
			<div className="search-bar-style">
				<input
					name="search"
					list="search-suggestions"
					autoComplete="off"
					className="companies-search-input"
					{...t.companiesSearchBar}
					ref={register}
				/>
				<SearchSuggestions
					id="search-suggestions"
					name="search"
					control={control}
				/>
				<button type="submit" className="search-icon">
					<FontAwesomeIcon icon={faSearch} />
				</button>
			</div>
		</form>
	);
}
