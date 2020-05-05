import React from "react";
import { Link } from "react-router-dom";

import PageWrapper from "imports/ui/components/page-wrapper";
import ModalText from "imports/ui/components/modal-text";
import { translations } from "imports/ui/translations";
import PopupModal from "imports/ui/components/popup-modal";

import {
	Theme,
	createStyles,
	makeStyles,
	useTheme,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const T = translations.resourcesWorkers;

const ArticleCard = styled.div`
	display: flex;
	background-color: white;
	border-radius: 4px;

	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
		0px 1px 1px 0px rgba(0, 0, 0, 0.14),
		0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

const ArticleTitle = styled.h3`
	margin-bottom: 5px;
	font-weight: bold;
`;

const ArticleDetails = styled.div`
	display: flex;
	flex-direction: column;
	padding: 12px;
`;

const ArticleImage = styled.img`
	width: 150px;
	height: 150px;
`;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
		},
		details: {
			display: "flex",
			flexDirection: "column",
		},
		content: {
			flex: "1 0 auto",
		},
		cover: {
			width: 151,
			height: 151,
		},
		controls: {
			display: "flex",
			alignItems: "center",
			paddingLeft: theme.spacing(1),
			paddingBottom: theme.spacing(1),
		},
		playIcon: {
			height: 38,
			width: 38,
		},
	})
);

function ArticleComponent() {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<Card className={classes.root}>
			<CardMedia
				className={classes.cover}
				image="images/Berlitz.png"
				title="Article cover image"
			/>
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Typography component="h5" variant="h5">
						Live From Space
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						Mac Miller
					</Typography>
				</CardContent>
			</div>
		</Card>
	);
}

function ArticleComponent2() {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<ArticleCard>
			<ArticleImage src="images/escudo-uabc.png" />
			<ArticleDetails>
				<ArticleTitle>Training Programs at UABC</ArticleTitle>
			</ArticleDetails>
		</ArticleCard>
	);
}

export default class ResourcesWorkers extends React.Component {
	render() {
		return (
			<PageWrapper title="Resources">
				<br />
				<br />
				<br />
				<br />
				<br />

				<div>
					<ArticleComponent />
				</div>
				<br />
				<ArticleComponent2 />

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
									<T.trainingProgramsTitle />
								</h2>

								<p>
									<T.trainingProgramsDesc />
								</p>

								<p>
									<T.readMore
										renderer={t => (
											<PopupModal
												buttonClass="btn btn-success button"
												buttonText={t}
											>
												<div>
													<h1>
														<T.trainingProgramsTitle />
													</h1>
													<br />
													<T.trainingProgramsArticle />
													<Link to="http://www.uabc.mx/institucion/catalogo/spanish.html">
														<T.here />
													</Link>
												</div>
											</PopupModal>
										)}
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
									<T.laborLawsTitle />
								</h2>

								<p>
									<T.laborLawsDesc />
								</p>
								<p>
									<T.readMore
										renderer={t => (
											<PopupModal
												buttonClass="btn btn-success button"
												buttonText={t}
											>
												<div>
													<h1>
														<T.laborLawsTitle />
													</h1>
													<br />
													<T.laborLawsArticle />
													<Link to="https://www.facebook.com/Ollin-Calli-450536781717887/">
														<T.here />
													</Link>
												</div>
											</PopupModal>
										)}
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
								src="images/logo_ITT.png"
								alt=""
								target="_blank"
							/>
							<div>
								<h2>
									<T.educationDistanceTitle />
								</h2>

								<p>
									<T.educationDistanceDesc />
								</p>

								<p>
									<T.readMore
										renderer={t => (
											<PopupModal
												buttonClass="btn btn-success button"
												buttonText={t}
											>
												<div>
													<h1>
														<T.educationDistanceTitle />
													</h1>
													<br />
													<T.educationDistanceArticlePt1 />
													<Link to="http://tectijuana.edu.mx/educacion-a-distancia/">
														<T.here />
													</Link>
													<T.educationDistanceArticlePt2 />
													<a href="mailto:desarrollo@tectijuana.mx">
														desarrollo@tectijuana.mx
													</a>
												</div>
											</PopupModal>
										)}
									/>
								</p>
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
								<T.becomeBilingualTitle />
							</h2>

							<p>
								<T.becomeBilingualDesc />
							</p>

							<p>
								<T.readMore
									renderer={t => (
										<PopupModal
											buttonClass="btn btn-success button"
											buttonText={t}
										>
											<div>
												<h1>
													<T.becomeBilingualTitle />
												</h1>
												<br />
												<T.becomeBilingualArticle />
												<br />
												<p>
													<Link to="http://www.berlitz.com.mx/">
														<u>
															<strong>
																Berlitz
															</strong>
														</u>
													</Link>
													<br />
													Boulevard Sánchez Taboada
													#10488 Local 9 (Torre
													Platino), Zona Urbana, Río
													Tijuana, B.C., C.P. 22010
													<br />
													Tel: (664) 634-3812 / (664)
													634-3813 / (664) 634-3814
												</p>
												<p>
													<Link to="https://alianzafrancesa.org.mx/tijuana/">
														<u>
															<strong>
																Alianza Francesa
																Tijuana
															</strong>
														</u>
													</Link>
													<br />
													Azucena 3934-C, El Prado,
													22105 Tijuana, B.C.
													<br />
													Tel: (664) 622-1522
												</p>
												<p>
													<Link to="https://www.facebook.com/Centro-de-Idiomas-Le-Monde-119981528034199/">
														<u>
															<strong>
																Centro de
																Idiomas Le Monde
															</strong>
														</u>
													</Link>
													<br />
													Misión de Loreto #2936-A,
													Tijuana, Baja California
													Tijuana, B.C.
													<br />
													Tel: (664) 622-1522
												</p>
												<p>
													<Link to="http://admisiones.celexbc.com.mx:81/html/jpa/">
														<u>
															<strong>
																UABC - Centro
																Universitario de
																Lenguas
																Extranjeras
																(CELEX)
															</strong>
														</u>
													</Link>
													<br />
													Calzada Universidad #14418,
													Parque Industrial
													Internacional, C.P. 22427
													<br />
													Tel: (664) 979-7568 Ext.
													54920
												</p>
												<p>
													<Link to="https://langlab.com/index.php">
														<u>
															<strong>
																Academia de
																Inglés Lang-Lab
															</strong>
														</u>
													</Link>
													<br />
													Fresnillo #2500, Col. Cacho,
													Tijuana Baja California,
													México C.P. 22150
													<br />
													Tel: (664) 634-1709
													<br />
												</p>
											</div>
										</PopupModal>
									)}
								/>
							</p>
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
										<T.publishArticleMessage />
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
