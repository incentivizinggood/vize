import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

import { urlGenerators } from "/imports/ui/pages";
import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";

const T = i18n.createComponent();

class SalariesSection extends React.Component {
	render() {
		// FIRST SALARY CODE TO SHOW ON THE OVERVIEW TAB
		let salariesToDisplay;
		if (this.props.company.salaries.length > 0) {
			salariesToDisplay = (
				<div>
					<div className="hed-soft-mob">
						<p>{this.props.company.salaries[0].jobTitle}</p>
						<hr />
					</div>

					<p className="mal-r">
						{this.props.company.salaries[0].gender}
					</p>

					<p>
						{this.props.company.salaries[0].incomeType}
						<span>
							: {this.props.company.salaries[0].incomeAmount}
						</span>
					</p>
				</div>
			);
		} else {
			salariesToDisplay = <T>common.overview_tab.salaries_text</T>;
		}

		return (
			<div className="col-md-12  section_rview_back_color_job">
				{" "}
				{/* salaries  */}
				<div className="sect-padding">
					<h4 className="head_section_font">
						{this.props.company.numSalaries}{" "}
						<T>common.overview_tab.job_salaries</T>
					</h4>

					<div className="add-buttons">
						<Link
							to={urlGenerators.vizeSalaryUrl(
								this.props.company.id
							)}
							className="btn btn-primary"
						>
							<FontAwesomeIcon icon={faPlus} />{" "}
							{i18n.__("common.overview_tab.add_salary")}
						</Link>
					</div>
					<hr />

					{salariesToDisplay}

					<center>
						<ul className="" role="tablist">
							<li
								role="presentation"
								id="see_all_salaries"
								className="te_deco"
							>
								<Link
									to="#salaries"
									aria-controls="salaries"
									role="tab"
									data-toggle="tab"
								>
									<strong>
										<T>
											common.overview_tab.see_all_salaries
										</T>
									</strong>
								</Link>
							</li>
						</ul>
					</center>
				</div>
			</div>
		);
	}
}

export default withUpdateOnChangeLocale(SalariesSection);
