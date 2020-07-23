import React from "react";
import { useInfiniteScroll } from "react-infinite-scroll-hook";

import Spinner from "src/components/Spinner";
import { useCompanyProfileJobTabQuery } from "generated/graphql-operations";
import { translations } from "src/translations";
import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
} from "../components";

import JobPosting from "../articles/job-ad";

const T = translations.legacyTranslationsNeedsRefactor;

interface JobTabProps {
	companyId: string;
}

export default function JobTab({ companyId }: JobTabProps): JSX.Element {
	const pageSize = 4;

	const { loading, error, data, fetchMore } = useCompanyProfileJobTabQuery({
		variables: { companyId, pageNum: 0, pageSize },
		// This lets us know when the query is fetching more.
		notifyOnNetworkStatusChange: true,
	});

	const hasNextPage =
		!error &&
		!!data &&
		!!data.company &&
		data.company.jobAds.length < data.company.numJobAds;

	const onLoadMore = (): void => {
		if (error || !data || !data.company || !hasNextPage) {
			return;
		}

		fetchMore({
			variables: {
				pageNum: Math.ceil(data.company.jobAds.length / pageSize),
			},
			updateQuery(prev, { fetchMoreResult }) {
				if (!fetchMoreResult) {
					return prev;
				}

				return {
					...prev,
					company: fetchMoreResult.company
						? {
								...fetchMoreResult.company,
								jobAds: prev.company
									? [
											...prev.company.jobAds,
											...fetchMoreResult.company.jobAds,
									  ]
									: fetchMoreResult.company.jobAds,
						  }
						: prev.company,
				};
			},
		});
	};

	const infiniteRef = useInfiniteScroll<any>({
		loading,
		hasNextPage,
		onLoadMore,
	});

	if (error) {
		return <h2>{`Error! ${error.message}`}</h2>;
	}

	if (!data || !data.company) {
		if (loading) {
			return <Spinner />;
		}
		return (
			<h2>
				<T.companyprofile.notfound />
			</h2>
		);
	}

	return (
		<SectionContainer ref={infiniteRef}>
			<SectionHeaderContainer>
				<SectionHeaderTitle>
					{data.company.numJobAds} <T.jobscomponent.jobs_available />
				</SectionHeaderTitle>
			</SectionHeaderContainer>

			{data.company.jobAds.map(jobAd => (
				<JobPosting key={jobAd.id} jobAd={jobAd} />
			))}
			{loading ? <Spinner /> : null}
		</SectionContainer>
	);
}
