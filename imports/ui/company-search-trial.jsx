import React from "react";
import i18n from "meteor/universe:i18n";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import CompanyComponent from "./companyComponent.jsx";
import Header from "./pages/header.jsx";
import "./pages/search.html";

/* A set of controls for the user to select search queries and options.
 * For use in the CompanySearchPage.
 */
let input = "";
const T = i18n.createComponent();

const companySearchQuery = gql`
	query companySearchPage($searchText: String!) {
		searchCompanies(searchText: $searchText) {
			id
			name
			avgStarRatings {
				overallSatisfaction
			}
			locations
			industry
			numEmployees
			numReviews
			descriptionOfCompany
		}
	}
`;

// //////////////////CHILD COMPONENT///////////////////
class Results extends React.Component {
	render() {
		const first = this.props.company;
		let display_notice;

		const RenderedItems = this.props.company.map(function(item, i) {
			return <CompanyComponent key={i} item={item} />;
		});

		if (RenderedItems.length < 1) {
			display_notice = (
				<h2>
					<T>common.search.noCompaniesMatch</T>
				</h2>
			);
		} else {
			display_notice = "";
		}

		return (
			<ul>
				{display_notice}
				{RenderedItems}
			</ul>
		);
	}
}

const Results1 = ({ searchText }) => (
	<Query query={companySearchQuery} variables={{ searchText }}>
		{({ loading, error, data }) => {
			if (loading) return "Loading...";
			if (error) return `Error! ${error.message}`;

			return <Results company={data.searchCompanies} />;
		}}
	</Query>
);

// /////////////Company Search -- Main Component////////////////////
export default class CompanySearchTrial extends React.Component {
	constructor(props) {
		super(props);
		this.state = { input: "" };
	}

	componentDidMount() {
		// console.log("Inside the company Search trial page");
		// console.log(this.props.queryParams);

		if (
			this.props.queryParams !== undefined &&
			this.props.queryParams.input !== undefined
		) {
			this.setState({ input: this.props.queryParams.input });
		} else {
			console.log("inside else");
		}

		// Ask to be updated "reactively".
		// universe:i18n cannot be trusted to do that automaticaly.
		this.i18nInvalidate = () => this.forceUpdate();
		i18n.onChangeLocale(this.i18nInvalidate);
	}

	componentWillUnmount() {
		i18n.offChangeLocale(this.i18nInvalidate);
	}

	handleSubmit(event) {
		event.preventDefault();

		input = this.refs.input_search.value;
		// console.log(input);
		this.refs.input_search.value = "";
		this.setState({ input });
	}

	render() {
		return (
			<div className="customcompanypage">
				<div className="navbarwhite">
					<Header />
				</div>
				<div className="container-fluid  search_companies">
					<div className="row all_boxcolor1 select_box1">
						<div>
							<div
								id="companies_header1"
								className="callbacks_container"
							>
								<ul className="rslides" id="slider3">
									<li>
										<div className="banner-text-info">
											<form
												className="example"
												onSubmit={this.handleSubmit.bind(
													this
												)}
											>
												<input
													ref="input_search"
													type="text"
													placeholder={i18n.__(
														"common.search.placeholder"
													)}
												/>
												<button type="submit">
													<T>common.search.button</T>
												</button>
											</form>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="clearfix" />
				</div>
				<div className="clearfix" />

				{/* ////////////////////////RESULTS CODE///////////////////////////////// */}

				<br />
				<Results1 searchText={this.state.input} />
			</div>
		);
	}
}
