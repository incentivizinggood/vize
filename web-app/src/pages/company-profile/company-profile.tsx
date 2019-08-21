import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import ErrorBoundary from "src/components/error-boundary";
import PageWrapper from "src/components/page-wrapper";
import Spinner from "src/components/Spinner";
import { translations } from "src/translations";

import CompanyProfileSummary from "./summary";
import { OverviewTab, ReviewTab, JobTab, SalaryTab, ContactTab } from "./tabs";
import companyProfileQuery from "./company-profile.graphql";

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
					<div className="row">
						<div className="na_tab">
							<ul className=" nav nav-tabs">
								{/* Setting the width of each tab to 25% for each tab since we deleted the 5th one */}
								<li
									className="active"
									role="presentation"
									style={{ width: "25%" }}
								>
									<Link
										to="#overview"
										aria-controls="overview"
										role="tab"
										data-toggle="tab"
									>
										<T.companyprofile.overview />
									</Link>
								</li>
								<li
									role="presentation"
									style={{ width: "25%" }}
								>
									<Link
										to="#reviews"
										aria-controls="reviews"
										role="tab"
										data-toggle="tab"
									>
										<T.companyprofile.reviews />
									</Link>
								</li>
								<li
									role="presentation"
									style={{ width: "25%" }}
								>
									<Link
										to="#jobs"
										aria-controls="jobs"
										role="tab"
										data-toggle="tab"
									>
										<T.companyprofile.jobs />
									</Link>
								</li>

								<li
									role="presentation"
									style={{ width: "25%" }}
								>
									<Link
										to="#salaries"
										aria-controls="salaries"
										role="tab"
										data-toggle="tab"
									>
										<T.companyprofile.salaries />
									</Link>
								</li>

								{/* Commenting out the Contact Us form for now */}
								{/* <li role="presentation"><Link to="#contact" aria-controls="contact" role="tab" data-toggle="tab">Contact</Link></li> */}
							</ul>
						</div>

						<div>
							<div className="tab-content">
								<ErrorBoundary>
									<OverviewTab
										company={props.company}
										refetch={props.refetch}
									/>
								</ErrorBoundary>

								<ErrorBoundary>
									<ReviewTab
										company={props.company}
										refetch={props.refetch}
									/>
								</ErrorBoundary>

								<ErrorBoundary>
									<JobTab
										jobAds={props.jobAds}
										jobsCount={props.jobsCount}
									/>
								</ErrorBoundary>

								<ErrorBoundary>
									<SalaryTab company={props.company} />
								</ErrorBoundary>

								<ContactTab />
							</div>
						</div>
					</div>
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

			return (
				<CompanyProfile
					company={data.company}
					reviews={data.company.reviews}
					jobAds={data.company.jobAds}
					jobsCount={data.company.numJobAds}
					salaries={data.company.salaries}
					salariesCount={data.company.numJobAds}
					refetch={refetchWithLog}
				/>
			);
		}}
	</Query>
);
