import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";

import { i18n } from "meteor/universe:i18n";

import PageWrapper from "imports/ui/components/page-wrapper";
import CompanySearchResult from "imports/ui/components/company-search-result";
import CompaniesSearchBar from "imports/ui/components/companies-search-bar";
import Spinner from "imports/ui/components/Spinner";
import PaginateSystem from "imports/ui/components/paginate/pagination";
import withUpdateOnChangeLocale from "imports/ui/hoc/update-on-change-locale";

import companySearchQuery from "./company-search.graphql";

const t = i18n.createTranslator("common.search");
const T = i18n.createComponent(t);

// //////////////////CHILD COMPONENT///////////////////
const SearchResults = ({ searchText, currentPageNum, setCurrentPage }) => (
	<Query
		query={companySearchQuery}
		variables={{ searchText, currentPageNum }}
	>
		{({ loading, error, data }) => {
			if (loading) {
				return <Spinner />;
			}
			if (error) {
				return <h2>{`Error! ${error.message}`}</h2>;
			}

			const totalCompCount = data.searchCompanies.totalCount;

			// searchCompanies is read-only, we do a
			// deep copy before we mutate it with sort:
			// https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript
			const resultList = data.searchCompanies.nodes.map(function(
				company
			) {
				console.log(company);
				return (
					<CompanySearchResult key={company.id} company={company} />
				);
			});

			// Break into chunks
			if (resultList.length < 1) {
				return (
					<h2>
						<T>noCompaniesMatch</T>
					</h2>
				);
			}

			return (
				<>
					<ul>{resultList}</ul>
					<PaginateSystem
						// recall query starting at the last company id
						totalCompanyCount={totalCompCount}
						currentPageNum={currentPageNum}
						setCurrentPage={setCurrentPage}
					/>
				</>
			);
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
			currentPageNum: 0,
		};
		this.setCurrentPage = this.setCurrentPage.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	setCurrentPage(newPageNum) {
		this.setState({
			// was newPageNum
			currentPageNum: newPageNum,
		});
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
			<PageWrapper title="Company Search">
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
				<SearchResults
					searchText={this.state.searchText}
					currentPageNum={this.state.currentPageNum}
					setCurrentPage={this.setCurrentPage}
				/>
			</PageWrapper>
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
