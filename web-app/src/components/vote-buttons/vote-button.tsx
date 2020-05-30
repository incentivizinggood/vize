import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";

import { VoteButtonsMutationFn } from "generated/graphql-operations";

/** The diameter of a vote button in px. */
const buttonDiameter = 70;

type ButtonProps = {
	isUpButton?: boolean;
	isActive: boolean;
};

const Button = styled.button<ButtonProps>`
	/* Make the button a circle. */
	height: ${buttonDiameter}px;
	width: ${buttonDiameter}px;
	border-radius: ${buttonDiameter / 2}px;
	border: 0.833333px solid;

	/* Color the button to show its status. */
	${props => {
		if (props.disabled) {
			return css`
				color: lightgrey;
			`;
		}

		if (props.isActive) {
			return css`
				color: white;
				background-color: ${props.isUpButton ? "green" : "red"};
				border: 0;
			`;
		}

		return css`
			color: dimgrey;
		`;
	}};

	/* Style the icons in the buttons. */
	font-size: 29px;
	text-align: center;
	vertical-align: middle;

	/* Make the button's icon larger when it's hovered. */
	transition: font-size 0.1s;
	:hover {
		font-size: 35px;
	}
`;

export type VoteButtonProps = {
	isUpButton?: boolean;
	castVote: VoteButtonsMutationFn;
	review: {
		id: string;
		currentUserVote: { id: string; isUpvote: boolean | null };
	};
};
/**
 * A single vote button. Is either an upvote button or a downvote button.
 */
function VoteButton(props: VoteButtonProps) {
	// Unpack props for easier access.
	// Things like props.review.currentUserVote.isUpvote are hard to read.
	const { isUpButton = false, castVote, review } = props;
	const { currentUserVote: vote } = review;

	// If this button was not given a vote, it is disabled.
	const disabled = vote === null;

	// If the user has already voted this way, then the button should show that
	// and allow them to undo/remove their vote.
	const isActive = disabled ? false : vote.isUpvote === isUpButton;

	/** The function that casts a vote when this button is clicked. */
	const onClick = (event: React.MouseEvent) => {
		event.preventDefault();

		// A disabled button should not do anything.
		if (disabled) {
			return;
		}

		/** The vote we are casting.
		 * true: voting up
		 * false: voting down
		 * null: remove the vote
		 */
		const isCastingUpvote = isActive ? null : isUpButton;

		castVote({
			variables: {
				input: {
					isUpvote: isCastingUpvote,
					subjectId: review.id,
				},
			},
			optimisticResponse: {
				__typename: "Mutation",
				castVote: {
					__typename: "CastVotePayload",
					vote: {
						__typename: "Vote",
						id: vote.id,
						isUpvote: isCastingUpvote,
					},
				},
			},
		});
	};

	return (
		<Button
			type="button"
			isUpButton={isUpButton}
			disabled={disabled}
			isActive={isActive}
			onClick={onClick}
		>
			{isUpButton ? (
				<FontAwesomeIcon icon={faThumbsUp} />
			) : (
				<FontAwesomeIcon icon={faThumbsDown} flip="horizontal" />
			)}
		</Button>
	);
}

export default VoteButton;
