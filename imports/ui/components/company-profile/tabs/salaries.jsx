import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import i18n from "meteor/universe:i18n";

import { urlGenerators } from "/imports/startup/client/router.jsx";

import SalaryPosting from "/imports/ui/components/salaryPosting.jsx";

const T = i18n.createComponent();

export default class SalaryTab extends React.Component {
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
						<a
							href={urlGenerators.vizeSalaryUrl(
								this.props.company.id
							)}
							className="btn btn-primary"
						>
							{" "}
							<FontAwesomeIcon icon="plus" />
							{i18n.__("common.salary_tab.add_salary")}
						</a>
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

					<div className="mobile_view">
						<div>
							<div className="hed-soft-mob">
								<p>Software Engineer</p>
							</div>

							<p className="mal-r">Male</p>
							<div className="pad-r">
								<p>
									Average<span>:$125,333</span>
								</p>
								<p>
									Range<span>:$99k-166k</span>
								</p>
							</div>

							<p className="mal-r">Female</p>
							<div className="pad-r">
								<p>
									Average<span>:$125,333</span>
								</p>
								<p>
									Range<span>:$99k-166k</span>
								</p>
							</div>
						</div>

						<div>
							<hr />
							<div className="hed-soft-mob">
								<p>Product Manager</p>
							</div>

							<p className="mal-r">Male</p>
							<div className="pad-r">
								<p>
									Average<span>:$125,333</span>
								</p>
								<p>
									Range<span>:$99k-166k</span>
								</p>
							</div>

							<p className="mal-r">Female</p>
							<div className="pad-r">
								<p>
									Average<span>:$125,333</span>
								</p>
								<p>
									Range<span>:$99k-166k</span>
								</p>
							</div>
						</div>

						{/* mobile view range show   code  end */}
					</div>
					<div className="clear" />
				</div>
			</div>
		);
	}
}
