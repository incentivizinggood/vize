import React from "react";
import { Mutation } from "react-apollo";
import styled from "styled-components";

import voteButtonsQuery from "./vote-buttons.graphql";
import VoteButton from "./vote-button.jsx";

const VoteDiv = styled.div`
	> * {
		display: block;
	}

	/* Have some space between the buttons. */
	> :first-child {
		margin: 0 0 20px 0;
	}

	/* Display the buttons in a row if the screen is small. */
	@media (max-width: 992px) {
		text-align: center;

		> * {
			display: inline-block;
		}

		/* Have some space between the buttons. */
		> :first-child {
			margin: 0 20px 0 0;
		}
	}
`;

/**
 * The vote buttons component. For casting votes on reviews.
 * This contains two buttons, the upvote button and the downvote button.
 */
export default function VoteButtons(props) {
	return (
		<Mutation mutation={voteButtonsQuery}>
			{castVote => (
				<VoteDiv>
					<VoteButton
						isUpButton
						castVote={castVote}
						review={props.review}
					/>
					<VoteButton castVote={castVote} review={props.review} />
				</VoteDiv>
			)}
		</Mutation>
	);
}
