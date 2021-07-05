import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { forSize } from "src/responsive";

const ModalStyled = styled(Modal)`
	position: absolute;
	top: 50%;
	left: 50%;
	right: auto;
	bottom: auto;
	border: 1px solid rgb(204, 204, 204);
	background: rgb(255, 255, 255);
	overflow-y: scroll;
	scrollbar-width: none;
	-ms-overflow-style: none;
	border-radius: 10px;
	outline: none;
	padding: 15px;
	margin-right: -50%;
	margin-top: 30px;
	height: auto !important;
	max-height: 80%;
	transform: translate(-50%, -50%);

	&::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	${forSize.phoneOnly} {
		width: 100% !important;
		border: none;
		border-radius: 0px;
		max-height: 100%;
		margin-top: 65px;
		padding-bottom: 100px;
	}
`;

const LineSeparator = styled.hr`
	border-top: 1px solid #d9d9d9;
	width: calc(100% + 30px);
	margin-left: -15px;
	margin-right: -15px;
	margin-top: 15px;
	margin-bottom: 10px;
`;

const ModalTitle = styled.h3`
	font-weight: bold;
	text-align: center;
`;

// This modal component is being used so that specific styles can be applied
// that look good on web and mobile
export default class PopupModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			modalIsOpen: this.props.isOpen,
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
		//this.subtitle.style.color = "#f00";
	}

	closeModal() {
		if (this.props.canCloseModal) {
			this.setState({ modalIsOpen: false });
		}
		if (this.props.setJobApplicationModal)
			this.props.setJobApplicationModal(null);
	}

	render() {
		let buttonContent = null;
		if (this.props.buttonClass) {
			buttonContent = (
				<button
					className={this.props.buttonClass}
					onClick={this.openModal}
				>
					{this.props.buttonText}
				</button>
			);
		}

		return (
			<>
				{buttonContent}
				<ModalStyled
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					ariaHideApp={false}
					contentLabel="Modal"
				>
					{this.props.showCloseButton && (
						<button
							style={{ float: "left" }}
							onClick={this.closeModal}
						>
							<FontAwesomeIcon
								icon={faTimes}
								color={this.props.closeModalButtonColor}
								size="2x"
							/>
						</button>
					)}

					{this.props.modalTitle && (
						<>
							<ModalTitle>{this.props.modalTitle}</ModalTitle>
							<LineSeparator />
						</>
					)}

					{this.props.children}
				</ModalStyled>
			</>
		);
	}
}

PopupModal.defaultProps = {
	showCloseButton: true,
	canCloseModal: true,
	isOpen: false,
	closeModalButtonColor: "black",
};
