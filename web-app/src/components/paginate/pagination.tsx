import React from "react";
import ReactPaginate from "react-paginate";

interface PaginateSystemProps {
	totalCompanyCount: number;
	currentPageNum: number;
	setCurrentPage: (newPageNumber: number) => void;
}

/**
 * Pagination system appears below the block of companies
 */
export default function PaginateSystem(props: PaginateSystemProps) {
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
				activeClassName="active"
			/>
		</div>
	);
}
