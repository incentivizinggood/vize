import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const StyledModal = styled(Modal)`
	width: 400px;
	background-color: white;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
	max-width: 50%;
	max-height: 50%;
	padding: 4px;
	display: table;
`;

const CloseButton = styled.button`
	position: absolute;
	right: 5px;
	top: 5px;
	width: 32px;
	height: 32px;
	color: grey;
	z-index: 1;

	:hover {
		opacity: 10;
	}
`;

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
			<StyledModal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
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
				<CloseButton onClick={closeModal}>X</CloseButton>
				<props.content />
			</StyledModal>
		</>
	);
}

export default ModalView;
