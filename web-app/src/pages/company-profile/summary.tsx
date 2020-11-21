import React from "react";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import {
	faUsers,
	faFlask,
	faMapMarker,
	faGlobe,
} from "@fortawesome/free-solid-svg-icons";

import { processLocation } from "src/misc";
import { WriteReviewButton } from "src/components/button";
import Spinner from "src/components/Spinner";
import { useCompanyProfileSummaryQuery } from "generated/graphql-operations";
import { translations } from "src/translations";
import { forSize } from "src/responsive";

import defaultCompanyIcon from "src/images/default-company.png";

const T = translations.legacyTranslationsNeedsRefactor;

const CompanySummaryContainer = styled.div`
	margin-top: 8em;
	padding: 15px;
	display: flex;

	box-shadow: 1px 1px 5px 1px #dac1c1;
	background-color: white;

	${forSize.phoneOnly} {
		flex-direction: column;
	}
`;

const CompanyProfileImageContainer = styled.div`
	display: flex;
	padding-right: 15px;
	align-items: center;
`;

const CompanyProfileImage = styled.img`
	max-width: 180px;
	max-height: 180px;
	margin: 0 auto;
`;

// Contains the location, industry, URL, and number of employees
const CompanyInfoComponent = styled.div`
	display: flex
	flex-direction: column;
`;

const WriteReviewButtonContainer = styled.div`
	margin-left: auto;

	${forSize.phoneOnly} {
		margin: 0 auto;
		margin-top: 10px;
	}
`;

interface CompanyProfileSummaryProps {
	companyId: string;
}

export default function CompanyProfileSummary({
	companyId,
}: CompanyProfileSummaryProps): JSX.Element {
	const { loading, error, data } = useCompanyProfileSummaryQuery({
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

	const companyProfileIcon = data.company.companyIconURL
		? data.company.companyIconURL
		: defaultCompanyIcon;

	return (
		<CompanySummaryContainer>
			<CompanyProfileImageContainer>
				<CompanyProfileImage
					src={companyProfileIcon}
					alt="Company profile"
				/>
			</CompanyProfileImageContainer>

			<CompanyInfoComponent>
				<div className="row">
					<div className="col-md-12">
						<fieldset className="rating">
							<span className="headingoo">
								{data.company.name}
							</span>
							{data.company.avgStarRatings ? (
								<>
									&nbsp;&nbsp;
									<StarRatings
										rating={
											data.company.avgStarRatings
												.overallSatisfaction
										}
										starDimension="25px"
										starSpacing="2px"
									/>
								</>
							) : null}
						</fieldset>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						{data.company.locations.length > 0 ? (
							<p>
								<FontAwesomeIcon icon={faMapMarker} />{" "}
								{processLocation(
									JSON.stringify(data.company.locations[0])
								)}
							</p>
						) : null}
						{data.company.industry ? (
							<p>
								<FontAwesomeIcon icon={faFlask} />{" "}
								{data.company.industry}
							</p>
						) : null}
						{data.company.websiteURL ? (
							<p>
								<FontAwesomeIcon icon={faGlobe} />{" "}
								<a
									href={data.company.websiteURL}
									target="_blank"
									rel="noopener noreferrer"
								>
									{data.company.websiteURL}
								</a>
							</p>
						) : null}
						{data.company.numEmployees ? (
							<p>
								<FontAwesomeIcon icon={faUsers} />{" "}
								{data.company.numEmployees}
							</p>
						) : null}
					</div>
				</div>
			</CompanyInfoComponent>
			<WriteReviewButtonContainer>
				<WriteReviewButton
					companyName={data.company.name}
					buttonLocation="Company Profile | Top"
				/>
			</WriteReviewButtonContainer>
			<div className="clearfix" />
		</CompanySummaryContainer>
	);
}
