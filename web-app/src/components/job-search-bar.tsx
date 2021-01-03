import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useHistory } from "react-router-dom";

import { useTranslations } from "src/translations";
import * as analytics from "src/startup/analytics";
import * as urlGenerators from "src/pages/url-generators";

type Inputs = {
	search: string;
};

/** @todo Combine this with CompaniesSearchBar */
export default function JobSearchBar(): JSX.Element {
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
		analytics.sendEvent({
			category: "User",
			action: "Search",
			label: data.search,
		});

		history.push(`/${urlGenerators.queryRoutes.jobs}?q=${data.search}`);
	};

	return (
		<form className="form-search_header" onSubmit={handleSubmit(onSubmit)}>
			<div className="search-bar-style">
				<input
					name="search"
					autoComplete="off"
					className="companies-search-input"
					{...t.jobSearchBar}
					ref={register}
				/>
				<button type="submit" className="search-icon">
					<FontAwesomeIcon icon={faSearch} />
				</button>
			</div>
		</form>
	);
}
