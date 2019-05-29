import React from "react";
import Modal from "react-modal";

import style from "./modal-view.scss";

// This page acts as a modular component that can be reused
function ModalView(props) {
	const [modalIsOpen, setModalIsOpen] = React.useState(props.noButton);

	const openModal = () => setModalIsOpen(true);
	const closeModal = () => setModalIsOpen(false);

	return (
		<>
			{
				// noButton prop was added in case a modal is needed to be
				// used without a button to activate it
			}
			{!props.noButton && (
				<button onClick={openModal} className={props.className}>
					{props.children}
				</button>
			)}
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				className={style.modalView}
				contentLabel="Modular review"
				style={{
					overlay: {
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(158,161,162, 0.75)",
					},
				}}
			>
				<button onClick={closeModal} className={style.closeButton}>
					X
				</button>
				<props.content />
			</Modal>
		</>
	);
}

export default ModalView;
