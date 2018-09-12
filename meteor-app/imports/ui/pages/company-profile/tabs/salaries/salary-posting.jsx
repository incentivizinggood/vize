import React from "react";

export default function SalaryPosting(props) {
	return (
		<div>
			<div>
				<div className="col-md-12 section_rview_back_color05 ">
					<div className="sect_re11 ">
						<div className="hed-soft-mob">
							<p>{props.salary.jobTitle}</p>
							<hr />
						</div>

						{/*
							ERROR: Gender is not in the API schema.
							<p className="mal-r">{props.salary.gender}</p>
						*/}
						<div className="pad-r">
							<p>
								{props.salary.incomeType}
								<span>: {props.salary.incomeAmount}</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
