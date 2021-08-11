import React from "react";
import styled from "styled-components";
import { forSize } from "src/responsive";
import * as urlGenerators from "src/pages/url-generators";
import { useJobApplicationSubmittedQuery } from "generated/graphql-operations";
import ClipboardIcon from "@material-ui/icons/Assignment";
import ClipboardCopiedIcon from "@material-ui/icons/AssignmentTurnedIn";
import Spinner from "src/components/Spinner";

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
	margin-top: 200px;
	margin-bottom: 200px;
	padding: 20px;
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
		margin-top: 50px;
		margin-bottom: 0px;
		padding: 30px 10px;
		border-radius: 0px;
	}
`;

const PageInnerContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;

	margin-top: 20px;
	margin-bottom: 20px;
	padding: 30px 10px;
	margin-right: auto;
	margin-left: auto;

	width: 100%;

	color: black;

	h3 {
		font-weight: bold;
	}

	${forSize.phoneOnly} {
		padding: 20px 0px;
	}
`;

const ReferralLinkContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 10px 0;
`;

const ContactNumberLink = styled.a`
	font-weight: bold;
	color: #337ab7 !important;
	text-decoration: underline;
`;

const personalReferralMessage =
	"Hola! Si estas buscando empleos en una fabrica en Tijuana, te recomiendo este sito web que se llama Vize (Incentivando El Bien). Aqui puedes encontrar empleos y tambien puedes leer evaluaciones de otros empleados que han trabajado ahi para que puedas hacer una decision mejor informada sobre donde quieres trabajar.";

const publicReferralMessage =
	"Hola, si estan buscando empleos en una fabrica en Tijuana, les recomiendo este sito web que se llama Vize (Incentivando El Bien). Aqui pueden encontrar empleos y tambien pueden leer evaluaciones de otros empleados que han trabajado ahi para que puedan hacer una decision mejor informada sobre donde quieren trabajar.";

interface JobApplicationSubmittedInnerContentProps {
	companyId?: string;
}

export function JobApplicationSubmittedInnerContent({
	companyId,
}: JobApplicationSubmittedInnerContentProps) {
	const referralLink: string = `www.vize.mx/${urlGenerators.queryRoutes.jobs}?ref=jobapp`;
	const [copySuccess, setCopySuccess] = React.useState("");
	const textAreaRef = React.useRef(null);
	let ClipboardStatusIcon = <ClipboardIcon />;

	const { loading, data } = useJobApplicationSubmittedQuery({
		variables: { companyId },
	});

	if (loading) {
		return <Spinner />;
	}

	if (copySuccess === "Copiado!") {
		ClipboardStatusIcon = <ClipboardCopiedIcon />;
	}

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		setCopySuccess("Copiado!");
	}
	return (
		<PageInnerContentContainer>
			<h3>
				<T.jobApplicationSubmitted /> {data?.company?.name}
			</h3>

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
				>
					+52(664)748-0001
				</ContactNumberLink>
			</p>

			<br />
			<p>
				<T.readReviews />
			</p>
			<br />
			<LinkButton
				to={`${urlGenerators.queryRoutes.companyProfile}/${companyId}/${urlGenerators.queryRoutes.jobs}`}
				style={{ width: "100%" }}
				$primary
			>
				{" "}
				<T.readReviewsButton />{" "}
			</LinkButton>
			<br />
			<LinkButton
				to={urlGenerators.queryRoutes.jobs}
				style={{ width: "100%" }}
				$primary
			>
				{" "}
				<T.viewMoreJobs />{" "}
			</LinkButton>

			<br />

			<p>
				<T.referralMessage />
			</p>

			<ReferralLinkContainer>
				<button onClick={() => copyToClipboard(referralLink)}>
					{ClipboardStatusIcon}
				</button>
				<button onClick={() => copyToClipboard(referralLink)}>
					<a ref={textAreaRef} value={referralLink}>
						<strong>{referralLink}</strong>
					</a>
				</button>
				{copySuccess}
			</ReferralLinkContainer>

			<div>
				<WhatsappShareButton
					url={referralLink}
					title={personalReferralMessage}
					style={{ marginRight: "7px" }}
				>
					<WhatsappIcon size={48} round={true} />
				</WhatsappShareButton>

				<FacebookShareButton
					url={referralLink}
					quote={publicReferralMessage}
					hashtag="#incentivandoelbien"
				>
					<FacebookIcon size={48} round={true} />
				</FacebookShareButton>
			</div>
		</PageInnerContentContainer>
	);
}

interface JobApplicationSubmittedProps {
	companyId?: string;
}

// The page that users see when a job application is submitted
export default function JobApplicationSubmitted({
	companyId,
}: JobApplicationSubmittedProps) {
	return (
		<PageWrapper title="Solicitud Enviada">
			<PageContentContainer>
				<JobApplicationSubmittedInnerContent companyId={companyId} />
			</PageContentContainer>
		</PageWrapper>
	);
}
