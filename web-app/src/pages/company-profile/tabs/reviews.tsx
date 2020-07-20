import React from "react";

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
	const { loading, error, data } = useCompanyProfileReviewTabQuery({
		variables: { companyId },
	});

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <h2>{`Error! ${error.message}`}</h2>;
	}

	if (!data || !data.company) {
		return (
			<h2>
				<T.companyprofile.notfound />
			</h2>
		);
	}

	const renderItems = data.company.reviews.map(review => (
		<CompanyReview
			key={review.id}
			review={review}
			companyName={data.company.name}
		/>
	));

	return (
		<div role="tabpanel" className="tab-pane" id="reviews">
			<SectionContainer>
				<SectionHeaderContainer>
					<SectionHeaderTitle>
						{data.company.name} <T.review_tab.reviews />
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

			{renderItems}
		</div>
	);
}

export default ReviewTab;
