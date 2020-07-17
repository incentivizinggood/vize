import React from "react";
import PropTypes from "prop-types";
import ReactPixel from "react-facebook-pixel";
import ReactGA from "react-ga";

import PageWrapper from "src/components/page-wrapper";
import CompanySearchResult from "src/components/company-search-result";
import CompaniesSearchBar from "src/components/companies-search-bar";
import Spinner from "src/components/Spinner";
import PaginateSystem from "src/components/paginate/pagination";
import { translations } from "src/translations";
import { useCompanySearchPageQuery } from "generated/graphql-operations";

const T = translations.legacyTranslationsNeedsRefactor.search;

// //////////////////CHILD COMPONENT///////////////////
function SearchResults({ searchText, currentPageNum, setCurrentPage }) {
	const { loading, error, data } = useCompanySearchPageQuery({
		variables: { searchText, currentPageNum },
	});

	if (loading) {
		return <Spinner />;
	}
	if (error) {
		return <h2>{`Error! ${error.message}`}</h2>;
	}

	// Track successful search event
	if (searchText !== "") {
		ReactGA.event({
			category: "User",
			action: "Search",
			label: searchText,
		});
		ReactPixel.track("Search", {
			category: "User",
			label: searchText,
		});
	}

	const totalCompCount = data.searchCompanies.totalCount;

	// searchCompanies is read-only, we do a
	// deep copy before we mutate it with sort:
	// https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript
	const resultList = data.searchCompanies.nodes.map(function(company) {
		return <CompanySearchResult key={company.id} company={company} />;
	});

	// Break into chunks
	if (resultList.length < 1) {
		return (
			<h2>
				<T.noCompaniesMatch />
			</h2>
		);
	}

	return (
		<>
			<div>{resultList}</div>
			<PaginateSystem
				// recall query starting at the last company id
				totalCompanyCount={totalCompCount}
				currentPageNum={currentPageNum}
				setCurrentPage={setCurrentPage}
			/>
		</>
	);
}

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

export default CompanySearchTrial;
