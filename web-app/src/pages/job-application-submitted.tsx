import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { forSize } from "src/responsive";
import * as urlGenerators from "src/pages/url-generators";
import ClipboardIcon from "@material-ui/icons/Assignment";
import ClipboardCopiedIcon from "@material-ui/icons/AssignmentTurnedIn";

import { useUser } from "src/hoc/user";
import PageWrapper from "src/components/page-wrapper";
import { translations } from "src/translations";

import { WriteReviewButton } from "src/components/button";

import {
	FacebookShareButton,
	WhatsappShareButton,
	FacebookIcon,
	WhatsappIcon,
} from "react-share";

const T = translations.legacyTranslationsNeedsRefactor.jobApplicationSubmitted;
const TLogin = translations.loginRegister;

const PageContentContainer = styled.div`
	margin-top: 250px;
	margin-bottom: 250px;
	padding: 50px;
	background-color: #fefdfe;
	box-shadow: 0px 1px 3px 0px;
	width: 80%;
	display: flex;
	border-radius: 8px;

	margin-right: auto;
	margin-left: auto;

	p {
		color: black;
		text-align: center;
	}

	h2 {
		font-weight: bold;
	}

	${forSize.phoneOnly} {
		width: 100%;
		margin-top: 70px;
		margin-bottom: 0px;
		padding: 30px 0px;
		border-radius: 0px;
	}
`;

const personalReferralMessage =
	"Hola que tal! Te quiero contar de una empresa que se llama Vize (Incentivando el Bien) que tiene el objetivo de mejorar las condiciones de trabajo en las fabricas por medio de que los empleados escriban evaluaciones totalmente anónimas sobre sus experiencias laborando en ellas. Te invito a participar. \r\n\r\nPuedes llenar la encuesta aquí:";

const publicReferralMessage =
	"Hola, les quiero contar de una empresa que se llama Vize (Incentivando el Bien) que tiene el objetivo de mejorar las condiciones de trabajo en las fabricas por medio de que los empleados escriban evaluaciones totalmente anónimas sobre sus experiencias laborando en ellas. Los invito a participar. \r\n\r\nnPueden llenar la encuesta aquí:";

interface JobApplicationSubmittedProps {
	companyName?: string;
}

export default function JobApplicationSubmitted({companyName}: JobApplicationSubmittedProps) {
	const user = useUser();
	const referralLink = "vize.mx";
	console.log("ccmp", companyName);

	function renderContent() {
		return (
			<div className="col-md-12">
				<h2 className="text-center">
					<T.jobApplicationSubmitted /> {companyName}
				</h2>
				<p>
					{companyName} <T.companyWillReachOut />
				</p>
				<p>
					<T.contactUs />
				</p>

				

				<br />

				<div className="div-centered-elements">
					<WhatsappShareButton
						url={referralLink}
						title={personalReferralMessage}
					>
						<WhatsappIcon size={48} round={true} />
					</WhatsappShareButton>
					{"    "}
					<FacebookShareButton
						url={referralLink}
						quote={publicReferralMessage}
						hashtag="#incentivandoelbien"
					>
						<FacebookIcon size={48} round={true} />
					</FacebookShareButton>
				</div>

				<br />

				<div className="div-centered-elements">
					<WriteReviewButton />
				</div>
			</div>
		);
	}

	let content = null; 
	if (user) {
		content = renderContent();
	} else {
		content = (
			<div
				style={{
					width: "80%",
					margin: "0 auto",
					backgroundColor: "white",
				}}
			>
				<br />
				<h3>
					<TLogin.mustBeLoggedIn />
				</h3>
				<br />
				<Link
					className="btn btn-primary"
					to={urlGenerators.vizeLogin("worker")}
				>
					Iniciar Sesión
				</Link>
				<br />
			</div>
		);
	}

	return (
		<PageWrapper title="Solicitud Enviada">
			<PageContentContainer>{content}</PageContentContainer>
		</PageWrapper>
	);
}
