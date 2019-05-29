import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

import { urlGenerators } from "/imports/ui/pages";
import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";

import SalaryPosting from "./salary-posting.jsx";

const T = i18n.createComponent();

class SalaryTab extends React.Component {
	render() {
		const renderedSalaries = this.props.company.salaries.map(salary => (
			<SalaryPosting key={salary.id} salary={salary} />
		));

		return (
			<div role="tabpanel" className="tab-pane" id="salaries">
				<div className="col-md-12  section_rview_back_color03 ">
					<h4 className="head_section_font">
						{this.props.company.numSalaries}{" "}
						<T>common.salary_tab.job_salaries</T>
					</h4>
					<div className="add-buttons">
						<Link
							to={urlGenerators.vizeSalaryUrl(
								this.props.company.id
							)}
							className="btn btn-primary"
						>
							{" "}
							<FontAwesomeIcon icon={faPlus} />
							{i18n.__("common.salary_tab.add_salary")}
						</Link>
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
}

export default withUpdateOnChangeLocale(SalaryTab);
