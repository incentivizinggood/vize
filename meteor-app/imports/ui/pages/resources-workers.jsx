import React from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";

import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";

import PageWrapper from "/imports/ui/components/page-wrapper";

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

export default class ResourcesWorkers extends React.Component {
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
								src="images/escudo-uabc.png"
								alt=""
								target="_blank"
							/>
							<div>
								<h2>
									<T>
										common.resourcesWorkers.trainingProgramsTitle
									</T>
								</h2>

								<p>
									<T>
										common.resourcesWorkers.trainingProgramsDesc
									</T>
								</p>

								<p>
									<ModalToggle
										title={
											<T>
												common.resourcesWorkers.trainingProgramsTitle
											</T>
										}
										content={[
											<T>
												common.resourcesWorkers.trainingProgramsArticle
											</T>,
											<Link to="http://www.uabc.mx/institucion/catalogo/spanish.html">
												<T>
													common.resourcesWorkers.here
												</T>
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
								src="images/Ollin_Calli.png"
								alt=""
								target="_blank"
							/>
							<div>
								<h2>
									<T>
										common.resourcesWorkers.laborLawsTitle
									</T>
								</h2>

								<p>
									<T>common.resourcesWorkers.laborLawsDesc</T>
								</p>
								<ModalToggle
									title={
										<T>
											common.resourcesWorkers.laborLawsTitle
										</T>
									}
									content={[
										<T>
											common.resourcesWorkers.laborLawsArticle
										</T>,
										<Link to="https://www.facebook.com/Ollin-Calli-450536781717887/">
											<T>common.resourcesWorkers.here</T>
										</Link>,
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
								<h2>
									<T>
										common.resourcesWorkers.educationDistanceTitle
									</T>
								</h2>

								<p>
									<T>
										common.resourcesWorkers.educationDistanceDesc
									</T>
								</p>

								<ModalToggle
									title={
										<T>
											common.resourcesWorkers.educationDistanceTitle
										</T>
									}
									content={[
										<T>
											common.resourcesWorkers.educationDistanceArticlePt1
										</T>,
										<Link to="http://tectijuana.edu.mx/educacion-a-distancia/">
											<T>common.resourcesWorkers.here</T>
										</Link>,
										<T>
											common.resourcesWorkers.educationDistanceArticlePt2
										</T>,
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
							<h2>
								<T>
									common.resourcesWorkers.becomeBilingualTitle
								</T>
							</h2>

							<p>
								<T>
									common.resourcesWorkers.becomeBilingualDesc
								</T>
							</p>

							<ModalToggle
								title={
									<T>
										common.resourcesWorkers.becomeBilingualTitle
									</T>
								}
								content={[
									<T>
										common.resourcesWorkers.becomeBilingualArticle
									</T>,
									<br />,

									<p>
										<Link to="http://www.berlitz.com.mx/">
											<u>
												<strong>Berlitz</strong>
											</u>
										</Link>
										<br />
										Boulevard Sánchez Taboada #10488 Local 9
										(Torre Platino), Zona Urbana, Río
										Tijuana, B.C., C.P. 22010
										<br />
										Tel: (664) 634-3812 / (664) 634-3813 /
										(664) 634-3814
									</p>,
									<p>
										<Link to="https://alianzafrancesa.org.mx/tijuana/">
											<u>
												<strong>
													Alianza Francesa Tijuana
												</strong>
											</u>
										</Link>
										<br />
										Azucena 3934-C, El Prado, 22105 Tijuana,
										B.C.
										<br />
										Tel: (664) 622-1522
									</p>,
									<p>
										<Link to="https://www.facebook.com/Centro-de-Idiomas-Le-Monde-119981528034199/">
											<u>
												<strong>
													Centro de Idiomas Le Monde
												</strong>
											</u>
										</Link>
										<br />
										Misión de Loreto #2936-A, Tijuana, Baja
										California Tijuana, B.C.
										<br />
										Tel: (664) 622-1522
									</p>,
									<p>
										<Link to="http://admisiones.celexbc.com.mx:81/html/jpa/">
											<u>
												<strong>
													UABC - Centro Universitario
													de Lenguas Extranjeras
													(CELEX)
												</strong>
											</u>
										</Link>
										<br />
										Calzada Universidad #14418, Parque
										Industrial Internacional, C.P. 22427
										<br />
										Tel: (664) 979-7568 Ext. 54920
									</p>,
									<p>
										<Link to="https://langlab.com/index.php">
											<u>
												<strong>
													Academia de Inglés Lang-Lab
												</strong>
											</u>
										</Link>
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
