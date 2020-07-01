import React from "react";
import { Query } from "react-apollo";

import { processLocation } from "src/misc";
import PageWrapper from "src/components/page-wrapper";
import Spinner from "src/components/Spinner";
import { translations } from "src/translations";

import CompanyProfileSummary from "./summary";
import { OverviewTab, ReviewTab, JobTab, SalaryTab } from "./tabs";
import companyProfileQuery from "./company-profile.graphql";
import Tabs from "src/components/tabs";

const T = translations.legacyTranslationsNeedsRefactor;

/* The Company Profile  page of the site. */

function CompanyProfile_(props) {
	if (props.company === undefined) {
		return (
			<h2>
				<T.companyprofile.notfound />
			</h2>
		);
	}

	return (
		<PageWrapper title="Company Profile">
			<CompanyProfileSummary company={props.company} />

			<br />
			{/* navigation */}
			<section id="back_col" className="company-profile">
				<div className="container container-margin">
					<Tabs
						tabs={[
							{
								label: <T.companyprofile.overview />,
								content: (
									<OverviewTab
										company={props.company}
										refetch={props.refetch}
									/>
								),
							},
							{
								label: <T.companyprofile.reviews />,
								content: (
									<ReviewTab
										company={props.company}
										refetch={props.refetch}
									/>
								),
							},
							{
								label: <T.companyprofile.jobs />,
								content: (
									<JobTab
										jobAds={props.jobAds}
										jobsCount={props.jobsCount}
									/>
								),
							},
							{
								label: <T.companyprofile.salaries />,
								content: <SalaryTab company={props.company} />,
							},
						]}
					/>
				</div>
			</section>
		</PageWrapper>
	);
}

// TODO: Split this file into view and container components.
const CompanyProfile = CompanyProfile_;

export default ({ companyId }) => (
	<Query query={companyProfileQuery} variables={{ companyId }}>
		{({ loading, error, data, refetch }) => {
			if (loading) {
				return <Spinner />;
			}
			if (error) {
				console.log(error);
				console.log(data);
				return <h2>{`Error! ${error.message}`}</h2>;
			}

			const refetchWithLog = () => {
				console.log("Refetching");
				refetch();
			};

			const processedCompany = data.company;
			let processedCompanyReviews = data.company.reviews;
			let processedJobAds = data.company.jobAds;

			processedCompany.locations = processedCompany.locations.map(
				location => processLocation(JSON.stringify(location))
			);
			processedCompanyReviews = processedCompanyReviews.map(review => {
				const processedReview = review;
				processedReview.location = processLocation(
					JSON.stringify(processedReview.location)
				);
				return processedReview;
			});
			processedJobAds = processedJobAds.map(jobad => {
				const processedJobAd = jobad;
				processedJobAd.location = processLocation(
					JSON.stringify(processedJobAd.location)
				);
				return jobad;
			});

			return (
				<CompanyProfile
					company={processedCompany}
					reviews={processedCompanyReviews}
					jobAds={processedJobAds}
					jobsCount={data.company.numJobAds}
					salaries={data.company.salaries}
					salariesCount={data.company.numJobAds}
					refetch={refetchWithLog}
				/>
			);
		}}
	</Query>
);
