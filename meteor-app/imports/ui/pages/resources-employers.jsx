import React from "react";
import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import { Meteor } from "meteor/meteor";
import Modal from "react-modal";

const customStyles = {
	content: {
		//top: "50%",
		//left: "50%",
		position: "relative",
		marginTop: "90px",
		maxHeight: "80%",
		//	width 								: '80%',

		//transform: "translate(-50%, -50%)",
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
								<h2>Worker Engagement</h2>

								<p>
									Figuring out what your employees actually
									think and want from your company can be very
									difficult. How do you learn what your
									employees really want to ensure they stay
									and don’t become another turnover statistic?{" "}
								</p>

								<p>
									<ModalToggle
										title="Worker Engagement"
										content={[
											"Figuring out what your employees actually think and want from your company can be very difficult. Often times they are afraid of upsetting their managers because they don’t want to lose their jobs or be punished.  Instead many employees would rather just leave for a different company. So how do you learn what your employees really want to ensure they stay and don’t become another turnover statistic? We at Vize want to help. We’ve created a platform for employees to tell you what is great and what could be improved in your factory. You can read their ratings on various aspects of your company like wages, benefits, manager relationship, and health and safety. With this general knowledge you can then read their reviews to get a more in-depth understanding of your employees. If you contact the Vize team we can also help analyze those reviews and give you direct feedback on your employees deepest concerns and how to use these insights to lower the turnover rate. If you’d be interested in contacting the Vize team please email us at ",
											<a href="mailto:incentiviizinggood@gmail.com">
												incentiviizinggood@gmail.com
											</a>,
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
								<h2>Responsible Business Alliance</h2>

								<p>
									The Responsible Business Alliance (RBA) is
									an association of companies in the
									electronics, retail, auto, and toy industry
									that have come together to improve
									conditions for their employees.{" "}
								</p>
								<ModalToggle
									title="Responsible Business Alliance"
									content={[
										"The Responsible Business Alliance (RBA) is an association of companies in the electronics, retail, auto, and toy industry that have come together to improve conditions for their employees. As a result, the retainment in the companies they assist has increased. These improvements is believed to lead to greater productivity and profitability as employees are better trained and more highly motivated. RBA’s staff helps these companies perform assessments of their workforce and train the management on how best to tackle the challenges they find. A full list of their services can be found ",
										<a href="http://www.responsiblebusiness.org/">
											here
										</a>,
										". They also have an online academy to provide a more affordable option to consulting.",
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
								<h2>Learn from your Employees</h2>

								<p>
									The competition for labor right now is as
									high as it has ever been. Employees will
									often leave a position if another job pays
									just an extra few pesos. To keep great
									employees, your company must differentiate
									itself.
								</p>

								<ModalToggle
									title="Learn from your Employees"
									content={[
										"The competition for labor right now is as high as it has ever been. Employees will often leave a position if another job pays just an extra few pesos. Turnover rates in many factories are 8% of their entire workforce every month. This increases the cost of retraining and recruiting new employees. To keep great  employees, your company must differentiate itself. Elevate Limited can help you do just that by learning what your employees really want, and how to act on that information. They use a program called ",
										<a href="https://www.mylaborlink.org/">
											LaborLink
										</a>,
										" to get direct and honest feedback from your employees through a phone survey. Consultants can then help you formulate a plan for how to meet those employees’ needs. If you are interested in learning more about their services, you can find their website ",
										<a href="https://www.mylaborlink.org/">
											here
										</a>,
										", or contact their Mexico office at the below information.",
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
										Would you like to publish an article on
										our site? Email us your article to
										incentivizinggood@gmail.com.
									</h1>
								</center>
							</div>

							<div className="col-md-2" />
						</div>
						<div className="clearfix" />
					</div>
				</div>

				<Footer />
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
						Read More →
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
