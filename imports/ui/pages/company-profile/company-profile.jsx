import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import i18n from "meteor/universe:i18n";

import ErrorBoundary from "/imports/ui/components/error-boundary.jsx";
import Header from "/imports/ui/components/header.jsx";

import CompanyProfileSummary from "./summary.jsx";
import { OverviewTab, ReviewTab, JobTab, SalaryTab, ContactTab } from "./tabs";

const T = i18n.createComponent();

/* The Company Profile  page of the site. */

class CompanyProfile extends React.Component {
	componentDidMount() {
		// Ask to be updated "reactively".
		// universe:i18n cannot be trusted to do that automaticaly.
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
			<div className="navbarwhite">
				<Header />
				<br />
				<br />
				<br />

				<CompanyProfileSummary company={this.props.company} />

				<br />
				{/* navigation */}
				<section id="back_col">
					<div className="container  mar_lf_ri">
						<div className="row">
							<div className="na_tab">
								<ul className=" nav nav-tabs">
									{/* Setting the width of each tab to 25% for each tab since we deleted the 5th one */}
									<li
										className="active"
										role="presentation"
										style={{ width: "25%" }}
									>
										<a
											href="#overview"
											aria-controls="overview"
											role="tab"
											data-toggle="tab"
										>
											<T>
												common.companyprofile.overview
											</T>
										</a>
									</li>
									<li
										role="presentation"
										style={{ width: "25%" }}
									>
										<a
											href="#reviews"
											aria-controls="reviews"
											role="tab"
											data-toggle="tab"
										>
											<T>common.companyprofile.reviews</T>
										</a>
									</li>
									<li
										role="presentation"
										style={{ width: "25%" }}
									>
										<a
											href="#jobs"
											aria-controls="jobs"
											role="tab"
											data-toggle="tab"
										>
											<T>common.companyprofile.jobs</T>
										</a>
									</li>
									<li
										role="presentation"
										style={{ width: "25%" }}
									>
										<a
											href="#salaries"
											aria-controls="salaries"
											role="tab"
											data-toggle="tab"
										>
											<T>
												common.companyprofile.salaries
											</T>
										</a>
									</li>
									{/* Commenting out the Contact Us form for now */}
									{/* <li role="presentation"><a href="#contact" aria-controls="contact" role="tab" data-toggle="tab">Contact</a></li> */}
								</ul>
							</div>

							<div className="tab_conten_man">
								<div className="tab-content  ">
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
			</div>
		);
	}
}

const companyProfileQuery = gql`
	query companyProfilePage($companyId: ID!) {
		company(id: $companyId) {
			id

			name
			contactEmail
			dateEstablished
			numEmployees
			industry
			locations
			otherContactInfo
			websiteURL
			descriptionOfCompany
			dateJoined
			numFlags
			avgStarRatings {
				healthAndSafety
				managerRelationship
				workEnvironment
				benefits
				overallSatisfaction
			}
			percentRecommended
			avgNumMonthsWorked

			reviews {
				id
				title
				jobTitle
				numberOfMonthsWorked
				pros
				cons
				wouldRecommendToOtherJobSeekers
				starRatings {
					healthAndSafety
					managerRelationship
					workEnvironment
					benefits
					overallSatisfaction
				}
				additionalComments
				created
				currentUserVote {
					isUpvote
				}
			}
			numReviews
			jobAds {
				id
				jobTitle
				locations
				pesosPerHour
				contractType
				jobDescription
				qualifications
				responsibilities
				created
			}
			numJobAds
			salaries {
				id
				jobTitle
				incomeType
				incomeAmount
			}
			numSalaries
		}
	}
`;

export default ({ companyId }) => (
	<Query query={companyProfileQuery} variables={{ companyId }}>
		{({ loading, error, data, refetch }) => {
			if (loading) {
				return <h2>Loading</h2>;
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
