import React from "react";
import ReactPixel from "react-facebook-pixel";
import ReactGA from "react-ga";

import PageWrapper from "src/components/page-wrapper";
import CompanySearchResult from "src/components/company-search-result";
import CompaniesSearchBar from "src/components/companies-search-bar";
import Spinner from "src/components/Spinner";
import { translations } from "src/translations";
import { useCompanySearchPageQuery } from "generated/graphql-operations";

const T = translations.legacyTranslationsNeedsRefactor.search;

interface SearchResultsProps {
	searchText: string;
}

function SearchResults({ searchText }: SearchResultsProps): JSX.Element {
	const { loading, error, data } = useCompanySearchPageQuery({
		variables: { searchText, currentPageNum: 0 },
	});

	if (loading) {
		return <Spinner />;
	}
	if (error) {
		return <h2>{`Error! ${error.message}`}</h2>;
	}

	// Track successful search event
	if (searchText !== "") {
		ReactGA.event({
			category: "User",
			action: "Search",
			label: searchText,
		});
		ReactPixel.track("Search", {
			category: "User",
			label: searchText,
		});
	}

	// searchCompanies is read-only, we do a
	// deep copy before we mutate it with sort:
	// https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript
	const resultList = data.searchCompanies.nodes.map(function(company) {
		return <CompanySearchResult key={company.id} company={company} />;
	});

	// Break into chunks
	if (resultList.length < 1) {
		return (
			<h2>
				<T.noCompaniesMatch />
			</h2>
		);
	}

	return <div>{resultList}</div>;
}

interface CompanySearchTrialProps {
	searchText?: string;
}

export default function CompanySearchTrial(
	props: CompanySearchTrialProps
): JSX.Element {
	return (
		<PageWrapper title="Company Search">
			<div className="container-fluid  search_companies">
				<div className="row all_boxcolor1 select_box1">
					<div>
						<div
							id="companies_header1"
							className="callbacks_container"
						>
							<CompaniesSearchBar />
						</div>
					</div>
				</div>
				<div className="clearfix" />
			</div>
			<div className="clearfix" />
			<br />
			<SearchResults searchText={props.searchText || ""} />
		</PageWrapper>
	);
}
