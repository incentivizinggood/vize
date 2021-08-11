import React from "react";
import { useInfiniteScroll } from "react-infinite-scroll-hook";

import CompanyReview from "../articles/review";
import CompanyRating from "../companyRatingsComponent";
import { WriteReviewButton } from "src/components/button";
import Spinner from "src/components/Spinner";
import { useCompanyProfileReviewTabQuery } from "generated/graphql-operations";
import { translations } from "src/translations";
import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
} from "../components";

const T = translations.legacyTranslationsNeedsRefactor;

interface ReviewTabProps {
	companyId: string;
}

function ReviewTab({ companyId }: ReviewTabProps): JSX.Element {
	const pageSize = 4;

	const { loading, error, data, fetchMore } = useCompanyProfileReviewTabQuery(
		{
			variables: { companyId, pageNum: 0, pageSize },
			// This lets us know when the query is fetching more.
			notifyOnNetworkStatusChange: true,
		}
	);

	const hasNextPage =
		!error &&
		!!data &&
		!!data.company &&
		data.company.reviews.length < data.company.numReviews;

	const onLoadMore = (): void => {
		if (error || !data || !data.company || !hasNextPage) {
			return;
		}

		fetchMore({
			variables: {
				pageNum: Math.ceil(data.company.reviews.length / pageSize),
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
								reviews: prev.company
									? [
											...prev.company.reviews,
											...fetchMoreResult.company.reviews,
									  ]
									: fetchMoreResult.company.reviews,
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

	const ReviewsText = () => {
		if (data.company.numReviews === 1) {
			return <T.review_tab.review />;
		} else {
			return <T.review_tab.reviews />;
		}
	};

	return (
		<div
			role="tabpanel"
			className="tab-pane"
			id="reviews"
			ref={infiniteRef}
		>
			<SectionContainer>
				<SectionHeaderContainer>
					<SectionHeaderTitle>
						{data.company.numReviews} <ReviewsText />
					</SectionHeaderTitle>
					<div className="add-buttons">
						<WriteReviewButton
							companyName={data.company.name}
							buttonLocation="Company Profile | Reviews"
						/>
					</div>
				</SectionHeaderContainer>

				<CompanyRating company={data.company} />
			</SectionContainer>
			{data.company.reviews.map((review) => (
				<CompanyReview key={review.id} review={review} />
			))}
			{loading ? <Spinner /> : null}
		</div>
	);
}

export default ReviewTab;
