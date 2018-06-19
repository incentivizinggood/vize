import React from "react";
import Header from "/imports/ui/components/header.jsx";
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

export default class ResourcesWorkers extends React.Component {
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
								src="images/escudo-uabc.png"
								alt=""
								target="_blank"
							/>
							<div>
								<h2>Training Programs at UABC</h2>

								<p>
									Going back to school and getting a degree
									can be an enormous opportunity to increase
									your skill set as well as your wages, but
									many people don’t have the time or the money
									to finish an entire program.{" "}
								</p>

								<p>
									<ModalToggle
										title="Training Programs at UABC"
										content={[
											"Going back to school and getting a degree can be an enormous opportunity to increase your skill set as well as your wages, but many people don’t have the time or the money to finish an entire program. A degree can take years to complete and cost thousands of dollars. If you are working full time this can seem nearly impossible. There is another option, short-term training programs. These courses can give you a experience in accounting, management, writing, or much more. They generally only last about 1 month and are a fraction of the cost of a full degree. If you are interested in finding a course that fits your job and gives you the opportunity to increase your wages, you can find UABC’s programs ",
											<a href="http://www.uabc.mx/institucion/catalogo/spanish.html">
												here
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
								src="images/Ollin_Calli.png"
								alt=""
								target="_blank"
							/>
							<div>
								<h2>Learing about Labor Laws</h2>

								<p>
									It can be very difficult to know if your
									employer has broken labor laws in Mexico. If
									you’ve been having issues with your
									employer, an organization in downtown
									Tijuana, Ollin Calli may be able to help.{" "}
								</p>
								<ModalToggle
									title="Learing about Labor Laws"
									content={[
										"It can be very difficult to know if your employer has broken labor laws in Mexico. The legal system is very complicated especially if you’ve never been trained, but Mexico’s labor laws cover many more abuses than you would expect. If you’ve been having issues with your employer, an organization in downtown Tijuana, Ollin Calli may be able to help. They are a nonprofit that helps employees that have been taken advantage of by their employer. They can help with certain legal issues, provide you with more information about your rights, or give you a variety of options. If you want to reach them you can find their website ",
										<a href="https://www.facebook.com/Ollin-Calli-450536781717887/">
											here
										</a>,
										".",
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
								src="images/logo_ITT.png"
								alt=""
								target="_blank"
							/>
							<div>
								<h2>Education at a Distance</h2>

								<p>
									Increase your level of education with
									"Educacion a Distancia", a course designed
									by Tecnologico Nacional de Mexico for people
									that work full-time but want to increase
									their skills to find a new and better paying
									job.{" "}
								</p>

								<ModalToggle
									title="Education at a Distance - Tecnologico Nacional de Mexico"
									content={[
										"Making time to increase your level of education while working a full-time job can be very difficult. You may have to work 5 - 6 days a week with long hours, so going to a normal class during the week is impossible. The key is to find an education that allows you to be flexible with your schedule, and doesn’t require going to class every day. This is why the Tecnologico Nacional de Mexico created the Educacion a Distancia, a course designed for people that work full-time but want to increase their skills to find a new and better paying job. The courses are taught only on Saturdays for 4 - 6 hours and the rest of the class can be done entirely online with your phone or a computer. Right now there are two majors provided, Industrial Engineering and Logistics Engineering. If you’re interested you can check out their website ",
										<a href="http://tectijuana.edu.mx/educacion-a-distancia/">
											here
										</a>,
										", or contact the Department of Academic Development at (664) 607-8410 ext 127 or email at desarrollo@tectijuana.mx.",
									]}
								/>
							</div>
						</li>
					</ul>
				</div>

				<br />
				<br />

				<ul className="article-list-vertical">
					<li>
						<img
							className="center"
							src="images/Berlitz.png"
							alt=""
							target="_blank"
						/>
						<div>
							<h2>Become Bilingual!</h2>

							<p>
								If you can speak English you can often negotiate
								a much higher wage with your employer or find a
								higher paying job. We’ve listed the top five
								bilingual classes in Tijuana below with their
								contact information. Feel free to check them
								out!
							</p>

							<ModalToggle
								title="Become Bilingual!"
								content={[
									"Tijuana is the city of maquiladoras. Companies from all over the world come here to manufacture their products including Japan, Korea, and of course the United States. The one thing all of these companies have in common, is that their staff often speaks English. If you can speak English you can often negotiate a much higher wage with your employer or find a higher paying job. We’ve listed the top five bilingual classes in Tijuana below with their contact information. Feel free to check them out!",
									<br />,

									<p>
										<a href="http://www.berlitz.com.mx/">
											<u>
												<strong>Berlitz</strong>
											</u>
										</a>
										<br />
										Boulevard Sánchez Taboada #10488 Local 9
										(Torre Platino), Zona Urbana, Río
										Tijuana, B.C., C.P. 22010
										<br />
										Tel: (664) 634-3812 / (664) 634-3813 /
										(664) 634-3814
									</p>,
									<p>
										<a href="https://alianzafrancesa.org.mx/tijuana/">
											<u>
												<strong>
													Alianza Francesa Tijuana
												</strong>
											</u>
										</a>
										<br />
										Azucena 3934-C, El Prado, 22105 Tijuana,
										B.C.
										<br />
										Tel: (664) 622-1522
									</p>,
									<p>
										<a href="https://www.facebook.com/Centro-de-Idiomas-Le-Monde-119981528034199/">
											<u>
												<strong>
													Centro de Idiomas Le Monde
												</strong>
											</u>
										</a>
										<br />
										Misión de Loreto #2936-A, Tijuana, Baja
										California Tijuana, B.C.
										<br />
										Tel: (664) 622-1522
									</p>,
									<p>
										<a href="http://admisiones.celexbc.com.mx:81/html/jpa/">
											<u>
												<strong>
													UABC - Centro Universitario
													de Lenguas Extranjeras
													(CELEX)
												</strong>
											</u>
										</a>
										<br />
										Calzada Universidad #14418, Parque
										Industrial Internacional, C.P. 22427
										<br />
										Tel: (664) 979-7568 Ext. 54920
									</p>,
									<p>
										<a href="https://langlab.com/index.php">
											<u>
												<strong>
													Academia de Inglés Lang-Lab
												</strong>
											</u>
										</a>
										<br />
										Fresnillo #2500, Col. Cacho, Tijuana
										Baja California, México C.P. 22150
										<br />
										Tel: (664) 634-1709
										<br />
									</p>,
								]}
							/>
						</div>
					</li>
				</ul>

				<div id="vizeModal" className="modal">
					<div className="modal-content">
						<span className="close">&times;</span>
						<h1> Vize </h1>
						<h6> November 2017 - Present </h6>
						<h4> Overview </h4>
						<p>
							Vize is a platform where workers in developing
							countries will be able to find reviews of companies
							with details on safety, wages, working conditions,
							and much more. I am currently working as a front end
							web developer using the react framework and am also
							leading the technical team by managing the project
							workflow and coordinating the engineers in their
							efforts.
						</p>
						<br />
						<h4> Experience </h4>
						<p>
							Vize offers a unique experience where I have the
							opportunity to exercise my technical ability and my
							business/leadership insights to be an influential
							part of the startup. As a front end web developer I
							used HTML, CSS, & Javascript to design the website
							and then integrated it into components on the react
							platform. Managing the technical team has been a
							challenging role that has taught me the importance
							of designing a software structure that facilitates
							the coordination of all of the engineer's efforts. I
							also took the time to research tools and software
							that could facilitate the project and work flow
							management so that there can be open lines of
							communication between what everyone is working on.
						</p>
						<p>
							I'm motivated to work at Vize because of the social
							impact that the platform can have in improving the
							working conditions in developing countries. With a
							review and rating systems, there is a form of
							accountability for factories to have safe working
							conditions, reasonable working hours, and fair wages
							across different jobs for both genders.
						</p>
					</div>
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
