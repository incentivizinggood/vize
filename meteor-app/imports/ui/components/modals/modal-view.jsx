import React from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Meteor } from "meteor/meteor";
import style from "./modal-view.scss";

// This page acts as a modular component that can be reused

export default class ModalView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			// if no button is needed to activate the modal, then the modal should be open by default
			modalIsOpen: this.props.noButton,
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
		return (
			<>
				{
					// noButton prop was added in case a modal is needed to be
					// used without a button to activate it
				}
				{!this.props.noButton && (
					<button
						onClick={this.openModal}
						className={this.props.className}
					>
						{this.props.children}
					</button>
				)}
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this.closeModal}
					className={style.modalView}
					contentLabel="Modular review"
				>
					<button
						onClick={this.closeModal}
						className={style.closeButton}
					>
						X
					</button>
					<this.props.content />
				</Modal>
			</>
		);
	}
}
