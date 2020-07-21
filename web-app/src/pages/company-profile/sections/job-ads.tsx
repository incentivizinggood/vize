import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMapMarker,
	faMoneyBillAlt,
	faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
	SeeMoreFooter,
} from "../components";

import { processLocation } from "src/misc";
import { urlGenerators } from "src/pages";

import { CompanyProfileJobsSectionFragment } from "generated/graphql-operations";
import { translations } from "src/translations";

const T = translations.legacyTranslationsNeedsRefactor;

interface JobsSectionProps {
	company: CompanyProfileJobsSectionFragment;
}

export default function JobsSection(props: JobsSectionProps): JSX.Element {
	// FIRST JOB_AD CODE TO SHOW ON THE OVERVIEW TAB
	let jobAdsToDisplay;
	if (props.company.jobAds.length > 0) {
		jobAdsToDisplay = (
			<div>
				<div>
					<h4>
						<strong>{props.company.jobAds[0].jobTitle}</strong>
					</h4>
				</div>
				<div>
					<div
						className="add-buttons"
						style={{ float: "right", marginTop: "0px" }}
					>
						<Link
							to={urlGenerators.vizeApplyForJobUrl(
								props.company.jobAds[0].id
							)}
							style={{ float: "right" }}
							className="btn btn-primary"
						>
							{" "}
							<T.overview_tab.apply_now />
						</Link>
					</div>
					<p>
						<FontAwesomeIcon icon={faMapMarker} />
						&nbsp;&nbsp;&nbsp;
						{processLocation(
							JSON.stringify(props.company.jobAds[0].locations[0])
						)}
					</p>
					<p>
						<FontAwesomeIcon icon={faMoneyBillAlt} />
						&nbsp;&nbsp;
						{props.company.jobAds[0].pesosPerHour}
						<T.overview_tab.hour />
					</p>
					<p>
						<FontAwesomeIcon icon={faCalendar} />
						&nbsp;&nbsp;
						{props.company.jobAds[0].contractType}
					</p>
				</div>

				<hr />
				<h4 className="h4-font-sz-job">
					<T.overview_tab.job_description />
				</h4>
				<div className="h4-font-sz">
					<p>{props.company.jobAds[0].jobDescription}</p>
				</div>
			</div>
		);
	} else {
		jobAdsToDisplay = <T.overview_tab.no_jobs />;
	}
	return (
		<SectionContainer>
			<SectionHeaderContainer>
				<SectionHeaderTitle>
					{props.company.numJobAds} <T.overview_tab.jobs_available />
				</SectionHeaderTitle>
			</SectionHeaderContainer>

			{jobAdsToDisplay}

			<SeeMoreFooter to={"./jobs"} ariaControls={"jobs"}>
				<T.overview_tab.see_all_jobs />
			</SeeMoreFooter>
		</SectionContainer>
	);
}
