import React from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import styled from "styled-components";
import { forSize } from "imports/ui/responsive.js";
import { urlGenerators } from "imports/ui/pages/url-generators";
import ClipboardIcon from "@material-ui/icons/Assignment";
import ClipboardCopiedIcon from "@material-ui/icons/AssignmentTurnedIn";

import { withUser } from "imports/ui/hoc/user";
import PageWrapper from "imports/ui/components/page-wrapper";
import { translations } from "imports/ui/translations";

import RewardsComponent from "./rewardsComponent";
import rewardsEligibility from "./rewards-eligibility.graphql";
import { WriteReviewButton } from "imports/ui/components/button";

import {
	EmailShareButton,
	FacebookShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	EmailIcon,
	FacebookIcon,
	TwitterIcon,
	WhatsappIcon,
} from "react-share";

const T = translations.legacyTranslationsNeedsRefactor.reviewSubmitted;
const TLogin = translations.loginRegister;

const REWARD_DATA_SUBMISSION = gql`
	mutation RewardDataSubmission(
		$phoneNumber: String!
		$paymentMethod: PaymentMethod!
	) {
		claimWroteAReview(
			phoneNumber: $phoneNumber
			paymentMethod: $paymentMethod
		)
	}
`;

const RewardSection = styled.div`
	margin-top: 250px;
	margin-bottom: 250px;
	padding: 50px;
	background-color: #fefdfe;
	box-shadow: 0px 1px 3px 0px;
	width: 80%;
	display: flex;

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
	}
`;

const personalReferralMessage =
	"Hola que tal! Te quiero contar de una empresa que se llama Vize (Incentivando el Bien) que tiene el objetivo de mejorar las condiciones de trabajo en las fabricas por medio de que los empleados escriban evaluaciones totalmente anónimas sobre sus experiencias laborando en ellas. Te invito a participar. \r\n\r\nPuedes llenar la encuesta aquí:";

const publicReferralMessage =
	"Hola, les quiero contar de una empresa que se llama Vize (Incentivando el Bien) que tiene el objetivo de mejorar las condiciones de trabajo en las fabricas por medio de que los empleados escriban evaluaciones totalmente anónimas sobre sus experiencias laborando en ellas. Los invito a participar. \r\n\r\nnPueden llenar la encuesta aquí:";

function ReviewSubmitted({ user }) {
	const [copySuccess, setCopySuccess] = React.useState("");
	const textAreaRef = React.useRef(null);

	function copyToClipboard(text: string) {
		navigator.clipboard.writeText(text);
		setCopySuccess("Copiado!");
	}

	function changeReviewStatusState() {
		// reload the page when a phone number is successfully inputed to claim a Reward
		// this is done because the reward status query does not get update until the
		// page is refreshed
		window.location.reload();
	}

	function renderContent() {
		const referralLink: string =
			"https://www.vize.mx/write-review?ref=" + user.id;
		let ClipboardStatusIcon = <ClipboardIcon />;
		if (copySuccess === "Copiado!") {
			ClipboardStatusIcon = <ClipboardCopiedIcon />;
		}
		return (
			<div className="col-md-12">
				<h2 className="text-center">
					<T.contributing />
				</h2>
				<p>
					<T.reviewSubmitted />
				</p>
				<p>
					<T.inviteFriends />
				</p>

				<p>
					<button onClick={() => copyToClipboard(referralLink)}>
						{ClipboardStatusIcon}
					</button>
					<button onClick={() => copyToClipboard(referralLink)}>
						<a ref={textAreaRef} value={referralLink}>
							<strong>{referralLink}</strong>
						</a>
					</button>
					{copySuccess}
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

				<Query query={rewardsEligibility}>
					{({ loading, error, data }) => {
						if (data) {
							if (data.wroteAReview === "CAN_CLAIM") {
								return (
									<RewardsComponent
										action={changeReviewStatusState}
									/>
								);
							}
						}
						return <p />;
					}}
				</Query>
			</div>
		);
	}

	let content = null; // 				<RewardSection>{content}</RewardSection>
	console.log("user", user);
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
		<PageWrapper title="Recompensa">
			<RewardSection>{content}</RewardSection>
		</PageWrapper>
	);
}
export default withUser(ReviewSubmitted);
