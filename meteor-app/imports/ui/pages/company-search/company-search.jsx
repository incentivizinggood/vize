import { Meteor } from "meteor/meteor";
import React from "react";
import PropTypes from "prop-types";
import i18n from "meteor/universe:i18n";
import { Query } from "react-apollo";
import { processLocation } from "/imports/api/models/helpers/postgresql/misc.js";
import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import CompanySearchResult from "/imports/ui/components/company-search-result.jsx";
import CompaniesSearchBar from "/imports/ui/components/companies-search-bar.jsx";
import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import companySearchQuery from "./company-search.graphql";

const t = i18n.createTranslator("common.search");
const T = i18n.createComponent(t);

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

			// searchCompanies is read-only, we do a
			// deep copy before we mutate it with sort:
			// https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript
			const resultList = data.searchCompanies
				.map(c => Object.assign({}, c))
				// Array.prototype.sort is in-place and returns the new array
				.sort(function(a, b) {
					// This scoring method was given to me by Krit,
					// who told me that Julian wanted it this way.
					const score = company =>
						company.numJobAds * 2 +
						company.numReviews * 1.5 +
						company.numSalaries * 1;
					const aScore = score(a);
					const bScore = score(b);
					if (aScore === bScore) return 0;
					else if (aScore > bScore) return -1;
					return 1;
				})
				// Finally, do React stuff
				.map(function(company) {
					console.log(company);
					return (
						<CompanySearchResult
							key={company.id}
							company={company}
						/>
					);
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
class CompanySearchTrial extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTextInput: this.props.searchText || "",
			searchText: this.props.searchText || "",
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
		return (
			<div>
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
								<CompaniesSearchBar />
							</div>
						</div>
					</div>
					<div className="clearfix" />
				</div>
				<div className="clearfix" />
				<br />
				<SearchResults searchText={this.state.searchText} />
				<div>
					<Footer />
				</div>
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

export default withUpdateOnChangeLocale(CompanySearchTrial);
