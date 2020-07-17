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
	const pageSize = 20;

	const { loading, error, data, fetchMore } = useCompanySearchPageQuery({
		variables: { searchText, pageNum: 0, pageSize },
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

	if (!data || data.searchCompanies.nodes.length < 1) {
		return (
			<h2>
				<T.noCompaniesMatch />
			</h2>
		);
	}

	function onEndReached(): void {
		if (!data) {
			return;
		}

		fetchMore({
			variables: {
				pageNum: Math.ceil(
					data.searchCompanies.nodes.length / pageSize
				),
			},
			updateQuery(prev, { fetchMoreResult }) {
				if (!fetchMoreResult) {
					return prev;
				}

				return {
					...prev,
					searchCompanies: {
						...fetchMoreResult.searchCompanies,
						nodes: [
							...prev.searchCompanies.nodes,
							...fetchMoreResult.searchCompanies.nodes,
						],
					},
				};
			},
		});
	}

	return (
		<div>
			{data.searchCompanies.nodes.map(company => (
				<CompanySearchResult key={company.id} company={company} />
			))}
			<button onClick={onEndReached}>Load more.</button>
		</div>
	);
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
