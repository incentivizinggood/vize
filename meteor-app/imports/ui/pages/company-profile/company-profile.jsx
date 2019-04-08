import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

import { processLocation } from "/imports/api/models/helpers/postgresql/misc.js";

import ErrorBoundary from "/imports/ui/components/error-boundary.jsx";
import PageWrapper from "/imports/ui/components/page-wrapper";

import CompanyProfileSummary from "./summary.jsx";
import { OverviewTab, ReviewTab, JobTab, SalaryTab, ContactTab } from "./tabs";
import companyProfileQuery from "./company-profile.graphql";
import Spinner from "../../components/Spinner";

const T = i18n.createComponent();

/* The Company Profile  page of the site. */

class CompanyProfile extends React.Component {
	componentDidMount() {
		// Ask to be updated "reactively".
		// universe:i18n cannot be trusted to do that automaticaly.
		document.title = "Company Profile";
		this.i18nInvalidate = () => this.forceUpdate();
		i18n.onChangeLocale(this.i18nInvalidate);
	}

	componentWillUnmount() {
		i18n.offChangeLocale(this.i18nInvalidate);
	}

	render() {
		if (this.props.company === undefined) {
			return (
				<h2>
					<T>common.companyprofile.notfound</T>
				</h2>
			);
		}

		return (
			<PageWrapper>
				<CompanyProfileSummary company={this.props.company} />

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
											<T>
												common.companyprofile.overview
											</T>
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
											<T>common.companyprofile.reviews</T>
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
											<T>common.companyprofile.jobs</T>
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
											<T>
												common.companyprofile.salaries
											</T>
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
											company={this.props.company}
											refetch={this.props.refetch}
										/>
									</ErrorBoundary>

									<ErrorBoundary>
										<ReviewTab
											company={this.props.company}
											refetch={this.props.refetch}
										/>
									</ErrorBoundary>

									<ErrorBoundary>
										<JobTab
											jobAds={this.props.jobAds}
											jobsCount={this.props.jobsCount}
										/>
									</ErrorBoundary>

									<ErrorBoundary>
										<SalaryTab
											company={this.props.company}
										/>
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
}

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
