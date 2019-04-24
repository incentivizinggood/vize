import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";

/** The diameter of a vote button in px. */
const buttonDiameter = 70;

/** Compute some additional props for this component. */
const attrs = props => {
	// Unpack props for easier access.
	// Things like props.review.currentUserVote.isUpvote are hard to read.
	const { isUpButton = false, castVote, review } = props;
	const { currentUserVote: vote } = review;

	return {
		type: "button",
		isUpButton,
		vote,

		// If this button was not given a vote, it is disabled.
		disabled: vote === null,

		/** The icon to display inside this button. */
		children: isUpButton ? (
			<FontAwesomeIcon icon="thumbs-up" />
		) : (
			<FontAwesomeIcon icon="thumbs-down" flip="horizontal" />
		),

		/** The function that casts a vote when this button is clicked. */
		onClick: event => {
			event.preventDefault();

			if (vote === null) {
				// This button was not given a vote and therefor is disabled.
				return;
			}

			let isCastingUpvote;
			if (vote === null || vote.isUpvote === null) {
				// The user had not voted yet or removed their vote.
				// The user is now casting their vote.
				isCastingUpvote = isUpButton;
			} else if (vote.isUpvote === isUpButton) {
				// The user had already voted this way.
				// The user is now removing their vote.
				isCastingUpvote = null;
			} else {
				// The user had voted the other way.
				// The user is now changing their vote.
				isCastingUpvote = isUpButton;
			}

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
		},
	};
};

/**
 * A single vote button. Is either an upvote button or a downvote button.
 */
const VoteButton = styled.button.attrs(attrs)`
	height: ${buttonDiameter}px;
	width: ${buttonDiameter}px;
	border-radius: ${buttonDiameter / 2}px;
	border: 0.833333px solid grey;
	display: block;
	background-color: white;

	${props => {
		if (props.vote === null) {
			// This button was not given a vote and therefor is disabled.
			return css`
				color: lightgrey;
				border-color: lightgrey;
			`;
		}

		if (props.isUpButton !== props.vote.isUpvote) {
			// This button does not represent a vote that has already been cast.
			return css`
				color: dimgrey;
				border-color: dimgrey;
			`;
		}

		// The vote that this button represents a has already been cast.
		// Color the background to show this.
		return css`
			color: white;
			background-color: ${props.isUpButton ? "green" : "red"};
			border: 0;
		`;
	}};

	/* Style the emoji thumbs in the buttons. */
	font-size: 29px;
	text-align: center;
	vertical-align: middle;

	/* Make the button's icon larger when it's hovered. */
	transition: font-size 0.1s;
	:hover {
		font-size: 35px;
	}

	@media (max-width: 768px) {
		display: inline-block;
		margin: 0 5px;
	}
`;

export default VoteButton;
