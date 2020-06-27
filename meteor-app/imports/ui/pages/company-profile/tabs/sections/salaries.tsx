import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { SalaryPosting } from "../salaries";
import { SectionHeaderContainer } from "../../components";
import styled from "styled-components";
import { forSize } from "imports/ui/responsive.js";

import { urlGenerators } from "imports/ui/pages";
import { AddSalaryButton } from "imports/ui/components/button";

import { translations } from "imports/ui/translations";

const T = translations.legacyTranslationsNeedsRefactor;

function SalariesSection(props) {
	// FIRST SALARY CODE TO SHOW ON THE OVERVIEW TAB
	console.log("or", props);

	const SalariesToDisplay = () => {
		if (props.company.numSalaries > 0) {
			return props.company.salaryStats.map((salary, i) => (
				<SalaryPosting key={i} salary={salary} />
			));
		} else {
			return <T.overview_tab.salaries_text />;
		}
	};

	return (
		<div style={{ marginTop: "15px" }}>
			<SectionHeaderContainer>
				<h4 className="head_section_font">
					{props.company.numSalaries} <T.overview_tab.job_salaries />
				</h4>

				<div className="add-buttons">
					<AddSalaryButton
						companyName={props.company.name}
						buttonLocation="Company Profile | Overview"
					/>
				</div>
			</SectionHeaderContainer>
			<div>
				<SalariesToDisplay />
			</div>
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
	);
}

export default SalariesSection;
