import React from "react";
import Modal from "react-modal";

import style from "./style.scss";

class ModalButton extends React.Component {
	constructor() {
		super();

		this.state = {
			modalIsOpen: false,
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}

	render() {
		const { modalContent, contentLabel, ...otherButtonProps } = this.props;
		return (
			<>
				<button {...otherButtonProps} onClick={this.openModal} />
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					contentLabel={contentLabel}
					className={style.content}
					overlayClassName={style.overlay}
					portalClassName={style.portal}
				>
					{modalContent()}
				</Modal>
			</>
		);
	}
}

export default ModalButton;
