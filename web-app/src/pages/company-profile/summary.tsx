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

import defaultCompany from "src/images/default-company.png";

const T = translations.legacyTranslationsNeedsRefactor;

const CompanySummaryContainer = styled.div`
	margin-top: 8em;
	box-shadow: 1px 1px 5px 1px #dac1c1;
	background-color: white;
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
	console.log(data.company);

	return (
		<CompanySummaryContainer>
			<div className="col-md-2 prostar">
				<img
					src={defaultCompany}
					className="img-responsive"
					alt="Company profile"
				/>
			</div>

			<div className="col-md-6">
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
			</div>

			<div className="col-md-4 prostar">
				<div className="col-md-12">
					<WriteReviewButton
						companyName={data.company.name}
						buttonLocation="Company Profile | Top"
					/>
				</div>
			</div>
			<div className="clearfix" />
		</CompanySummaryContainer>
	);
}
