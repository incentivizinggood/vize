import React from "react";
import ReactPixel from "react-facebook-pixel";
import ReactGA from "react-ga";
import { useInfiniteScroll } from "react-infinite-scroll-hook";

import PageWrapper from "src/components/page-wrapper";
import CompanySearchResult from "src/components/company-search-result";
import CompaniesSearchBar from "src/components/companies-search-bar";
import Spinner from "src/components/Spinner";
import { translations } from "src/translations";
import {
	useCompanySearchPageQuery,
	CompanySearchResultFragment,
} from "generated/graphql-operations";
import { NetworkStatus } from "apollo-boost";

const T = translations.legacyTranslationsNeedsRefactor.search;

interface SearchResultsProps {
	searchText: string;
}

/*

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
	*/

function useSearch(
	searchText: string
): {
	loading: boolean;
	error: unknown;
	companies: CompanySearchResultFragment[];
	totalCount: number | null;
	infiniteRef: React.MutableRefObject<any>;
	hasMore: boolean;
} {
	const pageSize = 20;

	const {
		loading,
		error,
		data,
		fetchMore,
		networkStatus,
	} = useCompanySearchPageQuery({
		variables: { searchText, pageNum: 0, pageSize },
		notifyOnNetworkStatusChange: true,
	});

	const hasNextPage =
		!error &&
		!!data &&
		data.searchCompanies.nodes.length < data.searchCompanies.totalCount;

	const onLoadMore = (): void => {
		if (error || !data || !hasNextPage) {
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
	};

	const infiniteRef = useInfiniteScroll({
		loading: networkStatus === NetworkStatus.fetchMore,
		hasNextPage,
		onLoadMore,
	});

	return {
		loading,
		error,
		companies: data ? data.searchCompanies.nodes : [],
		totalCount: data ? data.searchCompanies.totalCount : null,
		infiniteRef,
		hasMore: hasNextPage,
	};
}

function SearchResults({ searchText }: SearchResultsProps): JSX.Element {
	const {
		loading,
		error,
		companies,
		totalCount,
		infiniteRef,
		hasMore,
	} = useSearch(searchText);

	if (error) {
		return <h2>{`Error! ${JSON.stringify(error)}`}</h2>;
	}

	return (
		<div ref={infiniteRef}>
			{totalCount !== null ? (
				totalCount > 0 ? (
					<div>{totalCount} companies found.</div>
				) : (
					<h2>
						<T.noCompaniesMatch />
					</h2>
				)
			) : null}
			{companies.map(company => (
				<CompanySearchResult key={company.id} company={company} />
			))}
			{loading ? <Spinner /> : !hasMore ? <p>No mas.</p> : null}
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
