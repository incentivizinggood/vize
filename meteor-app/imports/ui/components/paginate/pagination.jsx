import React from "react";
import CompanySearchTrial from "/imports/ui/pages/company-search/company-search.jsx";
import i18n from "meteor/universe:i18n";
import { Link } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { Email } from "meteor/email";
import { Accounts } from "meteor/accounts-base";
import ReactPaginate from "react-paginate";
import style from "./pagination.scss";

import "../../../api/data/methods.js";

/*
Pagination system appears below the block of companies
 */

export default class PaginateSystem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.changePage = this.changePage.bind(this);
	}

	changePage = data => {
		console.log("print", data);
		// send it call
		console.log("cpn: ", this.props.currPageNum);
		// <CompanySearchTrial setCurrentPage={this.props.currPageNum}>
	};

	render() {
		return (
			<div className="centeredPag">
				<ReactPaginate
					previousLabel="previous"
					nextLabel="next"
					breakLabel="..."
					breakClassName="break-me"
					pageCount={Math.ceil(this.props.totalCompanyCount / 2)}
					marginPagesDisplayed={2}
					pageRangeDisplayed={1}
					onPageChange={this.changePage}
					containerClassName="pagination"
					subContainerClassName="pages pagination"
					activeClassName="active"
				/>
			</div>
		);
	}
}
