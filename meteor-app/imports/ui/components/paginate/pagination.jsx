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

export default function PaginateSystem(props) {
	return (
		<div className="centeredPag">
			<ReactPaginate
				previousLabel="previous"
				nextLabel="next"
				breakLabel="..."
				breakClassName="break-me"
				pageCount={Math.ceil(props.totalCompanyCount / 3)}
				marginPagesDisplayed={2}
				pageRangeDisplayed={1}
				onPageChange={({ selected }) => props.setCurrentPage(selected)}
				forcePage={props.currentPageNum}
				containerClassName="pagination"
				subContainerClassName="pages pagination"
				activeClassName="active"
			/>
		</div>
	);
}
