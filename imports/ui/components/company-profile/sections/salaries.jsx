import React from "react";

import i18n from "meteor/universe:i18n";

import { urlGenerators } from "/imports/startup/client/router.jsx";

const T = i18n.createComponent();

export default class SalariesSection extends React.Component {
	componentDidMount() {
		// Ask to be updated "reactively".
		// universe:i18n cannot be trusted to do that automaticaly.
		this.i18nInvalidate = () => this.forceUpdate();
		i18n.onChangeLocale(this.i18nInvalidate);
	}

	componentWillUnmount() {
		i18n.offChangeLocale(this.i18nInvalidate);
	}

	render() {
		// FIRST SALARY CODE TO SHOW ON THE OVERVIEW TAB
		let salaries_to_display;
		if (this.props.salaries.length > 0) {
			salaries_to_display = (
				<div>
					<div className="hed-soft-mob">
						<p>{this.props.salaries[0].jobTitle}</p>
						<hr />
					</div>

					<p className="mal-r">{this.props.salaries[0].gender}</p>

					<p>
						{this.props.salaries[0].incomeType}
						<span>: {this.props.salaries[0].incomeAmount}</span>
					</p>
				</div>
			);
		} else {
			salaries_to_display = <T>common.overview_tab.salaries_text</T>;
		}

		return (
			<div className="col-md-12  section_rview_back_color_job">
				{" "}
				{/* salaries  */}
				<div className="sect_re1  sec_p">
					<h4 className="head_section_font">
						{this.props.salariesCount}{" "}
						<T>common.overview_tab.job_salaries</T>
					</h4>

					<div className="add-buttons">
						<a
							href={urlGenerators.vizeSalaryUrl(
								this.props.companyoverview._id
							)}
							className="btn btn-primary"
						>
							<i className="fa fa-plus" aria-hidden="true" />{" "}
							{i18n.__("common.overview_tab.add_salary")}
						</a>
					</div>
					<hr />

					{salaries_to_display}

					<center>
						<ul className="" role="tablist">
							<li
								role="presentation"
								id="see_all_salaries"
								className="te_deco"
							>
								<a
									href="#salaries"
									aria-controls="salaries"
									role="tab"
									data-toggle="tab"
								>
									<strong>
										<T>
											common.overview_tab.see_all_salaries
										</T>
									</strong>
								</a>
							</li>
						</ul>
					</center>
				</div>
			</div>
		);
	}
}
