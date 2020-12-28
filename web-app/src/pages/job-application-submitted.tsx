import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { forSize } from "src/responsive";
import * as urlGenerators from "src/pages/url-generators";
import { useJobApplicationSubmittedQuery } from "generated/graphql-operations";

import { useUser } from "src/hoc/user";
import PageWrapper from "src/components/page-wrapper";
import { translations } from "src/translations";

import { LinkButton } from "src/components/button";

import {
	FacebookShareButton,
	WhatsappShareButton,
	FacebookIcon,
	WhatsappIcon,
} from "react-share";

const T = translations.legacyTranslationsNeedsRefactor.jobApplicationSubmitted;
const TLogin = translations.loginRegister;

const PageContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
    align-items: center;

	margin-top: 250px;
	margin-bottom: 250px;
	padding: 50px;
	margin-right: auto;
	margin-left: auto;

	background-color: #fefdfe;
	box-shadow: 0px 1px 3px 0px;
	border-radius: 8px;

	width: 80%;

	color: black;

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

const ContactNumberLink = styled.a`
	font-weight: bold;
	color: #337ab7 !important;
	text-decoration: underline;
`;

const personalReferralMessage =
	"Hola que tal! Te quiero contar de una empresa que se llama Vize (Incentivando el Bien) que tiene el objetivo de mejorar las condiciones de trabajo en las fabricas por medio de que los empleados escriban evaluaciones totalmente anónimas sobre sus experiencias laborando en ellas. Te invito a participar. \r\n\r\nPuedes llenar la encuesta aquí:";

const publicReferralMessage =
	"Hola, les quiero contar de una empresa que se llama Vize (Incentivando el Bien) que tiene el objetivo de mejorar las condiciones de trabajo en las fabricas por medio de que los empleados escriban evaluaciones totalmente anónimas sobre sus experiencias laborando en ellas. Los invito a participar. \r\n\r\nnPueden llenar la encuesta aquí:";

interface JobApplicationSubmittedProps {
	companyId?: string;
}

export default function JobApplicationSubmitted({companyId}: JobApplicationSubmittedProps) {
	const user = useUser();
	const { loading, data } = useJobApplicationSubmittedQuery({
		variables: { companyId },
	});
	
	const referralLink = "vize.mx";
	console.log("ccmp", data);

	function renderContent() {
		return (
			<>
				<h2>
					<T.jobApplicationSubmitted /> {data?.company?.name}asdf
				</h2>
				
				<br />
				
				<p>
					{data?.company?.name} <T.companyWillReachOut />
				</p>
				<p>
					<T.contactUs /> 
					<ContactNumberLink
						href="https://wa.me/5216647480001"
						rel="noreferrer"
						target="_blank"
					>+52(664)748-0001
				</ContactNumberLink>
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

				<LinkButton to={`${urlGenerators.queryRoutes.companyProfile}/${companyId}`} style={{ width: "350px" }} $primary> <T.returnToCompany /> </LinkButton>
				<br />
				<LinkButton to={urlGenerators.queryRoutes.jobs} style={{ width: "350px" }} $primary> <T.viewMoreJobs /> </LinkButton>
			</>
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
