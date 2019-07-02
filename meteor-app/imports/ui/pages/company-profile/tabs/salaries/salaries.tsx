import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { i18n } from "meteor/universe:i18n";

import { urlGenerators } from "imports/ui/pages";
import withUpdateOnChangeLocale from "imports/ui/hoc/update-on-change-locale";
import { LinkButton } from "imports/ui/components/button";

import SalaryPosting from "./salary-posting";

const T = i18n.createComponent();

function SalaryTab(props) {
	const renderedSalaries = props.company.salaries.map(salary => (
		<SalaryPosting key={salary.id} salary={salary} />
	));

	return (
		<div role="tabpanel" className="tab-pane" id="salaries">
			<div className="col-md-12  section_rview_back_color03 ">
				<h4 className="head_section_font">
					{props.company.numSalaries}{" "}
					<T>common.salary_tab.job_salaries</T>
				</h4>
				<div className="add-buttons">
					<LinkButton
						to={urlGenerators.vizeSalaryUrl(props.company.id)}
						primary
					>
						<FontAwesomeIcon icon={faPlus} />
						&nbsp;
						<T>common.salary_tab.add_salary</T>
					</LinkButton>
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
		</div>
	);
}

export default withUpdateOnChangeLocale(SalaryTab);
