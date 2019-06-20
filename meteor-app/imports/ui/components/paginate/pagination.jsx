import React from "react";
import ReactPaginate from "react-paginate";

/**
 * Pagination system appears below the block of companies
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
