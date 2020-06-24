import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { urlGenerators } from "imports/ui/pages";
import { AddSalaryButton } from "imports/ui/components/button";

import { translations } from "imports/ui/translations";

const T = translations.legacyTranslationsNeedsRefactor;

function SalariesSection(props) {
	// FIRST SALARY CODE TO SHOW ON THE OVERVIEW TAB
	let salariesToDisplay;
	if (props.numSalaries > 0) {
		salariesToDisplay = (
			<div>
				<div className="hed-soft-mob">
					<p>{props.company.salaries[0].jobTitle}</p>
					<hr />
				</div>

				<p className="mal-r">{props.company.salaries[0].gender}</p>

				<p>
					{props.company.salaries[0].incomeType}
					<span>: {props.company.salaries[0].incomeAmount}</span>
				</p>
			</div>
		);
	} else {
		salariesToDisplay = <T.overview_tab.salaries_text />;
	}

	return (
		<div className="col-md-12  section_rview_back_color_job">
			{" "}
			{/* salaries  */}
			<div className="sect-padding">
				<h4 className="head_section_font">
					{props.company.numSalaries} <T.overview_tab.job_salaries />
				</h4>

				<div className="add-buttons">
					<AddSalaryButton
						companyName={props.company.name}
						buttonLocation="Company Profile | Overview"
					/>
				</div>
				<hr />

				{
					//salariesToDisplay
				}

				<div style={{ textAlign: "center" }}>
					<Link
						to="#salaries"
						aria-controls="salaries"
						role="tab"
						data-toggle="tab"
					>
						<strong>
							<T.overview_tab.see_all_salaries />
						</strong>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default SalariesSection;
