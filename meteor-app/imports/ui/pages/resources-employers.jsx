import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";

import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import Dialog from "/imports/ui/components/dialog-box";

const T = i18n.createComponent();

const customStyles = {
	content: {
		position: "relative",
		marginTop: "110px",
		maxHeight: "80%",
	},
};

const glyphStyle = {
	fontSize: "15px",
	textAlign: "center",
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement')

export default class ResourcesEmployers extends React.Component {
	render() {
		return (
			<div>
				<div className="navbarwhite">
					<Header />
				</div>
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
									<ModalToggle
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
								<ModalToggle
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

								<ModalToggle
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

				<Footer />
				<Dialog />
			</div>
		);
	}
}

class ModalToggle extends React.Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false,
		};

		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	afterOpenModal() {
		// references are now sync'd and can be accessed.
		this.subtitle.style.color = "#f00";
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}
	render() {
		return (
			<div>
				<p>
					<button
						className="btn btn-success button"
						onClick={this.openModal}
					>
						<T>common.resourcesWorkers.readMore</T>
					</button>
				</p>
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Example Modal"
					className="modal-content"
				>
					<div className="scroll">
						{" "}
						<span>
							{" "}
							<a onClick={this.closeModal}>
								<i
									style={{
										fontSize: "25px",
										float: "right",
									}}
									className="remove glyphicon glyphicon-remove"
								/>
							</a>
							<h2
								className="text-center"
								ref={subtitle => (this.subtitle = subtitle)}
							>
								{this.props.title}
							</h2>
						</span>
						<br />
						<p>{this.props.content} </p>
					</div>
				</Modal>
			</div>
		);
	}
}
