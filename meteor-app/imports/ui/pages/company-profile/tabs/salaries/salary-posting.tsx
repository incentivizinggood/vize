import React from "react";
import styled from "styled-components";

const SalaryCardContainer = styled.div`
	display: flex;
	background-color: white;
	border-radius: 4px;
	margin: 10px;
	height: 125px;

	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
		0px 1px 1px 0px rgba(0, 0, 0, 0.14),
		0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

type SalaryStatsProps = {
	salary: {
		jobTitle: string;
		totalAvgPay: number;
		totalMaxPay: number;
		totalMinPay: number;
	};
};

export default function SalaryPosting({ salary }: SalaryStatsProps) {
	console.log("sdfrrtrtt", salary);
	return (
		<SalaryCardContainer>
			<div className="col-md-12 section_rview_back_color05 ">
				<div className="sect-padding ">
					<div className="hed-soft-mob">
						<p>{salary.jobTitle}</p>
						<hr />
					</div>

					{/*
							ERROR: Gender is not in the API schema.
							<p className="mal-r">{props.salary.gender}</p>
						*/}
					<div className="pad-r">
						<p>
							{salary.totalAvgPay}
							<span>: {salary.totalMaxPay}</span>
						</p>
					</div>
				</div>
			</div>
		</SalaryCardContainer>
	);
}
