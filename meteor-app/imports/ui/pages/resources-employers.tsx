import React from "react";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

import PageWrapper from "/imports/ui/components/page-wrapper";
import ModalText from "/imports/ui/components/modal-text.jsx";

const T = i18n.createComponent();

export default class ResourcesEmployers extends React.Component {
	render() {
		return (
			<PageWrapper title="Resources">
				<br />
				<br />
				<br />
				<br />
				<br />

				<div className="container-fluid">
					<ul className="article-list-vertical">
						<li>
							<img
								className="center"
								src="images/employerPostVize.jpg"
								alt=""
								target="_blank"
							/>
							<div>
								<h2>
									<T>
										common.resourcesEmployers.workerEngagementTitle
									</T>
								</h2>

								<p>
									<T>
										common.resourcesEmployers.workerEngagementDesc
									</T>
								</p>

								<p>
									<ModalText
										title={
											<T>
												common.resourcesEmployers.workerEngagementTitle
											</T>
										}
										content={[
											<T>
												common.resourcesEmployers.workerEngagementArticle
											</T>,
											<Link to="mailto:incentiviizinggood@gmail.com">
												incentiviizinggood@gmail.com
											</Link>,
											".",
										]}
									/>
								</p>
							</div>
						</li>
					</ul>

					<br />
					<br />

					<ul className="article-list-vertical">
						<li>
							<img
								className="center"
								src="images/employerPostAllianceLogo.png"
								alt=""
								target="_blank"
							/>
							<div>
								<h2>
									<T>
										common.resourcesEmployers.AllianceTitle
									</T>
								</h2>

								<p>
									<T>
										common.resourcesEmployers.AllianceDesc
									</T>
								</p>
								<ModalText
									title={
										<T>
											common.resourcesEmployers.AllianceTitle
										</T>
									}
									content={[
										<T>
											common.resourcesEmployers.AllianceArticlePt1
										</T>,
										<Link to="http://www.responsiblebusiness.org/">
											<T>
												common.resourcesEmployers.here
											</T>
										</Link>,
										<T>
											common.resourcesEmployers.AllianceArticlePt2
										</T>,
									]}
								/>
							</div>
						</li>
					</ul>

					<br />
					<br />

					<ul className="article-list-vertical">
						<li>
							<img
								className="center"
								src="images/employerPostLaborlinkLogo.png"
								alt=""
								target="_blank"
							/>
							<div>
								<h2>
									<T>
										common.resourcesEmployers.learnEmployeesTitle
									</T>
								</h2>

								<p>
									<T>
										common.resourcesEmployers.learnEmployeesDesc
									</T>
								</p>

								<ModalText
									title={
										<T>
											common.resourcesEmployers.learnEmployeesTitle
										</T>
									}
									content={[
										<T>
											common.resourcesEmployers.learnEmployeesArticlePt1
										</T>,
										<Link to="https://www.mylaborlink.org/">
											LaborLink
										</Link>,
										<T>
											common.resourcesEmployers.learnEmployeesArticlePt2
										</T>,
										<Link to="https://www.mylaborlink.org/">
											<T>
												common.resourcesEmployers.here
											</T>
										</Link>,
										<br />,

										<p>
											Elevate Limited Mexico City
											<br />
											Calzada Zavaleta 1108, Piso 9 Desp.
											901, Colonia Santa Cruz Buenavista.
											CP 72150. Puebla, Mexico
											<br />
											Tel: +52 (222) 290-21-57
											<br />
											Or: +52 (222) 290-21-56
										</p>,
									]}
								/>
							</div>
						</li>
					</ul>
				</div>

				<div className="star" id="services">
					<div className="container">
						<div className="row">
							<div className="col-md-2" />
							<div className="col-md-8">
								<center>
									<h1 className="titlestar22">
										<T>
											common.resourcesWorkers.publishArticleMessage
										</T>
										<Link to="mailto:incentivizinggood@gmail.com">
											incentivizinggood@gmail.com
										</Link>
										.
									</h1>
								</center>
							</div>

							<div className="col-md-2" />
						</div>
						<div className="clearfix" />
					</div>
				</div>
			</PageWrapper>
		);
	}
}
