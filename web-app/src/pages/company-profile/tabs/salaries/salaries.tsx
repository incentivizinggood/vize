import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { urlGenerators } from "src/pages";
import { translations } from "src/translations";

import SalaryPosting from "./salary-posting";
import { AddSalaryButton } from "src/components/button";

const T = translations.legacyTranslationsNeedsRefactor;

function SalaryTab(props) {
	const renderedSalaries = props.company.salaries.map(salary => (
		<SalaryPosting key={salary.id} salary={salary} />
	));

	return (
		<>
			<div className="col-md-12  section_rview_back_color03 ">
				<h4 className="head_section_font">
					{props.company.numSalaries} <T.salary_tab.job_salaries />
				</h4>
				<div className="add-buttons">
					<AddSalaryButton
						companyName={props.company.name}
						buttonLocation="Company Profile | Salaries"
					/>
					{/* <button ><i className="fa fa-plus" ></i>&nbsp; Add a Review</button> */}
				</div>

				{/* <button>
              <i className="fa fa-plus"></i>&nbsp; Add a Salary</button> */}
			</div>

			<div className="col-md-12  section_rview_back_color05 ">
				{/* <SalaryPosting />
            <hr />
            <SalaryPosting /> */}

				{renderedSalaries}

				{/* mobile view range show  section 1  code */}

				<div className="clear" />
			</div>
		</>
	);
}

export default SalaryTab;
