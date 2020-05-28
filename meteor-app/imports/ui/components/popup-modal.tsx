import React from "react";
import Modal from "react-modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		padding: "10px",
		marginRight: "-50%",
		marginTop: "30px",
		height: "auto",
		maxHeight: "80%",
		transform: "translate(-50%, -50%)",
		overflow: "hidden",
	},
};

// This modal component is being used so that specific styles can be applied
// that look good on web and mobile
export default class PopupModal extends React.Component {
	constructor(props) {
		super(props);
		console.log("const");

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
			<div>
				{buttonContent}
				<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					ariaHideApp={false}
					style={customStyles}
					contentLabel="Modal"
				>
					{this.props.showCloseButton && (
						<button
							style={{ float: "right" }}
							onClick={this.closeModal}
						>
							<FontAwesomeIcon icon={faTimes} />
						</button>
					)}
					{this.props.children}
				</Modal>
			</div>
		);
	}
}

PopupModal.defaultProps = {
	showCloseButton: true,
	canCloseModal: true,
	isOpen: false,
};
