import React from "react";

import i18n from "meteor/universe:i18n";

const T = i18n.createComponent();

export default function OverviewSection(props) {
	return (
		<div className="col-md-12  section_rview_back_color ">
			<div className="sect_re1 ">
				<h4 className="head_section_font">
					{props.companyoverview.name}{" "}
					<T>common.overview_tab.overview</T>
				</h4>

				<hr />

				<div className="over_p">
					<p>{props.companyoverview.descriptionOfCompany}</p>
				</div>
			</div>
		</div>
	);
}
