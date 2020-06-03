import React from "react";

import { translations } from "src/translations";

const T = translations.legacyTranslationsNeedsRefactor;

export default function OverviewSection(props) {
	return (
		<div className="col-md-12  section_rview_back_color ">
			<div className="sect-padding ">
				<h4 className="head_section_font">
					{props.company.name} <T.overview_tab.overview />
				</h4>

				<hr />

				<div className="over_p">
					<p>{props.company.descriptionOfCompany}</p>
				</div>
			</div>
		</div>
	);
}
