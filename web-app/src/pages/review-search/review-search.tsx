import React from "react";
import { useInfiniteScroll } from "react-infinite-scroll-hook";

import PageWrapper from "src/components/page-wrapper";
// Stealing the review component from the company page for now.
// TODO: Make a component for this search page to use properly.
import ReviewComponent from "src/pages/company-profile/articles/review";
import CompaniesSearchBar from "src/components/companies-search-bar";
import Spinner from "src/components/Spinner";
import { translations } from "src/translations";
import {
	useReviewSearchPageQuery,
	CompanyProfileReviewFragment,
} from "generated/graphql-operations";

// TODO: Make translations for this page.
const T = translations.legacyTranslationsNeedsRefactor;

function useSearch(
	searchText: string
): {
	loading: boolean;
	error: unknown;
	reviews: CompanyProfileReviewFragment[];
	totalCount: number | null;
	infiniteRef: React.MutableRefObject<any>;
	hasMore: boolean;
} {
	const pageSize = 4;

	const { loading, error, data, fetchMore } = useReviewSearchPageQuery({
		variables: { searchText, pageNum: 0, pageSize },
		// This lets us know when the query is fetching more.
		notifyOnNetworkStatusChange: true,
	});

	const hasNextPage =
		!error &&
		!!data &&
		data.searchReviews.nodes.length < data.searchReviews.totalCount;

	const onLoadMore = (): void => {
		if (error || !data || !hasNextPage) {
			return;
		}

		fetchMore({
			variables: {
				pageNum: Math.ceil(data.searchReviews.nodes.length / pageSize),
			},
			updateQuery(prev, { fetchMoreResult }) {
				if (!fetchMoreResult) {
					return prev;
				}

				return {
					...prev,
					searchReviews: {
						...fetchMoreResult.searchReviews,
						nodes: [
							...prev.searchReviews.nodes,
							...fetchMoreResult.searchReviews.nodes,
						],
					},
				};
			},
		});
	};

	const infiniteRef = useInfiniteScroll({
		loading,
		hasNextPage,
		onLoadMore,
	});

	return {
		loading,
		error,
		reviews: data ? data.searchReviews.nodes : [],
		totalCount: data ? data.searchReviews.totalCount : null,
		infiniteRef,
		hasMore: hasNextPage,
	};
}

interface SearchResultsProps {
	searchText: string;
}

function SearchResults({ searchText }: SearchResultsProps): JSX.Element {
	const { loading, error, reviews, totalCount, infiniteRef } = useSearch(
		searchText
	);

	if (error) {
		return <h2>{`Error! ${JSON.stringify(error)}`}</h2>;
	}

	return (
		<div ref={infiniteRef}>
			{totalCount !== null
				? totalCount === 0 && (
						<h2 className="text-center">
							<T.overview_tab.no_reviews />
						</h2>
				  )
				: null}
			{reviews.map(review => (
				<ReviewComponent key={review.id} review={review} />
			))}
			{loading ? <Spinner /> : null}
		</div>
	);
}

interface ReviewSearchProps {
	searchText?: string;
}

export default function ReviewSearch(props: ReviewSearchProps): JSX.Element {
	return (
		<PageWrapper title="Críticas - Vize">
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
