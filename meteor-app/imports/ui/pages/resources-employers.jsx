import React from "react";
import { Link } from "react-router-dom";

import PageWrapper from "/imports/ui/components/page-wrapper";
import ModalText from "/imports/ui/components/modal-text.jsx";
import { translations } from "/imports/ui/translations/index.ts";

const T = translations.resourcesEmployers;

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
									<T.workerEngagementTitle />
								</h2>

								<p>
									<T.workerEngagementDesc />
								</p>

								<p>
									<ModalText
										title={<T.workerEngagementTitle />}
										content={[
											<T.workerEngagementArticle />,
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
									<T.AllianceTitle />
								</h2>

								<p>
									<T.AllianceDesc />
								</p>
								<ModalText
									title={<T.AllianceTitle />}
									content={[
										<T.AllianceArticlePt1 />,
										<Link to="http://www.responsiblebusiness.org/">
											<T.here />
										</Link>,
										<T.AllianceArticlePt2 />,
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
									<T.learnEmployeesTitle />
								</h2>

								<p>
									<T.learnEmployeesDesc />
								</p>

								<ModalText
									title={<T.learnEmployeesTitle />}
									content={[
										<T.learnEmployeesArticlePt1 />,
										<Link to="https://www.mylaborlink.org/">
											LaborLink
										</Link>,
										<T.learnEmployeesArticlePt2 />,
										<Link to="https://www.mylaborlink.org/">
											<T.here />
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
										<translations.resourcesWorkers.publishArticleMessage />
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
