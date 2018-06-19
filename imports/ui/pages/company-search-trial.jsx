import React from "react";
import PropTypes from "prop-types";
import i18n from "meteor/universe:i18n";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import Header from "/imports/ui/components/header.jsx";
import CompanyComponent from "../companyComponent.jsx";

const t = i18n.createTranslator("common.search");
const T = i18n.createComponent(t);

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
const SearchResults = ({ searchText }) => (
	<Query query={companySearchQuery} variables={{ searchText }}>
		{({ loading, error, data }) => {
			if (loading) {
				return (
					<h2>
						<T>loading</T>
					</h2>
				);
			}
			if (error) {
				return <h2>{`Error! ${error.message}`}</h2>;
			}

			const resultList = data.searchCompanies.map(function(company) {
				return <CompanyComponent key={company.id} item={company} />;
			});

			if (resultList.length < 1) {
				return (
					<h2>
						<T>noCompaniesMatch</T>
					</h2>
				);
			}

			return <ul>{resultList}</ul>;
		}}
	</Query>
);

SearchResults.propTypes = {
	searchText: PropTypes.string.isRequired,
};

// /////////////Company Search -- Main Component////////////////////
export default class CompanySearchTrial extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTextInput: this.props.searchText || "",
			searchText: this.props.searchText || "",
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// Ask to be updated "reactively".
		// universe:i18n cannot be trusted to do that automaticaly.
		this.i18nInvalidate = () => this.forceUpdate();
		i18n.onChangeLocale(this.i18nInvalidate);
	}

	componentWillUnmount() {
		i18n.offChangeLocale(this.i18nInvalidate);
	}

	handleInputChange(event) {
		const { target } = event;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const { name } = target;

		this.setState({
			[name]: value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({
			searchText: this.state.searchTextInput,
		});
	}

	render() {
		const form = (
			<form className="example" onSubmit={this.handleSubmit}>
				<input
					name="searchTextInput"
					type="text"
					placeholder={t("placeholder")}
					value={this.state.searchTextInput}
					onChange={this.handleInputChange}
				/>
				<button type="submit">
					<T>button</T>
				</button>
			</form>
		);
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
											{form}
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="clearfix" />
				</div>
				<div className="clearfix" />
				<br />
				<SearchResults searchText={this.state.searchText} />
			</div>
		);
	}
}

CompanySearchTrial.propTypes = {
	searchText: PropTypes.string,
};

CompanySearchTrial.defaultProps = {
	searchText: "",
};
