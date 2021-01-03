import React from "react";
import { useInfiniteScroll } from "react-infinite-scroll-hook";

import PageWrapper from "src/components/page-wrapper";
import JobPosting from "src/components/jobs/job-posting.tsx";
import JobSearchBar from "src/components/job-search-bar";
import Spinner from "src/components/Spinner";
import { translations } from "src/translations";
import {
	useJobSearchPageQuery,
	JobPostingFragment,
} from "generated/graphql-operations";

const T = translations.legacyTranslationsNeedsRefactor;

function useSearch(
	searchText: string
): {
	loading: boolean;
	error: unknown;
	jobAds: JobPostingFragment[];
	totalCount: number | null;
	infiniteRef: React.MutableRefObject<any>;
	hasMore: boolean;
} {
	const pageSize = 4;

	const { loading, error, data, fetchMore } = useJobSearchPageQuery({
		variables: { searchText, pageNum: 0, pageSize },
		// This lets us know when the query is fetching more.
		notifyOnNetworkStatusChange: true,
	});

	const hasNextPage =
		!error &&
		!!data &&
		data.searchJobAds.nodes.length < data.searchJobAds.totalCount;

	const onLoadMore = (): void => {
		if (error || !data || !hasNextPage) {
			return;
		}

		fetchMore({
			variables: {
				pageNum: Math.ceil(data.searchJobAds.nodes.length / pageSize),
			},
			updateQuery(prev, { fetchMoreResult }) {
				if (!fetchMoreResult) {
					return prev;
				}

				return {
					...prev,
					searchJobAds: {
						...fetchMoreResult.searchJobAds,
						nodes: [
							...prev.searchJobAds.nodes,
							...fetchMoreResult.searchJobAds.nodes,
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
		jobAds: data ? data.searchJobAds.nodes : [],
		totalCount: data ? data.searchJobAds.totalCount : null,
		infiniteRef,
		hasMore: hasNextPage,
	};
}

interface SearchResultsProps {
	searchText: string;
}

function SearchResults({ searchText }: SearchResultsProps): JSX.Element {
	const { loading, error, jobAds, totalCount, infiniteRef } = useSearch(
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
							<T.jobsearch.nojobs />
						</h2>
				  )
				: null}
			{jobAds.map(jobAd => (
				<JobPosting key={jobAd.id} job={jobAd} isMinimizable />
			))}
			{loading ? <Spinner /> : null}
		</div>
	);
}

interface JobSearchProps {
	searchText?: string;
}

export default function JobSearch(props: JobSearchProps): JSX.Element {
	return (
		<PageWrapper title="Trabajos - Vize">
			<div className="container-fluid  search_companies">
				<div className="row all_boxcolor1 select_box1">
					<div>
						<div
							id="companies_header1"
							className="callbacks_container"
						>
							<JobSearchBar />
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
